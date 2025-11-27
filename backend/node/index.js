const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const session = require('express-session');
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcrypt');

const app = express();

/* ===================== CORS + STATIC ===================== */
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

/* ===================== MULTER ===================== */
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

/* ===================== CONEXIÓN BD ===================== */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ventoo'
});

db.connect(err => {
    if (err) return console.error("Error de conexión:", err);
    console.log("Conectado a la base de datos");
});

/* ===================== LOGIN ===================== */
app.post("/login", (req, res) => {
    const { email, contrasena } = req.body;

    const query = "SELECT * FROM Usuario WHERE Email = ?";
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });
        if (results.length === 0) return res.status(401).json({ error: "Usuario no registrado" });

        const usuario = results[0];
        const contraseñaIngresada = contrasena.trim();

        let hash = usuario.Contrasena;
        if (hash.startsWith("$2y$")) hash = "$2a$" + hash.slice(4);

        const match = await bcrypt.compare(contraseñaIngresada, hash);
        if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

        req.session.usuario = usuario;
        res.json({ message: "Inicio de sesión exitoso", usuario });
    });
});

/* ===================== LOGOUT ===================== */
app.post('/cerrar_sesion', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ success: false, message: "Error al cerrar sesión" });
        res.status(201).json({ success: true, message: 'Sesión cerrada' });
    });
});

/* ===================== USUARIO LOGUEADO ===================== */
app.get('/usuario_logueado', (req, res) => {
    if (!req.session.usuario) {
        return res.json({ success: false, message: "No hay sesión activa" });
    }
    res.json({ success: true, usuario: req.session.usuario });
});

/* ===================== SUBIR IMAGEN PERFIL ===================== */
app.post('/subir_imagen', upload.single("imagen"), (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ success: false, message: "No autorizado" });
    }

    const imagen = req.file.filename;

    const query = "UPDATE Usuario SET Imagen = ? WHERE Id_usuario = ?";
    db.query(query, [imagen, req.session.usuario.Id_usuario], err => {
        if (err) return res.status(500).json({ success: false });

        req.session.usuario.Imagen = imagen;

        res.json({
            success: true,
            imagen: `http://localhost:3001/uploads/${imagen}`
        });
    });
});

/* ============================================================
   FUNCIÓN PARA NORMALIZAR IMÁGENES (reutilizada en todas partes)
=============================================================== */
function normalizarImagen(imagen) {
    if (!imagen) return "";

    imagen = imagen.trim();

    // Caso 1: URL externa
    if (imagen.startsWith("http://") || imagen.startsWith("https://")) {
        return imagen;
    }

    // Caso 2: archivo subido (sin base64)
    if (!imagen.includes("base64") && !imagen.startsWith("data:image")) {
        return `http://localhost:3001/uploads/${imagen}`;
    }

    // Caso 3: base64 REAL
    if (!imagen.startsWith("data:image")) {
        return `data:image/jpeg;base64,${imagen}`;
    }

    return imagen;
}

/* ===================== OBTENER PRODUCTOS ===================== */
app.get("/productos", (req, res) => {
    const query = "SELECT * FROM Producto ORDER BY Fecha_publicacion DESC";

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ success: false });

        const productosLimpios = results.map(p => ({
            ...p,
            Imagen: normalizarImagen(p.Imagen)
        }));

        res.json({ success: true, productos: productosLimpios });
    });
});

/* ===================== REGISTRAR PRODUCTO ===================== */
app.post("/registrar_producto", (req, res) => {
    if (!req.session.usuario) {
        return res.json({ success: false, message: "Debes iniciar sesión" });
    }

    const { titulo, descripcion, precio, imagen, categoria } = req.body;
    const idUsuario = req.session.usuario.Id_usuario;

    const imagenLimpia = (imagen || "").trim();
    const fecha = new Date().toISOString().slice(0, 10);

    const queryProducto = `
        INSERT INTO Producto (Nombre, Descripcion, Precio, Imagen, Fecha_publicacion, Id_categoria)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(queryProducto, [titulo, descripcion, precio, imagenLimpia, fecha, categoria], (err, result) => {
        if (err) return res.status(500).json({ success: false });

        const idProducto = result.insertId;

        const rel = `
            INSERT INTO Usuario_Producto (Id_usuario, Id_producto, Fecha_agregado, Cantidad)
            VALUES (?, ?, ?, ?)
        `;

        db.query(rel, [idUsuario, idProducto, fecha, 1], (err2) => {
            if (err2) return res.status(500).json({ success: false });

            res.json({
                success: true,
                message: "Producto registrado correctamente",
                idProducto
            });
        });
    });
});
/* ===================== OBTENER CATEGORÍAS ===================== */
app.get("/categorias", (req, res) => {
    db.query("SELECT * FROM Categoria ORDER BY Nombre_categoria", (err, results) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true, categorias: results });
    });
});

/* ===================== PRODUCTO + VENDEDOR ===================== */
app.get("/producto/:id", (req, res) => {
    const id = req.params.id;

    const queryProducto = `
        SELECT p.*, u.Id_usuario AS IdVendedor, u.Nombre AS NombreVendedor, u.Imagen AS FotoVendedor
        FROM Producto p
        LEFT JOIN Usuario_Producto up ON up.Id_producto = p.Id_producto
        LEFT JOIN Usuario u ON u.Id_usuario = up.Id_usuario
        WHERE p.Id_producto = ?
        LIMIT 1
    `;

    db.query(queryProducto, [id], (err, result) => {
        if (err || result.length === 0) {
            return res.json({ success: false, message: "Producto no encontrado" });
        }

        const producto = result[0];

        // Normalizar imágenes del producto y el vendedor
        producto.Imagen = normalizarImagen(producto.Imagen);
        producto.FotoVendedor = normalizarImagen(producto.FotoVendedor);

        const queryMas = `
            SELECT p.*
            FROM Producto p
            LEFT JOIN Usuario_Producto up ON up.Id_producto = p.Id_producto
            WHERE up.Id_usuario = ? AND p.Id_producto != ?
            LIMIT 4
        `;

        db.query(queryMas, [producto.IdVendedor, id], (err2, masProductos) => {
            const productosNorm = (masProductos || []).map(p => ({
                ...p,
                Imagen: normalizarImagen(p.Imagen)
            }));

            res.json({
                success: true,
                producto,
                masDelVendedor: productosNorm
            });
        });
    });
});

/* ===================== PUERTO ===================== */
app.listen(3001, () => {
    console.log(`Servidor corriendo en http://localhost:3001`);
});
