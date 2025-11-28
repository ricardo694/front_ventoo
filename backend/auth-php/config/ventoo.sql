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
    Id_pedido INT(6) NOT NULL,
    Direccion_envio VARCHAR(50) NOT NULL,
    Fecha_pedido DATE NOT NULL,
    Metodo_pago VARCHAR(15) NOT NULL,
    Estado_pedido VARCHAR(15) NOT NULL,
    Total INT(10) NOT NULL,
    Id_usuario INT(6) NOT NULL,
    PRIMARY KEY (Id_pedido, Id_usuario)
);

-- ==============================
--     USUARIO_PRODUCTO (Carrito)
-- ==============================
CREATE TABLE Usuario_Producto (
    Id_usuario INT(6) NOT NULL,
    Id_producto INT(6) NOT NULL,
    Fecha_agregado DATE NOT NULL,
    Cantidad INT(10) NOT NULL,
    PRIMARY KEY (Id_usuario, Id_producto)
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

ALTER TABLE Usuario_Producto 
ADD CONSTRAINT fk_usuarioproducto_usuario 
    FOREIGN KEY (Id_usuario) 
    REFERENCES Usuario (Id_usuario)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

ALTER TABLE Usuario_Producto 
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



