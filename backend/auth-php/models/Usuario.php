<?php

class Usuario {

    private $conn;
    private $table = "Usuario";

    public $Nombre;
    public $Email;
    public $Telefono;
    public $Contrasena;
    public $Tipo_cliente;

    public function __construct($db) {
        $this->conn = $db;
    }
    //registro
    public function registrar() {
        $query = "INSERT INTO $this->table 
                  (Nombre, Email, Telefono, Contrasena, Tipo_cliente)
                  VALUES (:nombre, :email, :telefono, :contrasena, :tipo)";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':nombre', $this->Nombre);
        $stmt->bindParam(':email', $this->Email);
        $stmt->bindParam(':telefono', $this->Telefono);
        $stmt->bindParam(':contrasena', $this->Contrasena);
        $stmt->bindParam(':tipo', $this->Tipo_cliente);

        return $stmt->execute();
    }
}