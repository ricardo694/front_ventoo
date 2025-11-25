const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const session = require('express-session');

const app = express();
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret:'1234',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))

/*==============================conexión a la base de datos=============================*/ 
const db = mysql.createConnection({
    host: 'localhost',   
    user: 'root',   
    password: '', 
    database: 'ventoo' 
});

/*-------------------
    manejo de errores
---------------------
*/
db.connect(err => {
    if (err) {
    console.error("Error de conexión:", err);
    return;
    }
    console.log("Conectado a la base de datos ");
});

/*=========================================Rutas de registro==================================*/

/*----------------
    iniciar sesión
----------------*/
app.post("/login",(req,res)=>{
    const {email, password}=req.body;

    const query="SELECT * FROM Usuario WHERE Email = ? LIMIT 1";
    
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error al iniciar sesión:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }

        if (user.length === 0){
            return res.json({ success: false, message: "Correo no registrado" });
        }

        if (usuario.Password !== password) {
            return res.json({ success: false, message: "Contraseña incorrecta" });
        }

        if (results.length > 0) {
            req.session.usuario = results[0]
            res.json({ message: "Inicio de sesión exitoso", usuario: results[0] });
        } 
            req.session.usuario = {
            id: user.ID,
            email: user.Email,
            nombre: user.Nombre,
            rol: user.Rol
        };

            return res.json({
            success: true,
            message: "Inicio de sesión exitoso",
            usuario: req.session.usuario
        });
    });
})

/*--------
    puerto
----------
*/

app.listen(3001, () => {
    console.log(`Servidor corriendo en http://localhost:3001`);
});