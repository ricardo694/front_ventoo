from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import run_agent
from database import query 

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

@app.post("/chat")
async def chat_endpoint(body: dict):
    mensaje = body["message"].lower()
    datos = None

    # ---------------------------
    # INTENCIÓN: productos más comprados
    # ---------------------------
    if "productos más comprados" in mensaje or "más vendidos" in mensaje:
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
    elif "productos con más comentarios" in mensaje or "más reseñas" in mensaje:
        datos = query("""
            SELECT p.Nombre, COUNT(r.Id_resena) AS total_resenas
            FROM Resena r
            INNER JOIN Producto p ON r.Id_producto = p.Id_producto
            GROUP BY p.Id_producto
            ORDER BY total_resenas DESC
            LIMIT 5;
        """)

    # ---------------------------
    # INTENCIÓN: productos mejor calificados
    # ---------------------------
    elif "mejor calificados" in mensaje or "mejores calificaciones" in mensaje:
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
    elif "vendedor con más productos" in mensaje or "más publicaciones" in mensaje:
        datos = query("""
            SELECT u.Nombre, COUNT(p.Id_producto) AS productos_publicados
            FROM Usuario u
            INNER JOIN Producto p ON u.Id_usuario = p.Id_usuario
            GROUP BY u.Id_usuario
            ORDER BY productos_publicados DESC
            LIMIT 5;
        """)

    # ---------------------------
    # Aquí ejecutamos el agente
    # ---------------------------
    respuesta = run_agent(body["message"], datos_bd=datos)

    return {"respuesta": respuesta}