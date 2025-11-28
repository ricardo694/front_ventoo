const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const session = require('express-session');
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcrypt');

const app = express();

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


const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });


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

// ===================== LOGIN =====================
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

// ===================== LOGOUT ===================== 
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
            imagen
        });
    });
});

// ======================== FUNCIÓN PARA NORMALIZAR IMÁGENES====================================


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
        return res.status(401).json({
            success: false,
            message: "Debes iniciar sesión para registrar un producto"
        });
    }

    const { titulo, descripcion, precio, imagen, categoria } = req.body;
    const idUsuario = req.session.usuario.Id_usuario;

    const imagenLimpia = (imagen || "").trim();
    const fecha = new Date().toISOString().slice(0, 10);

    const queryProducto = `
        INSERT INTO Producto (Nombre, Descripcion, Precio, Imagen, Fecha_publicacion, Id_categoria, Id_usuario)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(queryProducto, [titulo, descripcion, precio, imagenLimpia, fecha, categoria, idUsuario], (err, result) => {
        if (err) return res.status(500).json({ success: false });

        res.json({
            success: true,
            message: "Producto registrado correctamente",
            idProducto: result.insertId
        });
    });
});


/* ===================== ELIMINAR PRODUCTO DEL VENDEDOR ===================== */
app.delete("/eliminar_producto/:id", (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ success: false, message: "No autorizado" });
    }

    const idProducto = req.params.id;
    const idUsuario = req.session.usuario.Id_usuario;

    // Primero verificar que el producto pertenece al usuario
    const verificar = `
        SELECT * FROM Usuario_Producto 
        WHERE Id_usuario = ? AND Id_producto = ?
    `;

    db.query(verificar, [idUsuario, idProducto], (err, result) => {
        if (err) return res.status(500).json({ success: false });

        if (result.length === 0) {
            return res.status(403).json({
                success: false,
                message: "No puedes eliminar productos que no son tuyos"
            });
        }

        // Eliminar relación usuario-producto
        const eliminarRelacion = `
            DELETE FROM Usuario_Producto WHERE Id_producto = ?
        `;

        db.query(eliminarRelacion, [idProducto], err2 => {
            if (err2) return res.status(500).json({ success: false });

            // Eliminar producto
            const eliminarProducto = `
                DELETE FROM Producto WHERE Id_producto = ?
            `;

            db.query(eliminarProducto, [idProducto], err3 => {
                if (err3) return res.status(500).json({ success: false });

                return res.json({
                    success: true,
                    message: "Producto eliminado correctamente"
                });
            });
        });
    });
});

/* ===================== OBTENER PRODUCTO PARA EDITAR ===================== */
app.get("/producto_editar/:id", (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ success: false, message: "No autorizado" });
    }

    const idProducto = req.params.id;
    const idUsuario = req.session.usuario.Id_usuario;

    const query = `
        SELECT p.*, up.Cantidad
        FROM Producto p
        INNER JOIN Usuario_Producto up ON up.Id_producto = p.Id_producto
        WHERE p.Id_producto = ? AND up.Id_usuario = ?
        LIMIT 1
    `;

    db.query(query, [idProducto, idUsuario], (err, results) => {
        if (err || results.length === 0) {
            return res.json({ success: false, message: "Producto no encontrado" });
        }

        const producto = results[0];
        producto.Imagen = normalizarImagen(producto.Imagen);

        res.json({ success: true, producto });
    });
});

/* ===================== EDITAR PRODUCTO ===================== */
app.put("/editar_producto/:id", (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ success: false, message: "No autorizado" });
    }

    const idProducto = req.params.id;
    const idUsuario = req.session.usuario.Id_usuario;

    const { titulo, descripcion, precio, cantidad, imagen } = req.body;

    const imgLimpia = (imagen || "").trim();

    // Verificar que el producto es suyo
    const verificar = `
        SELECT * FROM Usuario_Producto  
        WHERE Id_usuario = ? AND Id_producto = ?
    `;

    db.query(verificar, [idUsuario, idProducto], (err, result) => {
        if (err || result.length === 0) {
            return res.status(403).json({
                success: false,
                message: "No puedes editar un producto que no es tuyo"
            });
        }

        // Actualizar producto
        const updateProducto = `
            UPDATE Producto 
            SET Nombre = ?, Descripcion = ?, Precio = ?, Imagen = ? 
            WHERE Id_producto = ?
        `;

        db.query(updateProducto, [titulo, descripcion, precio, imgLimpia, idProducto], err2 => {
            if (err2) return res.status(500).json({ success: false });

            // Actualizar cantidad en Usuario_Producto
            const updateCantidad = `
                UPDATE Usuario_Producto
                SET Cantidad = ?
                WHERE Id_producto = ? AND Id_usuario = ?
            `;

            db.query(updateCantidad, [cantidad, idProducto, idUsuario], err3 => {
                if (err3) return res.status(500).json({ success: false });

                res.json({
                    success: true,
                    message: "Producto actualizado"
                });
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
        SELECT p.*, 
               u.Id_usuario AS IdVendedor, 
               u.Nombre AS NombreVendedor, 
               u.Imagen AS FotoVendedor
        FROM Producto p
        LEFT JOIN Usuario u ON u.Id_usuario = p.Id_usuario
        WHERE p.Id_producto = ?
        LIMIT 1
    `;

    db.query(queryProducto, [id], (err, result) => {
        if (err || result.length === 0) {
            return res.json({ success: false, message: "Producto no encontrado" });
        }

        const producto = result[0];

        // Normalizar imágenes
        producto.Imagen = normalizarImagen(producto.Imagen);
        producto.FotoVendedor = normalizarImagen(producto.FotoVendedor);

        const queryMas = `
            SELECT *
            FROM Producto
            WHERE Id_usuario = ? AND Id_producto != ?
            ORDER BY Fecha_publicacion DESC
            LIMIT 4
        `;

        db.query(queryMas, [producto.IdVendedor, id], (err2, mas) => {
            const productosNorm = (mas || []).map(p => ({
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

/* ===================== PRODUCTOS DEL VENDEDOR ===================== */
app.get("/productos_vendedor", (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({
            success: false,
            message: "No autorizado"
        });
    }

    const idVendedor = req.session.usuario.Id_usuario;

    const query = `
        SELECT *
        FROM Producto
        WHERE Id_usuario = ?
        ORDER BY Fecha_publicacion DESC
    `;

    db.query(query, [idVendedor], (err, results) => {
        if (err) return res.status(500).json({ success: false });

        const productosLimpios = results.map(p => ({
            ...p,
            Imagen: normalizarImagen(p.Imagen)
        }));

        res.json({
            success: true,
            productos: productosLimpios
        });
    });
});
// ================== AGREGAR AL CARRITO ==================
app.post("/carrito/agregar", (req, res) => {
    const { Id_usuario, Id_producto, Cantidad } = req.body;

    if (!Id_usuario || !Id_producto || !Cantidad)
        return res.json({ success: false, message: "Datos incompletos" });

    const fecha = new Date().toISOString().slice(0, 10);

    // ¿Ya existe el producto en el carrito?
    const buscar = `
        SELECT * FROM Usuario_Producto 
        WHERE Id_usuario = ? AND Id_producto = ?
    `;

    db.query(buscar, [Id_usuario, Id_producto], (err, result) => {
        if (err) return res.json({ success: false });

        if (result.length > 0) {
            // Ya existe → actualizar cantidad
            const actualizar = `
                UPDATE Usuario_Producto 
                SET Cantidad = Cantidad + ?
                WHERE Id_usuario = ? AND Id_producto = ?
            `;

            db.query(actualizar, [Cantidad, Id_usuario, Id_producto], (err) => {
                if (err) return res.json({ success: false });
                return res.json({ success: true, message: "Cantidad actualizada" });
            });

        } else {
            // No existe → insertar
            const insertar = `
                INSERT INTO Usuario_Producto (Id_usuario, Id_producto, Fecha_agregado, Cantidad)
                VALUES (?, ?, ?, ?)
            `;

            db.query(insertar, [Id_usuario, Id_producto, fecha, Cantidad], (err) => {
                if (err) return res.json({ success: false });
                return res.json({ success: true, message: "Agregado al carrito" });
            });
        }
    });
});

//==============OBTENER CARRITO==================
app.get("/carrito/:idUsuario", (req, res) => {
    const { idUsuario } = req.params;

    const query = `
        SELECT up.Cantidad,
               p.Id_producto, p.Nombre, p.Precio, p.Imagen, p.Descripcion
        FROM Usuario_Producto up
        INNER JOIN Producto p ON p.Id_producto = up.Id_producto
        WHERE up.Id_usuario = ?
    `;

    db.query(query, [idUsuario], (err, results) => {
        if (err) return res.json({ success: false });
        res.json({ success: true, carrito: results });
    });
});

//=============ELIMINAR PRODUCTO DEL CARRITO======
app.delete("/carrito/eliminar/:idUsuario/:idProducto", (req, res) => {
    const { idUsuario, idProducto } = req.params;

    const sql = `
        DELETE FROM Usuario_Producto
        WHERE Id_usuario = ? AND Id_producto = ?
    `;

    db.query(sql, [idUsuario, idProducto], (err) => {
        if (err) return res.json({ success: false });
        res.json({ success: true });
    });
});

/* ===================== PUERTO ===================== */
app.listen(3001, () => {
    console.log(`Servidor corriendo en http://localhost:3001`);
});
