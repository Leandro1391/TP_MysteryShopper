var app = angular.module('Mystery', ['ngAnimate','ui.router','angularFileUpload', 'satellizer'])



.config(function($stateProvider, $urlRouterProvider, $authProvider) {

  $authProvider.loginUrl = 'TpLab4Iadanza/PHP/clases/Autentificador.php';
  $authProvider.signupUrl = 'TpLab4Iadanza/PHP/clases/Autentificador.php';
  $authProvider.tokenName = 'TokenLeandro';
  $authProvider.tokenPrefix = 'Len';
  $authProvider.authHeader = 'data';

  $stateProvider //si no está esta linea no toma los .state
  .state('menu', {
    views: {
      'principal': { templateUrl: 'template/menu.html',controller: 'controlMenu' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html', controller: 'controlMenuSuperior'}
    }
    ,url:'/menu'
  })


  .state('altaUsuario', {
    url: '/altaUsuario',
    views: {
      'principal': {templateUrl: 'template/altaUsuario.html', controller: 'controlAltaUsuario' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html', controller: 'controlMenuSuperior'}
    }
  })

  .state('altaLocal', {
    url: '/altaLocal',
    views: {
      'principal': {templateUrl: 'template/altaLocal.html', controller: 'controlAltaLocal' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html', controller: 'controlMenuSuperior'}
    }
  })

  .state('grillaInforme', {
    url: '/grillaInforme',
    views: {
      'principal': {templateUrl: 'template/grillaInforme.html', controller: 'controlGrillaInforme' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html', controller: 'controlMenuSuperior'}
    }
  })

   .state('perfil', {
    url: '/perfil',
    views: {
      'principal': {templateUrl: 'template/perfil.html', controller: 'controlPerfil' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html', controller: 'controlMenuSuperior'}
    }
  })

  .state('grillaUsuario', {
    url: '/grillaUsuario',
    views: {
      'principal': { templateUrl: 'template/grillaUsuario.html',controller: 'controlGrillaUsuario' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html', controller: 'controlMenuSuperior'}
    }
  })

  .state('modificar', {
     url: '/modificar/{id}?:correo:nombre:clave:tipo:foto',
     views: {
      'principal': { templateUrl: 'template/altaUsuario.html',controller: 'controlModificacion' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html', controller: 'controlMenuSuperior'}
    }
  })

  .state('modificarLocal', {
      url: '/modificarLocal/{id}?:nombre:localidad:direccion:gerente',
     views: {
      'principal': { templateUrl: 'template/altaLocal.html',controller: 'controlModificarLocal' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html', controller: 'controlMenuSuperior'}
    }
  })

  .state('encuesta', {
      url: '/encuesta/{id}?:nombre:localidad:direccion',
     views: {
      'principal': { templateUrl: 'template/altaLocal.html',controller: 'controlEncuesta' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html', controller: 'controlMenuSuperior'}
    }
  })

  // .state('verFormulario', {
  //   url: '/verFormulario/{id}?:nombre:localidad',
  //    views: {
  //     'principal': { templateUrl: 'template/encuesta.html',controller: 'controlVerFormulario' },
  //     'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
  //   }
  // })

  .state('grillaLocal', {
    url: '/grillaLocal',
    views: {
      'principal': { templateUrl: 'template/grillaLocales.html',controller: 'controlGrillaLocal' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html', controller: 'controlMenuSuperior'}
    }
  })


  .state('login', {
    url: '/login',
    views: {
      'principal': { templateUrl: 'template/login.html',controller: 'controlLogin' }
    }
  })

 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});



    //APP Control MENU

app.controller('controlMenu', function($scope, $http, $auth, $state) {
  $scope.DatoTest="MENÚ";

  if($auth.isAuthenticated())
  {
     $scope.esVisible={
      admin:false,
      user:false,
      cliente:false
    }; 


    if($auth.getPayload().tipo=="administrador")
      $scope.esVisible.admin=true;
    if($auth.getPayload().tipo=="usuario")
      $scope.esVisible.user=true;
    if($auth.getPayload().tipo=="cliente")
      $scope.esVisible.cliente=true;

    
    $scope.usuario=$auth.getPayload();
    $scope.Logout=function()
    {
      $auth.logout()
      .then(function()
      {
        //console.log("estoy dentro del logout");
        $state.go("login");
      });
    };
  }
  else{$state.go("login");}

});



app.controller('controlMenuSuperior', function($scope, $http, $auth, $state) {
  $scope.usuario={};
  $scope.usuario.id = $auth.getPayload().id;
  $scope.usuario.tipo=$auth.getPayload().tipo;
  //$scope.usuario.foto=$auth.getPayload().foto;   tengo que traer la foto con otro método

  //SLIM

  $http.get('Datos/usuarios/'+ $scope.usuario.id)
  .then(function(respuesta) {       

          $scope.usuario = respuesta.data;
           

        },function errorCallback(response) {
            $scope.usuario= [];
            console.log( response);

    });

  // console.log("Estoy en el menu Superior")
  // console.log($auth.getPayload());

  if($auth.isAuthenticated())
  {
    //PARA HACER VISIBLES LOS BOTONES DE ACUERDO AL TIPO

    // console.log("estoy en el if is Authenticated");

    $scope.esVisible={
      admin:false,
      user:false,
      cliente:false
    }; //PARA EL NG-IF ADMIN Y CLIENTE


    if($auth.getPayload().tipo=="administrador")
      $scope.esVisible.admin=true;
    if($auth.getPayload().tipo=="usuario")
      $scope.esVisible.user=true;
    if($auth.getPayload().tipo=="cliente")
      $scope.esVisible.cliente=true;


    $scope.Logout=function()
    {
      $auth.logout()
      .then(function()
      {
        console.log("estoy dentro del logout");
        $state.go("login");
      });
    };
  }
  else{$state.go("login");}

});

app.controller('controlModificarLocal', function($scope, $http, $state, $auth, FileUploader, $stateParams) {

  $scope.local={};
  $scope.DatoTest="MODIFICAR LOCAL";
  $scope.uploader = new FileUploader({url: 'PHP/nexoLocal.php'});
  $scope.uploader.queueLimit = 1;
  $scope.local.id=$stateParams.id;
  $scope.local.nombre=$stateParams.nombre;
  $scope.local.localidad=$stateParams.localidad;
  $scope.local.direccion=$stateParams.direccion;
  $scope.local.gerente=$stateParams.gerente;


  $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    $http.post('PHP/nexoLocal.php', { datos: {accion :"modificar",local:$scope.local}})
        .then(function(respuesta) 
        {
          //aca se ejetuca si retorno sin errores       
          console.log(respuesta.data);
          $state.go("grillaLocales");
        },
        function errorCallback(response)
        {
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };

  $scope.Guardar=function(local)
  {

    $http.put('Datos/locales',$scope.local)
    .then(function(respuesta) {       
    //aca se ejetuca si retorno sin errores        
    console.log(respuesta.data);
    $state.go("grillaLocal");

    },function errorCallback(response) {        
     //aca se ejecuta cuando hay errores
    console.log( response);           
    });
    
  }


});


//////////////////////////////////////////////////
////////////////CONTROL ENCUESTAS/////////////////
//////////////////////////////////////////////////

app.controller('controlGrillaInforme', function($scope, $http, $state, $auth, FactoryInforme) {

  if($auth.isAuthenticated())
  {
    $scope.DatoTest="INFORMES";

    $scope.esVisible={
      admin:false,
      user:false,
      cliente:false
    };


    if($auth.getPayload().tipo=="administrador")
      $scope.esVisible.admin=true;
    if($auth.getPayload().tipo=="usuario")
      $scope.esVisible.user=true;
    if($auth.getPayload().tipo=="cliente")
      $scope.esVisible.cliente=true;


    FactoryInforme.mostrarNombre("otro").then(function(respuesta){

     $scope.ListadoInformes=respuesta;
 
   });
    //$scope.Listadopersonas =factory.fu();
    //$http.get('PHP/nexo.php', { params: {accion :"traer"}})
      $scope.Borrar=function(id) {

      console.log("borrar"+id);

      $http.delete('Datos/informes/'+id)
     .then(function(respuesta) {      
             //aca se ejetuca si retorno sin errores        
             console.log(respuesta.data);

            $http.get('Datos/informes')
            .then(function(respuesta) {       

                   $scope.ListadoInformes = respuesta.data;
                   console.log(respuesta.data);

              },function errorCallback(response) {
                   $scope.ListadoInformes= [];
                  console.log( response);

      });

        },function errorCallback(response) {        
            //aca se ejecuta cuando hay errores
            console.log( response);           
        });
  }

  }else{$state.go("login");}

});


/////////////////////////////////////////////////////////////
////////////CONTROLLER MODIFICAR USUARIO/////////////////////
/////////////////////////////////////////////////////////////


app.controller('controlModificacion', function($scope, $http, $state, $stateParams, FileUploader)
{
  $scope.usuario={};
  $scope.DatoTest="MODIFICAR DATOS";
  $scope.uploader = new FileUploader({url: 'Datos/index.php'});
  $scope.uploader.queueLimit = 1;
  $scope.usuario.id=$stateParams.id;
  $scope.usuario.correo=$stateParams.correo;
  $scope.usuario.nombre=$stateParams.nombre;
  $scope.usuario.clave=$stateParams.clave;
  $scope.usuario.tipo=$stateParams.tipo;
  $scope.usuario.foto=$stateParams.foto;


  $scope.cargarfoto=function(nombrefoto){
      var direccion="imagenes/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem($scope.uploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              $scope.uploader.queue.push(dummy);
         });
  }
  $scope.cargarfoto($scope.usuario.foto);


  $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    $http.post('PHP/nexo.php', { datos: {accion :"modificar",usuario:$scope.usuario}})
        .then(function(respuesta) 
        {
          //aca se ejetuca si retorno sin errores       
          console.log(respuesta.data);
          $state.go("grillaUsuario");
        },
        function errorCallback(response)
        {
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };


  $scope.Guardar=function(usuario)
  {
    if($scope.uploader.queue[0].file.name!='pordefecto.png')
    {
      var nombreFoto = $scope.uploader.queue[0]._file.name;
      $scope.usuario.foto=nombreFoto;
    }
    $scope.uploader.uploadAll();
  }
});


app.controller('controlPerfil', function($scope, $http, $auth, $state, cargadoDeFoto, FileUploader, $stateParams){

  $scope.DatoTest="PERFIL";

  $scope.usuario={};
  $scope.usuario.id = $auth.getPayload().id;

  //SLIM

  $http.get('Datos/usuarios/'+ $scope.usuario.id)
  .then(function(respuesta) {       

          $scope.usuario = respuesta.data;
           

        },function errorCallback(response) {
            $scope.usuario= [];
            console.log( response);

    });

  $scope.Logout=function()
    {
      $auth.logout()
      .then(function()
      {
        console.log("estoy dentro del logout");
        $state.go("login");
      });
    };

});

/////////////////////////////////////////////////////////////
////////////CONTROLLER VER Y COMPLETAR ENCUESTA//////////////
/////////////////////////////////////////////////////////////


app.controller('controlVerFormulario', function($scope, $http, $auth, $state, $stateParams, FileUploader)
{
  debugger;
  $scope.local={};

  $scope.DatoTest="COMPLETANDO ENCUESTA";

  $scope.uploader = new FileUploader({url: 'PHP/nexoLocal'});
  $scope.uploader.queueLimit = 1;
  $scope.local.id=$stateParams.id;
  $scope.local.nombre=$stateParams.nombre;
  $scope.local.localidad=$stateParams.localidad;
  $scope.local.mes=$stateParams.mes;
  $scope.local.anio=$stateParams.anio;
  $scope.local.porcentaje=$stateParams.porcentaje;
  $scope.local.empleado=$stateParams.empleado;
  $scope.local.puno=$stateParams.puno;
  $scope.local.pdos=$stateParams.pdos;
  $scope.local.ptres=$stateParams.ptres;
  $scope.local.pcuatro=$stateParams.pcuatro;




  $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    $http.post('PHP/nexoLocal.php', { datos: {accion :"modificar",local:$scope.local}})
        .then(function(respuesta) 
        {
          //aca se ejetuca si retorno sin errores       
          console.log(respuesta.data);
          $state.go("grillaLocal");
        },
        function errorCallback(response)
        {
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };


  $scope.Guardar=function(local)
  {
    if($scope.uploader.queue[0].file.name!='pordefecto.png')
    {
      var nombreFoto = $scope.uploader.queue[0]._file.name;
      $scope.local.foto=nombreFoto;
    }
    $scope.uploader.uploadAll();
  }
});



//////////////////////////////////////////////////////
///////////////////APP CONTROLLER LOCAL //////////////
//////////////////////////////////////////////////////


app.controller('controlGrillaLocal', function($scope, $http, $state, $auth, FactoryLocal) {
  if($auth.isAuthenticated())
  {
    $scope.DatoTest="GRILLA LOCALES";

    //PARA HACER VISIBLES LOS BOTONES DE ACUERDO AL TIPO
    $scope.esVisible={
      adminClient: false,
      admin: false,
      cliente: false,
      user: false
    }; //PARA EL NG-IF


    if($auth.getPayload().tipo=="administrador" || $auth.getPayload().tipo=="cliente")
    {
      console.info("estoy en if, tipo: " + $auth.getPayload().tipo);
      $scope.esVisible.adminClient = true;

      if ($auth.getPayload().tipo=="administrador") 
      {
        $scope.esVisible.admin=true;
      }
      else
        $scope.esVisible.cliente=true;
    }
    else
    {
      console.info("estoy en else, tipo: " + $auth.getPayload().tipo);
      $scope.esVisible.user=true;
    }


    FactoryLocal.mostrarNombre("otro").then(function(respuesta){

     $scope.ListadoLocales=respuesta;
 
   });
    //$scope.Listadopersonas =factory.fu();
    //$http.get('PHP/nexo.php', { params: {accion :"traer"}})
      $scope.Borrar=function(id) {

      console.log("borrar"+id);

      $http.delete('Datos/locales/'+id)
     .then(function(respuesta) {      
             //aca se ejetuca si retorno sin errores        
             console.log(respuesta.data);

            $http.get('Datos/locales')
            .then(function(respuesta) {       

                   $scope.ListadoLocales = respuesta.data;
                   console.log(respuesta.data);

              },function errorCallback(response) {
                   $scope.ListadoLocales= [];
                  console.log( response);

      });

        },function errorCallback(response) {        
            //aca se ejecuta cuando hay errores
            console.log( response);           
        });


  }

  }else{$state.go("login");}

});

  //////////////////////////
  //APP Controller USUARIO//
  //////////////////////////

app.controller('controlAltaUsuario', function($scope, $http ,$state, FileUploader, cargadoDeFoto) {
  $scope.DatoTest="ALTA USUARIO";

  $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
  $scope.uploader.queueLimit = 1;

//inicio las variables
  $scope.usuario={};
  $scope.usuario.correo= "pepe@pepe.com" ;
  $scope.usuario.nombre= "pepe" ;
  $scope.usuario.clave= "9876" ;
  $scope.usuario.tipo= "usuario" ;
  $scope.usuario.foto="pordefecto.png";
  
  cargadoDeFoto.CargarFoto($scope.usuario.foto,$scope.uploader);
 

  $scope.Guardar=function(){
  console.log($scope.uploader.queue);
  //debugger;
  if($scope.uploader.queue[0].file.name!='pordefecto.png')
  {
    var nombreFoto = $scope.uploader.queue[0]._file.name;
    $scope.usuario.foto=nombreFoto;
  }
  $scope.uploader.uploadAll();
    console.log("usuario a guardar:");
    console.log($scope.usuario);
  }

   $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    //alert($scope.persona.foto);
      $http.post('PHP/nexo.php', { datos: {accion :"insertar",usuario:$scope.usuario}})
        .then(function(respuesta) {       
           //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);
         $state.go("grillaUsuario");

      },function errorCallback(response) {        
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };

});


  /////////////////////////////////
  //APP Controller ALTA LOCAL//////
  /////////////////////////////////

app.controller('controlAltaLocal', function($scope, $http ,$state,  $auth, FileUploader) {

  if($auth.isAuthenticated())
  {
    $scope.DatoTest="ALTA ENCUESTA";

    // $scope.uploader = new FileUploader({url: 'PHP/nexoLocal.php'});


          $scope.local={
            nombre:"Farmacity",
            localidad:"Quilmes",
            direccion:"Av Rivadavía 49",
            gerente:"Andrea Bochi",
          };

          $scope.Guardar=function(){


              ///////////////////SLIM/////////////
              $http.post('Datos/locales',$scope.local)
                          .then(function(respuesta) {       
                               //aca se ejetuca si retorno sin errores        
                               console.log(respuesta.data);
                               $state.go("grillaLocales");

                          },function errorCallback(response) {        
                              //aca se ejecuta cuando hay errores
                              console.log( response);           
                          });

              // $scope.uploader.onSuccessItem=function(item, response, status, headers)
              // {
              //alert($scope.persona.foto);
                // $http.post('PHP/nexoLocal.php', { datos: {accion :"insertar",local:$scope.local}})
                //   .then(function(respuesta) {       
                //      //aca se ejetuca si retorno sin errores        
                //    console.log(respuesta.data);
                //    $state.go("encuestas");

                // },function errorCallback(response) {        
                //     //aca se ejecuta cuando hay errores
                //     console.log( response);           
                //   });
              //console.info("Ya guardé el archivo.", item, response, status, headers);
             //};

         }

  }else{$state.go("login");}

});


app.controller('controlEncuesta', function($scope, $http ,$state,  $auth, FileUploader, $stateParams) {

  if($auth.isAuthenticated())
  {
    $scope.DatoTest="COMPLETANDO ENCUESTA";

    $scope.uploader = new FileUploader({url: 'PHP/nexoLocal.php'});
    $scope.uploader.queueLimit = 1;

    $scope.local={};
    //$scope.local.id=$stateParams.id;
    $scope.local.nombre=$stateParams.nombre;
    $scope.local.localidad=$stateParams.localidad;
    $scope.local.direccion=$stateParams.direccion;
    $scope.local.empleado="";
    $scope.local.puno="";
    $scope.local.pdos="";
    $scope.local.ptres="";
    $scope.local.pcuatro="";
    $scope.local.porcentaje=null;
    $scope.local.fecha="18/11/2016";



          //tengo que traer los datos

          $scope.Guardar=function(){

              ///////////////////SLIM/////////////
              $http.post('Datos/informes',$scope.local)
                          .then(function(respuesta) {       
                               //aca se ejetuca si retorno sin errores        
                               console.log(respuesta.data);
                               $state.go("grillaInforme");

                          },function errorCallback(response) {        
                              //aca se ejecuta cuando hay errores
                              console.log( response);           
                          });
         }

  }

  else{$state.go("login");}

});





app.controller('controlGrillaUsuario', function($scope, $http, $location, $state, FactoryUsuario) {
    $scope.DatoTest="GRILLA USUARIO";


$scope.guardar = function(usuario){

console.log( JSON.stringify(usuario));
  $state.go("modificarUsuario, {usuario:" + JSON.stringify(usuario)  + "}");
}

FactoryUsuario.mostrarNombre("otro").then(function(respuesta){

$scope.ListadoUsuarios=respuesta;

 
});


  // $http.get('Datos/usuarios')
  // .then(function(respuesta) {       

  //         $scope.ListadoUsuarioa = respuesta.data;
  //          console.log(respuesta.data);

  //       },function errorCallback(response) {
  //           $scope.ListadoUsuarioa= [];
  //           console.log( response);

  //     });
 
  // $http.get('PHP/nexo.php', { params: {accion :"traer"}})
  // .then(function(respuesta) {       

  //        $scope.ListadoUsuarios = respuesta.data.listado;
  //        console.log(respuesta.data);

  //   },function errorCallback(response) {
  //        $scope.ListadoUsuarios= [];
  //       console.log( response);     
  //  });

  $scope.Borrar=function(usuario){
    if(confirm("¿Desea eliminar el usuario seleccionado?"))
    //console.log("borrar"+usuario);
    $http.post("PHP/nexo.php",{datos:{accion :"borrar",usuario:usuario}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
         .then(function(respuesta) {       
                 //aca se ejetuca si retorno sin errores        
                 console.log(respuesta.data);
                    $http.get('PHP/nexo.php', { params: {accion :"traer"}})
                    .then(function(respuesta) {       

                           $scope.ListadoUsuarios = respuesta.data.listado;
                           console.log(respuesta.data);

                      },function errorCallback(response) {
                           $scope.ListadoUsuarios= [];
                          console.log( response);
                          
                     });

          },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
              console.log( response);           
      });
  }// $scope.Borrar

});                                     


//////////////////////////////////////////////
///////////////CONTROLLER DEl LOGIN///////////
//////////////////////////////////////////////

app.controller('controlLogin', function($scope, $http, $auth, $state) {
  
  $scope.DatoTest="INICIAR SESIÓN";

  $scope.cargarCliente = function()
  {
    $scope.correo = "cliente@cliente.com";
    $scope.nombre = "julia";
    $scope.clave = "987";
  };  
  $scope.cargarUsuario = function()
  {
    $scope.correo = "user@user.com";
    $scope.nombre = "roger";
    $scope.clave = "123";
  };  
  $scope.cargarAdmin = function()
  {
    $scope.correo = "admin@admin.com";
    $scope.nombre = "admin";
    $scope.clave = "321";
  };


  if($auth.isAuthenticated())
  {
    $state.go("menu");
  }
  else
  {
    
    $scope.Login=function()
    {
      $auth.login({correo:$scope.correo, nombre:$scope.nombre, clave:$scope.clave})
      .then(function(respuesta)
      {
        console.log(respuesta);
        if($auth.isAuthenticated())
        {
          console.info($auth.isAuthenticated(), $auth.getPayload());
          $state.go("menu");
        }
        else
        {
          alert("No se encontró el usuario. Verifique los datos.");
        }
      });
    };
    $scope.CargarFormulario=function()
    {
      $state.go("altaUser");
    };
  }
});




////////////////////////////////////////////////
// EMPIEZAN LOS SERVICIOS Y FACTORY ////////////
///////////////////////////////////////////////


app.factory('FactoryInforme', function(ServicioInforme){

  var informe = {
   
    mostrarNombre:function(dato){
      
     return ServicioInforme.retornarInformes().then(function(respuesta){
       
        return respuesta;
      });
    },
    // mostrarapellido:function(){
    //   console.log("soy otra funcion de factory");
    // }
}
  return informe;

});


app.factory('FactoryLocal', function(ServicioLocal){

  var local = {
   
    mostrarNombre:function(dato){
      
     return ServicioLocal.retornarLocales().then(function(respuesta){
       
        return respuesta;
      });
    },
    // mostrarapellido:function(){
    //   console.log("soy otra funcion de factory");
    // }
}
  return local;

});

app.factory('FactoryUsuario', function(ServicioUsuario){
  var persona = {
   
    mostrarNombre:function(dato){
      
     return ServicioUsuario.retornarUsuarios().then(function(respuesta){
        console.log("estoy en el app.factory");
        return respuesta;
      });
    },
    mostrarapellido:function(){
     console.log("soy otra funcion de factory");
    }
}
  return persona;

});

//Siguen a un patrón Singleton
app.service('ServicioLocal', function($http){ //ESTO ES PARA LOCALES
  var listado;

  this.retornarLocales = function(){

       return $http.get('Datos/locales')
                    .then(function(respuesta) 
                    {     
                      console.log(respuesta.data);
                      return respuesta.data;
                    });
                  };

                  //return listado;
});


app.service('cargadoDeFoto',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,Uploader){
        var direccion="imagenes/"+nombrefoto;  
        $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem(Uploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              Uploader.queue.push(dummy);
         });
    }
});



app.service('ServicioUsuario', function($http){
  var listado;

  this.retornarUsuarios = function(){

       return $http.get('Datos/usuarios')
                    .then(function(respuesta) 
                    {     
                      console.log(respuesta.data);
                      return respuesta.data;
                    });
                  };

                  //return listado;
});


app.service('ServicioInforme', function($http){
  var listado;

  this.retornarInformes = function(){

       return $http.get('Datos/informes')
                    .then(function(respuesta) 
                    {     
                      console.log(respuesta.data);
                      return respuesta.data;
                    });
                  };

                  //return listado;
});