<?php
require_once"AccesoDatos.php";
class Producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
 	public $porcentaje;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetPorcentaje()
	{
		return $this->porcentaje;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	/*public function GetDni()
	{
		return $this->dni;
	}
	public function GetFoto()
	{
		return $this->foto;
	}*/

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetPorcentaje($valor)
	{
		$this->porcentaje = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	/*public function SetDni($valor)
	{
		$this->dni = $valor;
	}
	public function SetFoto($valor)
	{
		$this->foto = $valor;
	}*/
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Producto::TraerUnProducto($id);	
			$this->id = $id;		
			$this->nombre = $obj->nombre;
			$this->porcentaje = $obj->porcentaje;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->nombre."-".$this->porcentaje;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnProducto($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from misproductos where id =:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnProducto(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscado= $consulta->fetchObject('producto');
		return $productoBuscado;	
					
	}
	
	public static function TraerTodosLosProductos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from misproductos");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasProductos() ");
		$consulta->execute();			
		$arrProductos= $consulta->fetchAll(PDO::FETCH_CLASS, "producto");	
		return $arrProductos;
	}
	
	public static function BorrarProducto($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from misproductos	WHERE id=:id");	
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarProducto(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarProducto($producto)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			/*$consulta =$objetoAccesoDato->RetornarConsulta("
				update producto 
				set nombre=:nombre,
				apellido=:apellido,
				foto=:foto
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();*/ 
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarProducto(:dni,:nombre,:apellido,:foto)");
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE misproductos set nombre=:nombre,porcentaje=:porcentaje WHERE id=:id");
			$consulta->bindValue(':id',$producto->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$producto->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':porcentaje', $producto->porcentaje, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarProducto($producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into misproductos (nombre,porcentaje)values(:nombre,:porcentaje)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarProducto (:nombre,:apellido,:dni,:foto)");
		$consulta->bindValue(':nombre',$producto->nombre, PDO::PARAM_STR);		
		$consulta->bindValue(':porcentaje', $producto->porcentaje, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//



	public static function TraerProductosTest()
	{
		$arrayDeProductos=array();

		$producto = new stdClass();
		$producto->id = "4";
		$producto->nombre = "rogelio";
		$producto->apellido = "agua";
		$producto->dni = "333333";
		$producto->foto = "333333.jpg";

		//$objetJson = json_encode($producto);
		//echo $objetJson;
		$persona2 = new stdClass();
		$persona2->id = "5";
		$persona2->nombre = "Bañera";
		$persona2->apellido = "giratoria";
		$persona2->dni = "222222";
		$persona2->foto = "222222.jpg";

		$persona3 = new stdClass();
		$persona3->id = "6";
		$persona3->nombre = "Julieta";
		$persona3->apellido = "Roberto";
		$persona3->dni = "888888";
		$persona3->foto = "888888.jpg";

		$arrayDeProductos[]=$producto;
		$arrayDeProductos[]=$persona2;
		$arrayDeProductos[]=$persona3;
		 
		

		return  $arrayDeProductos;
				
	}	


}
