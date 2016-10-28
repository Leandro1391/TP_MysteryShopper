var app = angular.module('Mystery', ['ngAnimate','ui.router','angularFileUpload', 'satellizer'])



.config(function($stateProvider, $urlRouterProvider, $authProvider) {

  $authProvider.loginUrl = 'TpLab4Iadanza/PHP/clases/Autentificador.php';
  $authProvider.signupUrl = 'TpLab4Iadanza/PHP/clases/Autentificador.php';
  $authProvider.tokenName = 'TokenLeandro';
  $authProvider.tokenPrefix = 'Len';
  $authProvider.authHeader = 'data';

  $stateProvider //si no está está linea no toma los .state
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
      'principal': {templateUrl: 'template/altaUsuario.html', controller: 'controlUsuario' },
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
  $scope.DatoTest="**Menu**";

  if($auth.isAuthenticated())
  {
    //PARA HACER VISIBLES LOS BOTONES DE ACUERDO AL TIPO

    // console.log("estoy en el if is Authenticated");

    $scope.esVisible={}; //PARA EL NG-IF ADMIN Y VENDEDOR
    
    if($auth.getPayload().tipo=="administrador" || $auth.getPayload().tipo=="vendedor")
    {
      // console.info("estoy en if, tipo: " + $auth.getPayload().tipo);
      $scope.esVisible=true;
    }
    else
    {
      // console.info("estoy en else, tipo: " + $auth.getPayload().tipo);
      $scope.esVisible=false;
    }

    $scope.esVisibleAdmin={}; //PARA EL NG-IF SOLO ADMIN
    if($auth.getPayload().tipo=="administrador")
    {
      // console.info("estoy en if, tipo: " + $auth.getPayload().tipo);
      $scope.esVisibleAdmin=true;
    }
    else
    {
      // console.info("estoy en else, tipo: " + $auth.getPayload().tipo);
      $scope.esVisibleAdmin=false;
    }

    // console.info($auth.isAuthenticated(), $auth.getPayload());
    $scope.DatoTest="**Menu**";
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



/////////////////////////////////////
//APP CONTROLLER LOCAL //////////////
////////////////////////////////////


app.controller('controlGrillaLocal', function($scope, $http, $state, $auth, FactoryLocal) {
  if($auth.isAuthenticated())
  {
    $scope.DatoTest="GRILLA LOCALES";

    //PARA HACER VISIBLES LOS BOTONES DE ACUERDO AL TIPO
    $scope.esVisible={
      adminClient: false,
      admin: false,
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
        $scope.esVisible.admin=false;
    }
    else
    {
      console.info("estoy en else, tipo: " + $auth.getPayload().tipo);
      $scope.esVisible.user=true;
    }

    //FactoryLocal.mostrarapellido();

    FactoryLocal.mostrarNombre("otro").then(function(respuesta){

     $scope.ListadoLocales=respuesta;
 
   });
    //$scope.Listadopersonas =factory.fu();
    //$http.get('PHP/nexo.php', { params: {accion :"traer"}})
      $scope.Borrar=function(id){
    console.log("borrar"+id);
       $http.delete('Datos/locales/'+id)
     .then(function(respuesta) {   
    // debugger;    
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

  ////////////////////
  //APP Controller USUARIO
  ////////////////////

app.controller('controlUsuario')


 //controller del MENU SUPERIOR

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

    $scope.esVisible={}; //PARA EL NG-IF ADMIN Y VENDEDOR
    if($auth.getPayload().tipo=="administrador" || $auth.getPayload().tipo=="cliente")
    {
      // console.info("estoy en if, tipo: " + $auth.getPayload().tipo);
      $scope.esVisible=true;
    }
    else
    {
      // console.info("estoy en else, tipo: " + $auth.getPayload().tipo);
      $scope.esVisible=false;
    }

    $scope.esVisibleAdmin={}; //PARA EL NG-IF SOLO ADMIN
    if($auth.getPayload().tipo=="administrador")
    {
      // console.info("estoy en if, tipo: " + $auth.getPayload().tipo);
      $scope.esVisibleAdmin=true;
    }
    else
    {
      // console.info("estoy en else, tipo: " + $auth.getPayload().tipo);
      $scope.esVisibleAdmin=false;
    }

    // console.info($auth.isAuthenticated(), $auth.getPayload());
    // $scope.DatoTest="**Menu**";
    // $scope.usuario=$auth.getPayload();

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


app.controller('controlGrillaUsuario', function($scope, $http, $location, $state, FactoryUsuario) {
    $scope.DatoTest="**grilla Usuario**";


$scope.guardar = function(usuario){

console.log( JSON.stringify(usuario));
  $state.go("modificarUsuario, {usuario:" + JSON.stringify(usuario)  + "}");
}

FactoryUsuario.mostrarNombre("otro").then(function(respuesta){

     $scope.ListadoUsuarios=respuesta;

     console.log("respuesta line 204 factory del controllerGrillaUsuario");
 
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
    console.log("borrar"+usuario);
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

});                                       //Fin controller GrillaUsuario



 //CONTROLLER DEl Login

app.controller('controlLogin', function($scope, $http, $auth, $state) {
  
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
    $scope.DatoTest="**Iniciar Sesión**";
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


//
// EMPIEZAN LOS SERVICIOS
//

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