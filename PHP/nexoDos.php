<?php 

include "clases/padron.php";
// $_GET['accion'];


if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    // $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    $uploadPath = "../". DIRECTORY_SEPARATOR . 'fotos' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( 'respuesta' => 'Archivo Cargado!' );
    $json = json_encode( $answer );
    echo $json;
}elseif(isset($_GET['accion']))
{
	$accion=$_GET['accion'];
	if($accion=="traer")
	{
		$respuesta= array();
		//$respuesta['listado']=Persona::TraerPersonasTest();
		$respuesta['listado']=Padron::TraerTodosLosPadrones();
		//$respuesta['listado']=Padron::TraerTodasLisPadrones();
		//var_dump(Persona::TraerTodasLasPersonas());
		$arrayJson = json_encode($respuesta);
		echo  $arrayJson;
	}


	

}
else{

	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);

	if(isset($respuesta->datos->accion)){

		switch($respuesta->datos->accion)
		{
			case "borrar":	
				if($respuesta->datos->padron->foto!="pordefecto.png")
				{
					unlink("../fotos/".$respuesta->datos->padron->foto);
				}
				Padron::BorrarPadron($respuesta->datos->padron->id);
			break;

			case "insertar":	
				if($respuesta->datos->padron->foto!="pordefecto.png")
				{
					$rutaVieja="../fotos/".$respuesta->datos->padron->foto;
					$rutaNueva=$respuesta->datos->padron->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
					copy($rutaVieja, "../fotos/".$rutaNueva);
					unlink($rutaVieja);
					$respuesta->datos->padron->foto=$rutaNueva;
				}
				Padron::InsertarPadron($respuesta->datos->padron);
			break;

			case "buscar":
			
				echo json_encode(Padron::TraerUnPadron($respuesta->datos->id));
				break;
	
			case "modificar":
			
				if($respuesta->datos->padron->foto!="pordefecto.png")
				{
					$rutaVieja="../fotos/".$respuesta->datos->padron->foto;
					$rutaNueva=$respuesta->datos->padron->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
					copy($rutaVieja, "../fotos/".$rutaNueva);
					unlink($rutaVieja);
					$respuesta->datos->padron->foto=$rutaNueva;
				}
				Padron::ModificarPadron($respuesta->datos->padron);
				break;
		}//switch($respuesta->datos->accion)
	}//if(isset($respuesta->datos->accion)){


}



 ?>