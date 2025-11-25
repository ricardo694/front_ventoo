CREATE DATABASE ventoo
    DEFAULT CHARACTER SET = 'utf8mb4';

    use ventoo;
    CREATE TABLE Categoria (
    Id_categoria int(6) NOT NULL AUTO_INCREMENT,
    Nombre_categoria varchar(30) NOT NULL,
    PRIMARY KEY (Id_categoria)
);

CREATE TABLE Pedido (
    Id_pedido int(6) NOT NULL,
    Direccion_envio varchar(50) NOT NULL,
    Fecha_pedido date NOT NULL,
    Metodo_pago varchar(15) NOT NULL,
    Estado_pedido varchar(15) NOT NULL,
    Total int(10) NOT NULL,
    Id_usuario int(6) NOT NULL,
    PRIMARY KEY (Id_pedido, Id_usuario)
);

CREATE TABLE Producto (
    Id_producto int(6) NOT NULL AUTO_INCREMENT,
    Nombre varchar(20) NOT NULL,
    Descripcion varchar(30) NOT NULL,
    Precio decimal(10, 2) NOT NULL,
    Imagen varchar(255) NOT NULL,
    Fecha_publicacion date NOT NULL,
    Id_categoria int(6) NOT NULL,
    PRIMARY KEY (Id_producto)
);

CREATE TABLE Usuario (
    Id_usuario int(6) NOT NULL AUTO_INCREMENT,
    Nombre varchar(30) NOT NULL,
    Email varchar(255) NOT NULL,
    Telefono int(10) NOT NULL,
    Contraseña varchar(255) NOT NULL,
    Tipo_cliente varchar(15) NOT NULL,
    PRIMARY KEY (Id_usuario)
);

CREATE TABLE Usuario_Producto (
    Id_usuario int(6) NOT NULL,
    Id_producto int(6) NOT NULL,
    Fecha_agregado date NOT NULL,
    Cantidad int(10) NOT NULL,
    PRIMARY KEY (Id_usuario, Id_producto)
);

-- 🔗 Claves foráneas con nombres claros y reglas en cascada
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