import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",          
        password="",        
        database="ventoo"
    )


def query(sql, params=None):
    """
    Ejecuta una consulta y devuelve todos los resultados.
    """
    db = get_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute(sql, params or ())
    results = cursor.fetchall()

    cursor.close()
    db.close()
    return results