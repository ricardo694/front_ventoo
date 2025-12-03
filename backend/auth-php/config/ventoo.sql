CREATE DATABASE ventoo DEFAULT CHARACTER SET utf8mb4;
USE ventoo;

-- ==============================
--          CATEGORIA
-- ==============================
CREATE TABLE Categoria (
    Id_categoria INT(6) NOT NULL AUTO_INCREMENT,
    Nombre_categoria VARCHAR(30) NOT NULL,
    PRIMARY KEY (Id_categoria)
);
-- ==============================
--            USUARIO
-- ==============================
CREATE TABLE Usuario (
    Id_usuario INT(6) NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(30) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Telefono INT(10) NOT NULL,
    Contrasena VARCHAR(255) NOT NULL,
    Tipo_cliente VARCHAR(15) NOT NULL,
    Imagen VARCHAR(255) DEFAULT 'default.png',
    PRIMARY KEY (Id_usuario)
);


-- ==============================
--           PRODUCTO
-- ==============================
CREATE TABLE Producto (
    Id_producto INT(6) NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(255) NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL,
    Imagen MEDIUMTEXT NOT NULL,
    Fecha_publicacion DATE NOT NULL,
    Id_categoria INT(6) NOT NULL,
    Id_usuario INT(6) NOT NULL,
    PRIMARY KEY (Id_producto)
);

-- ==============================
--            PEDIDO
-- ==============================
CREATE TABLE Pedido (
    Id_pedido INT(6) NOT NULL AUTO_INCREMENT,
    Direccion_envio VARCHAR(50) NOT NULL,
    Fecha_pedido DATE NOT NULL,
    Metodo_pago VARCHAR(15) NOT NULL,
    Estado_pedido VARCHAR(15) NOT NULL,
    Total INT(10) NOT NULL,
    Id_usuario INT(6) NOT NULL,
    PRIMARY KEY (Id_pedido)
);
-- ==============================
--            PEDIDO-DETALLE ()
-- ==============================
CREATE TABLE Pedido_Detalle (
    Id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    Id_pedido INT(6) NOT NULL,
    Id_producto INT(6) NOT NULL,
    Cantidad INT(10) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (Id_pedido) REFERENCES Pedido(Id_pedido)
        ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY (Id_producto) REFERENCES Producto(Id_producto)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ==============================
--      Carrito
-- ==============================
CREATE TABLE Carrito (
    Id_carrito INT(6) AUTO_INCREMENT PRIMARY KEY,
    Id_usuario INT(6) NOT NULL,
    Id_producto INT(6) NOT NULL,
    Fecha_agregado DATE NOT NULL,
    Cantidad INT(10) NOT NULL
);
-- ==============================
--     RESEÑAS
-- ==============================
CREATE TABLE Resena (
    Id_resena INT AUTO_INCREMENT PRIMARY KEY,
    Id_producto INT(6) NOT NULL,
    Id_usuario INT(6) NOT NULL,
    Comentario VARCHAR(255) NOT NULL,
    Estrellas INT(1) NOT NULL CHECK (Estrellas BETWEEN 1 AND 5),
    Fecha_resena DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (Id_producto) REFERENCES Producto(Id_producto)
        ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY (Id_usuario) REFERENCES Usuario(Id_usuario)
        ON DELETE CASCADE ON UPDATE CASCADE
);
-- ==============================
--        CLAVES FORÁNEAS
-- ==============================

ALTER TABLE Producto 
ADD CONSTRAINT fk_producto_categoria 
    FOREIGN KEY (Id_categoria) 
    REFERENCES Categoria (Id_categoria)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

ALTER TABLE Pedido 
ADD CONSTRAINT fk_pedido_usuario 
    FOREIGN KEY (Id_usuario) 
    REFERENCES Usuario (Id_usuario)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

ALTER TABLE Carrito
ADD CONSTRAINT fk_usuarioproducto_usuario 
    FOREIGN KEY (Id_usuario) 
    REFERENCES Usuario (Id_usuario)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

ALTER TABLE Carrito 
ADD CONSTRAINT fk_usuarioproducto_producto 
    FOREIGN KEY (Id_producto) 
    REFERENCES Producto (Id_producto)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

 ALTER TABLE Producto
ADD CONSTRAINT fk_producto_usuario
    FOREIGN KEY (Id_usuario)
    REFERENCES Usuario(Id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

-- ==============================
--   CATEGORÍAS BASE
-- ==============================
INSERT INTO Categoria (Nombre_categoria) VALUES
('Ropa'),
('Calzado'),
('Electrónica'),
('Hogar'),
('Cocina'),
('Belleza y Cuidado Personal'),
('Juguetes'),
('Deportes'),
('Mascotas'),
('Accesorios'),
('Herramientas'),
('Libros'),
('Oficina'),
('Salud'),
('Arte y Manualidades');



