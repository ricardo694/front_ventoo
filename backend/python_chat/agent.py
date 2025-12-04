import ollama
import json
from datetime import datetime

class Agente:
    def __init__(self, model="gemma3:4b", max_history=10):
        self.model = model
        self.conversation_history = []
        self.max_history = max_history
        self.topics_proposed = []
        self.system_prompt = """
            Eres mi agente conversacional inteligente y amigable.
            Tu objetivo es responder preguntas sobre productos, vendedores, comentarios,
            calificaciones y tendencias de compra usando los datos REALMENTE proporcionados por la base de datos.

            INTERPRETACIÓN DE PREGUNTAS:
            El usuario puede escribir su duda con cualquier tipo de estructura, sinónimos,
            errores de ortografía, lenguaje informal, o frases ambiguas.
            Tu tarea es intentar entender la INTENCIÓN REAL detrás de la pregunta usando sentido común.
            
            REGLA IMPORTANTE:
            SIEMPRE debes responder ÚNICAMENTE con los datos proporcionados.
            SI NO recibes datos de la base de datos, DEBES responder literalmente:
            "No hay información disponible en este momento."

            No inventes nombres de productos, vendedores, calificaciones ni reseñas.

            Habilidades:
            - Mantener conversaciones naturales y fluidas
            - Ser curioso y hacer preguntas relevantes
            - Adaptarte al estilo del usuario

            Responde siempre en español de forma natural y conversacional.
        """

    # -----------------------------------------
    # Manejo de historial
    # -----------------------------------------
    def add_to_history(self, role, content):
        self.conversation_history.append({
            "role": role,
            "content": content
        })
        if len(self.conversation_history) > self.max_history:
            self.conversation_history = self.conversation_history[-self.max_history:]

    def get_messages(self):
        messages = [{"role": "system", "content": self.system_prompt}]
        messages.extend(self.conversation_history)
        return messages

    # -----------------------------------------
    # CHAT PRINCIPAL: con soporte para la base de datos
    # -----------------------------------------
    def chat(self, user_message, datos_bd=None):
            contexto_bd = ""

            if datos_bd:
                contexto_bd = (
                    "\nEstos son los datos obtenidos de la base de datos:\n"
                    f"{json.dumps(datos_bd, indent=2)}\n"
                )

            self.add_to_history("user", user_message + contexto_bd)

            try:
                response = ollama.chat(
                    model=self.model,
                    messages=self.get_messages()
                )
                assistant_message = response['message']['content']
                self.add_to_history("assistant", assistant_message)
                return assistant_message

            except Exception as e:
                return f"Error al comunicarse con Ollama: {str(e)}"

    # -----------------------------------------
    # Proponer tema 
    # -----------------------------------------
    def propose_topic(self):
        return "¿Sobre qué producto, vendedor o categoría quieres hablar hoy?"
    # -----------------------------------------
    # Resumen
    # -----------------------------------------
    def get_conversation_summary(self):
        if not self.conversation_history:
            return "No existe conversación activa."

        total_messages = len(self.conversation_history)
        user_messages = len([m for m in self.conversation_history if m['role'] == 'user'])

        return f"""
Resumen de la conversación:
- Total de mensajes: {total_messages}
- Mensajes del usuario: {user_messages}
- Temas propuestos: {len(self.topics_proposed)}
"""

    # -----------------------------------------
    # Reset de la conversación
    # -----------------------------------------
    def reset_conversation(self):
        self.conversation_history = []
        print("Reiniciando...")

# ====================================================
# FUNCIÓN para ser usada desde FastAPI
# ====================================================
agente_global = Agente(model="gemma3:4b")

def run_agent(mensaje_usuario, datos_bd=None):
    """
    Esta función será llamada por server.py
    Usa un agente global para mantener el historial entre mensajes.
    """
    respuesta = agente_global.chat(mensaje_usuario, datos_bd)
    return respuesta



