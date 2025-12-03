from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import run_agent
from database import query
import unicodedata

app = FastAPI()

# CORS
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
    datos = None

    # Palabras clave normalizadas
    kw_productos_comprados = ["productos mas comprados", "mas vendidos"]
    kw_mas_resenas = ["productos con mas comentarios", "mas resenas"]
    kw_mejor_calificados = ["mejor calificados", "mejores calificaciones"]
    kw_vendedor_publicaciones = ["vendedor con mas productos", "mas publicaciones"]

    # ---------------------------
    # INTENCIÓN: productos más comprados
    # ---------------------------
    if any(k in mensaje for k in kw_productos_comprados):
        datos = query("""
            SELECT p.Nombre, SUM(pd.Cantidad) AS total_vendidos
            FROM Pedido_Detalle pd
            INNER JOIN Producto p ON pd.Id_producto = p.Id_producto
            GROUP BY p.Id_producto
            ORDER BY total_vendidos DESC
            LIMIT 5;
        """)

    # ---------------------------
    # INTENCIÓN: productos con más reseñas
    # ---------------------------
    elif any(k in mensaje for k in kw_mas_resenas):
        datos = query("""
            SELECT p.Nombre, COUNT(r.Id_resena) AS total_resenas
            FROM Resena r
            INNER INNER JOIN Producto p ON r.Id_producto = p.Id_producto
            GROUP BY p.Id_producto
            ORDER BY total_resenas DESC
            LIMIT 5;
        """)

    # ---------------------------
    # INTENCIÓN: productos mejor calificados
    # ---------------------------
    elif any(k in mensaje for k in kw_mejor_calificados):
        datos = query("""
            SELECT p.Nombre, AVG(r.Estrellas) AS promedio_calificacion
            FROM Resena r
            INNER JOIN Producto p ON r.Id_producto = p.Id_producto
            GROUP BY p.Id_producto
            ORDER BY promedio_calificacion DESC
            LIMIT 5;
        """)

    # ---------------------------
    # INTENCIÓN: vendedor con más publicaciones
    # ---------------------------
    elif any(k in mensaje for k in kw_vendedor_publicaciones):
        datos = query("""
            SELECT u.Nombre, COUNT(p.Id_producto) AS productos_publicados
            FROM Usuario u
            INNER JOIN Producto p ON u.Id_usuario = p.Id_usuario
            GROUP BY u.Id_usuario
            ORDER BY productos_publicados DESC
            LIMIT 5;
        """)

    # ---------------------------
    # Si la BD no devolvió nada
    # ---------------------------
    if not datos:
        datos = None

    # ---------------------------
    # Ejecutar el agente
    # ---------------------------
    respuesta = run_agent(body.message, datos_bd=datos)

    return {"respuesta": respuesta}
