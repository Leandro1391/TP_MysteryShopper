<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */

require '../PHP/clases/AccesoDatos.php';
require '../PHP/clases/Locales.php';
require '../PHP/clases/usuario.php';
require '../vendor/autoload.php';
/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/hello[/{name}]', function ($request, $response, $args) {
    $response->write("Hello, " . $args['name']);
    return $response;
})->setArgument('name', 'World!');



$app->get('/locales[/]', function ($request, $response, $args) {
	
	$listado = Locales::TraerTodosLosLocales();
	return json_encode($listado);
	var_dump($listado);
});

$app->get('/locales/{id}', function ($request, $response, $args) {
	
	$unLocal = Locales::TraerUnLocal($args['id']);
	return json_encode($unLocal);
	var_dump($unLocal);
});


$app->delete('/locales/{id}', function ($request, $response, $args) {
	
	$listado=Locales::BorrarLocal($args['id']);
   $response->write(json_decode($listado)); 
    return $response;
});

$app->post('/locales', function ($request,$args) {
	echo "estoy en index alta php";
	$datos=json_decode($request->getBody());

	var_dump($datos);
	Locales::InsertarLocal($datos);
	
});
$app->put('/locales',function($request){
	echo "estoy index modificar.php";
	$unlocal=json_decode($request->getBody());
	//$unUsuario->id_usuario=$id;
	Locales::ModificarLocal($unlocal);
	
	var_dump($unlocal);

});



$app->get('/usuarios[/]', function ($request, $response, $args) {
	
	$listado = usuario::TraerTodosLosUsuarios();
	return json_encode($listado);
	var_dump($listado);
   
});

$app->get('/usuarios/{id}', function ($request, $response, $args) {
	
	$user = usuario::TraerUnUsuario($args['id']);
    return json_encode($user);
	var_dump($user);
});

// $app->get("/usuarios/", function() use($app)
// {
// 	$cnn = Conexion::DameAcceso();
// 	$sentencia = $cnn->prepare('call TraerTodasLasPersonas()');
	
// 	$sentencia->execute();
// 	$res = $sentencia->fetchAll(PDO::FETCH_ASSOC);
		
// 	$app->response->headers->set("Content-type", "application/json");
// 	$app->response->status(200);
// 	$app->response->body(json_encode($res));
// });

// $app->get("/usuarios/:id", function($id) use($app)
// {
// 	try{
// 		$cnn = Conexion::DameAcceso();
// 		$sentencia = $cnn->prepare('call TraerUnaPersona(?)');
		
// 		$sentencia->execute(array($id));
// 		$res = $sentencia->fetchAll(PDO::FETCH_OBJ);

// 		$app->response->headers->set("Content-type", "application/json");
// 		$app->response->status(200);
// 		$app->response->body(json_encode($res));
// 	}
// 	catch(PDOException $e)
// 	{
// 		echo "Error: " . $e->getMessage();
// 	}
// });

// // POST: Para crear recursos
// $app->post("/usuarios/", function() use($app)
// {
// 	$nombre = $app->request->post("nombre");
// 	$dni = $app->request->post("dni");
// 	$apellido = $app->request->post("apellido");
// 	$foto = "pordefecto.png";//$app->request->post("foto");

// 	$cnn = Conexion::DameAcceso();
// 	$sentencia = $cnn->prepare('CALL InsertarPersona (?,?,?,?)');
	
	
// 	$status = 200;
// 	if ($sentencia->execute(array($nombre, $apellido, $dni, $foto)))
// 		$res = array("rta" => true);	
// 	else{
// 		$res = array("rta" => false);
// 		$status = 500;
// 	}
// 	$app->response->headers->set("Content-type", "application/json");
// 	$app->response->status($status);
// 	$app->response->body(json_encode(json_encode($res)));
// });


// // PUT: Para editar recursos
// $app->put("/usuarios/", function() use($app)
// {
// 	$nombre = $app->request->put("nombre");
// 	$id = $app->request->put("id");
// 	$apellido = $app->request->put("apellido");
// 	$foto = $app->request->put("foto");

// 	$cnn = Conexion::DameAcceso();
// 	$sentencia = $cnn->prepare('CALL ModificarPersona(?,?,?,?)');
// 	$status = 200;
// 	if ($sentencia->execute(array($id, $nombre, $apellido, $foto)))
// 		$res = array("rta" => true);	
// 	else{
// 		$res = array("rta" => false);
// 		$status = 500;
// 	}
		
// 	$app->response->headers->set("Content-type", "application/json");
// 	$app->response->status($status);
// 	$app->response->body(json_encode($res));
// });


// // DELETE: Para eliminar recursos
// $app->delete("/usuarios/:id", function($id) use($app)
// {
// 	try{
// 		$cnn = Conexion::DameAcceso();
// 		$sentencia = $cnn->prepare('CALL BorrarPersona(?)');
		
// 		$sentencia->execute(array($id));

// 		$app->response->headers->set("Content-type", "application/json");
// 		$app->response->status(200);
// 		$app->response->body(json_encode(array("res" => 111)));
// 	}
// 	catch(PDOException $e)
// 	{
// 		echo "Error: " . $e->getMessage();
// 	}
// });

// $app->get("/usuarios/", function() use($app)
// {
// 	$cnn = Conexion::DameAcceso();
// 	$sentencia = $cnn->prepare('call TraerTodasLasPersonas()');
	
// 	$sentencia->execute();
// 	$res = $sentencia->fetchAll(PDO::FETCH_ASSOC);
		
// 	$app->response->headers->set("Content-type", "application/json");
// 	$app->response->status(200);
// 	$app->response->body(json_encode($res));
// });

// $app->get("/usuarios/:id", function($id) use($app)
// {
// 	try{
// 		$cnn = Conexion::DameAcceso();
// 		$sentencia = $cnn->prepare('call TraerUnaPersona(?)');
		
// 		$sentencia->execute(array($id));
// 		$res = $sentencia->fetchAll(PDO::FETCH_OBJ);

// 		$app->response->headers->set("Content-type", "application/json");
// 		$app->response->status(200);
// 		$app->response->body(json_encode($res));
// 	}
// 	catch(PDOException $e)
// 	{
// 		echo "Error: " . $e->getMessage();
// 	}
// });

// // POST: Para crear recursos
// $app->post("/usuarios/", function() use($app)
// {
// 	$nombre = $app->request->post("nombre");
// 	$dni = $app->request->post("dni");
// 	$apellido = $app->request->post("apellido");
// 	$foto = "pordefecto.png";//$app->request->post("foto");

// 	$cnn = Conexion::DameAcceso();
// 	$sentencia = $cnn->prepare('CALL InsertarPersona (?,?,?,?)');
	
	
// 	$status = 200;
// 	if ($sentencia->execute(array($nombre, $apellido, $dni, $foto)))
// 		$res = array("rta" => true);	
// 	else{
// 		$res = array("rta" => false);
// 		$status = 500;
// 	}
// 	$app->response->headers->set("Content-type", "application/json");
// 	$app->response->status($status);
// 	$app->response->body(json_encode(json_encode($res)));
// });


// // PUT: Para editar recursos
// $app->put("/usuarios/", function() use($app)
// {
// 	$nombre = $app->request->put("nombre");
// 	$id = $app->request->put("id");
// 	$apellido = $app->request->put("apellido");
// 	$foto = $app->request->put("foto");

// 	$cnn = Conexion::DameAcceso();
// 	$sentencia = $cnn->prepare('CALL ModificarPersona(?,?,?,?)');
// 	$status = 200;
// 	if ($sentencia->execute(array($id, $nombre, $apellido, $foto)))
// 		$res = array("rta" => true);	
// 	else{
// 		$res = array("rta" => false);
// 		$status = 500;
// 	}
		
// 	$app->response->headers->set("Content-type", "application/json");
// 	$app->response->status($status);
// 	$app->response->body(json_encode($res));
// });


// // DELETE: Para eliminar recursos
// $app->delete("/usuarios/:id", function($id) use($app)
// {
// 	try{
// 		$cnn = Conexion::DameAcceso();
// 		$sentencia = $cnn->prepare('CALL BorrarPersona(?)');
		
// 		$sentencia->execute(array($id));

// 		$app->response->headers->set("Content-type", "application/json");
// 		$app->response->status(200);
// 		$app->response->body(json_encode(array("res" => 111)));
// 	}
// 	catch(PDOException $e)
// 	{
// 		echo "Error: " . $e->getMessage();
// 	}
// });

$app->run();
