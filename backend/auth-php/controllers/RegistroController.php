<?php

require_once "../config/database.php";
require_once "../models/Usuario.php";

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept, Origin");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 3600");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
$data = json_decode(file_get_contents("php://input"));

if(!$data){
    echo json_encode(["error" => "No se recibieron datos"]);
    exit;
}



$db = (new Database())->connect();
$usuario = new Usuario($db);

$usuario->Nombre = $data->nombre;
$usuario->Email = $data->email;
$usuario->Telefono = $data->telefono;
$usuario->Tipo_cliente = $data->tipo;
$usuario->Contrasena = password_hash($data->password, PASSWORD_BCRYPT);

if($usuario->registrar()){
    echo json_encode(["message" => "Usuario registrado correctamente"]);
} else {
    echo json_encode(["error" => "Error al registrar usuario"]);
}
