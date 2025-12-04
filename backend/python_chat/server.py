from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import run_agent, agente_global
from intents import INTENCIONES, ejecutar_intencion
import unicodedata

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

def normalizar(texto):
    return ''.join(
        c for c in unicodedata.normalize('NFD', texto)
        if unicodedata.category(c) != 'Mn'
    ).lower()

@app.post("/chat")
async def chat_endpoint(body: ChatRequest):
    mensaje = normalizar(body.message)
    
    # ------------------------------------
    # COMANDOS DEL AGENTE
    # ------------------------------------

    if mensaje == "salir":
        agente_global.reset_conversation()
        return {"respuesta": "Sesión finalizada. Si quieres hablar otra vez, escribe algo nuevo."}

    if mensaje == "reiniciar":
        agente_global.reset_conversation()
        return {"respuesta": "Conversación reiniciada."}

    if mensaje == "resumen":
        resumen = agente_global.get_conversation_summary()
        return {"respuesta": resumen}

    if mensaje == "proponer":
        topic = agente_global.propose_topic()
        return {"respuesta": topic}

    # ------------------------------------
    # DETECCIÓN DE INTENCIÓN + SQL
    # ------------------------------------
    datos = None
    intencion_detectada = None

    for nombre_intencion, palabras_clave in INTENCIONES.items():
        if any(k in mensaje for k in palabras_clave):
            intencion_detectada = nombre_intencion
            break

    if intencion_detectada:
        datos = ejecutar_intencion(intencion_detectada,mensaje)

    # ------------------------------------
    # LLAMAR AL AGENTE
    # ------------------------------------
    respuesta = run_agent(body.message, datos_bd=datos)
    return {"respuesta": respuesta}