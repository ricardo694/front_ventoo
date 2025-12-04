
from database import query

# Palabras clave por intención
INTENCIONES = {
    "productos_mas_comprados": [
        "productos mas comprados",
        "mas vendidos",
        "lo mas top",
        "que es lo mas comprado",
        "producto mas comprado",
        "cuales son los mas comprados",
        "mas populares",
        "mas pedidos",
        "mas solicitados",
        "mas buscados",
        "top ventas",
        "top vendidos",
        "ranking de productos",
        "productos tendencia",
        "productos en tendencia"
    ],
   "productos_mas_resenas": [
        "productos con mas comentarios",
        "mas resenas",
        "mas reseñas",
        "productos con mas opiniones",
        "mas comentados",
        "mas feedback",
        "mas valorados por usuarios",
        "productos con muchas reseñas",
        "productos mas comentados"
    ],
    "productos_mejor_calificados": [
        "mejor calificados",
        "mejores calificaciones",
        "mejor puntuados",
        "productos con mejor rating",
        "productos con mejor puntuacion",
        "productos mejor valorados",
        "productos con mas estrellas",
        "calificacion mas alta",
        "top calificados"

    ],
    "vendedor_mas_publicaciones": [
          "vendedor con mas productos",
        "mas publicaciones",
        "vendedor tiene mas productos",
        "tiene mas productos",
        "mas productos registrados",
        "productos registrados",
        "que vendedor vende mas",
        "que vendedor tiene mas cosas",
        "quien publica mas",
        "vendedor con mas ventas publicadas",
        "vendedor con mas inventario",
        "vendedor mas grande",
        "vendedor con mas oferta"
    ],
    "buscar_producto_por_categoria": [
        "categoria",
        "categoria de",
        "productos de",
        "que hay en la categoria",
        "mostrar categoria",
        "busca categoria",
        "quiero ver productos de",
        "productos en categoria",
        "categoria llamada",
        "que categorias tienen",
        "hay productos de"
    ],
    "productos_mas_baratos": [
        "mas barato",
        "lo mas barato",
        "baratos",
        "económicos",
        "precio bajo",
        "lo mas economico",
        "productos baratos",
        "los mas baratos",
        "productos económicos",
        "menor precio"
    ],
    "productos_mas_caros": [
        "mas caro",
        "lo mas caro",
        "caros",
        "precio alto",
        "productos caros",
        "los mas caros",
        "lo mas costoso",
        "mas costosos",
        "mayor precio"
    ],
    "resenas_producto": [
        "opiniones",
        "comentarios de",
        "reseñas de",
        "resenas de",
        "que opinan de",
        "que dicen de",
        "comentarios sobre",
        "que tal es",
        "valoraciones de",
        "reviews de",
        "review de"
    ],
    "calificacion_vendedor": [
        "productos nuevos",
        "publicados esta semana",
        "recientes",
        "agregados recientemente",
        "nuevos productos",
        "lo mas nuevo",
        "recien publicados",
        "novedades",
        "ultima hora",
        "lo ultimo publicado",
        "productos recientes"
    ],
    "productos_recientes": [
        "productos nuevos", 
        "publicados esta semana", 
        "recientes"
    ]
}

# Funciones para cada intención
def ejecutar_intencion(intencion, mensaje):
    if intencion == "productos_mas_comprados":
        return query("""
            SELECT p.Nombre, SUM(pd.Cantidad) AS total_vendidos
            FROM Pedido_Detalle pd
            INNER JOIN Producto p ON pd.Id_producto = p.Id_producto
            GROUP BY p.Id_producto
            ORDER BY total_vendidos DESC
            LIMIT 5;
        """)
    

    if intencion == "productos_mas_resenas":
        return query("""
            SELECT Producto.Nombre, COUNT(Resena.Id_resena) AS total_resenas
            FROM Resena
            INNER JOIN Producto ON Resena.Id_producto = Producto.Id_producto
            GROUP BY Producto.Id_producto
            ORDER BY total_resenas DESC
            LIMIT 5;
        """)

    if intencion == "productos_mejor_calificados":
        return query("""
            SELECT Producto.Nombre, AVG(Resena.Estrellas) AS promedio_calificacion
            FROM Resena
            INNER JOIN Producto ON Resena.Id_producto = Producto.Id_producto
            GROUP BY Producto.Id_producto
            ORDER BY promedio_calificacion DESC
            LIMIT 5;
        """)

    if intencion == "vendedor_mas_publicaciones":
        return query("""
            SELECT u.Nombre, COUNT(p.Id_producto) AS productos_publicados
            FROM Usuario u
            INNER JOIN Producto p ON u.Id_usuario = p.Id_usuario
            GROUP BY u.Id_usuario
            ORDER BY productos_publicados DESC
            LIMIT 5;
        """)
    
     # Buscar productos por nombre
    if intencion == "buscar_producto_por_nombre":
        palabra = mensaje.replace("buscar", "").replace("muéstrame", "").replace("hay", "").strip()
        return query(f"""
            SELECT Nombre, Precio
            FROM Producto
            WHERE Nombre LIKE '%{palabra}%'
            LIMIT 10;
        """)

    # Buscar por categoría
    if intencion == "buscar_producto_por_categoria":
        categoria = mensaje.split("productos de")[-1].strip()
        return query(f"""
            SELECT Nombre, Precio
            FROM Producto
            WHERE Categoria LIKE '%{categoria}%'
            LIMIT 10;
        """)

    # Productos baratos
    if intencion == "productos_mas_baratos":
        return query("""
            SELECT Nombre, Precio
            FROM Producto
            ORDER BY Precio ASC
            LIMIT 5;
        """)

    # Productos caros
    if intencion == "productos_mas_caros":
        return query("""
            SELECT Nombre, Precio
            FROM Producto
            ORDER BY Precio DESC
            LIMIT 5;
        """)

    # Reseñas de un producto
    if intencion == "resenas_producto":
        producto = mensaje.split("de")[-1].strip()
        return query(f"""
            SELECT r.Estrellas, r.Comentario
            FROM Resena r
            INNER JOIN Producto p ON r.Id_producto = p.Id_producto
            WHERE p.Nombre LIKE '%{producto}%'
            LIMIT 10;
        """)

    # Calificación promedio vendedor
    if intencion == "calificacion_vendedor":
        vendedor = mensaje.split("vendedor")[-1].strip()
        return query(f"""
            SELECT u.Nombre, AVG(r.Estrellas) AS promedio_calificacion
            FROM Resena r
            INNER JOIN Usuario u ON r.Id_usuario = u.Id_usuario
            WHERE u.Nombre LIKE '%{vendedor}%'
            GROUP BY u.Id_usuario;
        """)

    # Productos recientes
    if intencion == "productos_recientes":
        return query("""
            SELECT Nombre, Fecha_publicacion
            FROM Producto
            WHERE Fecha_publicacion >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
            ORDER BY Fecha_publicacion DESC;
        """)

    return None
