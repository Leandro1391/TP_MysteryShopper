<?php
require_once"AccesoDatos.php";
class Lacal
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
	public $localidad;
	public $mes;
	public $anio;
 	public $porcentaje;
 	public $puno;
 	public $pdos;
 	public $ptres;
 	public $pcuatro;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetLocalidad()
	{
		return $this->localidad;
	}
	public function GetMes()
	{
		return $this->mes;
	}
	public function GetAnio()
	{
		return $this->anio;
	}
	public function GetPorcentaje()
	{
		return $this->porcentaje;
	}
	public function GetPuno()
	{
		return $this->puno;
	}
	public function GetPdos()
	{
		return $this->pdos;
	}
	public function GetTres()
	{
		return $this->ptres;
	}
	public function GetCuatro()
	{
		return $this->pcuatro;
	}

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetLocalidad($valor)
	{
		$this->localidad = $valor;
	}
	public function SetMes($valor)
	{
		$this->mes = $valor;
	}
	public function SetAnio($valor)
	{
		$this->anio = $valor;
	}
	public function SetPorcentaje($valor)
	{
		$this->porcentaje = $valor;
	}
	public function SetPuno($valor)
	{
		$this->puno = $valor;
	}
	public function SetPdos($valor)
	{
		$this->pdos = $valor;
	}
	public function SetPtres($valor)
	{
		$this->ptres = $valor;
	}
	public function SetPcuatro($valor)
	{
		$this->pcuatro = $valor;
	}
	
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Producto::TraerUnLocal($id);

			$this->id = $id;		
			$this->nombre = $obj->nombre;
			$this->localidad = $obj->localidad;
			$this->mes = $obj->mes;
			$this->anio = $obj->anio;
			$this->porcentaje = $obj->porcentaje;
			$this->puno = $obj->puno;
			$this->pdos = $obj->pdos;
			$this->ptres = $obj->ptres;
			$this->pcuatro = $obj->pcuatro;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->nombre."-".$this->localidad."-".$this->mes."-".$this->anio."-".$this->porcentaje."-".$this->puno."-".$this->pdos."-".$this->ptres."-".$this->pcuatro;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnLocal($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM mislocales WHERE id =:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnProducto(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscado= $consulta->fetchObject('local');
		return $productoBuscado;	
					
	}
	
	public static function TraerTodosLosLocales()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from mislocales");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasProductos() ");
		$consulta->execute();			
		$arrProductos= $consulta->fetchAll(PDO::FETCH_CLASS, "local");	
		return $arrProductos;
	}
	
	public static function BorrarLocal($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM mislocales	WHERE id=:id");	
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarProducto(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarLocal($local)
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
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE mislocales set nombre=:nombre,localidad=:localidad,mes=:mes,anio=:anio,porcentaje=:porcentaje,puno=:puno,pdos=:pdos,ptres=:ptres,pcuatro=:pcuatro WHERE id=:id");
			$consulta->bindValue(':id',$producto->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$producto->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':mes', $producto->mes, PDO::PARAM_STR);
			$consulta->bindValue(':anio', $producto->anio, PDO::PARAM_STR);
			$consulta->bindValue(':porcentaje', $producto->porcentaje, PDO::PARAM_STR);
			$consulta->bindValue(':puno', $producto->puno, PDO::PARAM_BOOL);
			$consulta->bindValue(':pdos', $producto->pdos, PDO::PARAM_BOOL);
			$consulta->bindValue(':ptres', $producto->ptres, PDO::PARAM_BOOL);
			$consulta->bindValue(':pcuatro', $producto->pcuatro, PDO::PARAM_BOOL);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarLocal($local)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into mislocales (nombre,localidad,mes,anio,porcentaje,puno,pdos,ptres,pcuatro)values(:nombre,:localidad,:mes,:anio:,:porcentaje,:puno,:pdos,:ptres,:pcuatro)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarProducto (:nombre,:apellido,:dni,:foto)");
		$consulta->bindValue(':nombre',$producto->nombre, PDO::PARAM_STR);		
		$consulta->bindValue(':porcentaje', $producto->porcentaje, PDO::PARAM_STR);
		$consulta->bindValue(':mes', $producto->mes, PDO::PARAM_STR);
			$consulta->bindValue(':anio', $producto->anio, PDO::PARAM_STR);
			$consulta->bindValue(':porcentaje', $producto->porcentaje, PDO::PARAM_STR);
			$consulta->bindValue(':puno', $producto->puno, PDO::PARAM_BOOL);
			$consulta->bindValue(':pdos', $producto->pdos, PDO::PARAM_BOOL);
			$consulta->bindValue(':ptres', $producto->ptres, PDO::PARAM_BOOL);
			$consulta->bindValue(':pcuatro', $producto->pcuatro, PDO::PARAM_BOOL);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//



	// public static function TraerProductosTest()
	// {
	// 	$arrayDeProductos=array();

	// 	$producto = new stdClass();
	// 	$producto->id = "4";
	// 	$producto->nombre = "rogelio";
	// 	$producto->apellido = "agua";
	// 	$producto->dni = "333333";
	// 	$producto->foto = "333333.jpg";

	// 	//$objetJson = json_encode($producto);
	// 	//echo $objetJson;
	// 	$persona2 = new stdClass();
	// 	$persona2->id = "5";
	// 	$persona2->nombre = "Bañera";
	// 	$persona2->apellido = "giratoria";
	// 	$persona2->dni = "222222";
	// 	$persona2->foto = "222222.jpg";

	// 	$persona3 = new stdClass();
	// 	$persona3->id = "6";
	// 	$persona3->nombre = "Julieta";
	// 	$persona3->apellido = "Roberto";
	// 	$persona3->dni = "888888";
	// 	$persona3->foto = "888888.jpg";

	// 	$arrayDeProductos[]=$producto;
	// 	$arrayDeProductos[]=$persona2;
	// 	$arrayDeProductos[]=$persona3;
		 
		

	// 	return  $arrayDeProductos;
				
	// }	


}
