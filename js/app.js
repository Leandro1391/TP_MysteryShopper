var app = angular.module('Mystery', ['ngAnimate','ui.router','angularFileUpload', 'satellizer'])



.config(function($stateProvider, $urlRouterProvider, $authProvider) {

  $authProvider.loginUrl = 'TpLab4Iadanza/PHP/clases/Autentificador.php';
  $authProvider.signupUrl = 'TpLab4Iadanza/PHP/clases/Autentificador.php';
  $authProvider.tokenName = 'MiPrimerTokenRSP';
  $authProvider.tokenPrefix = 'otroEjemploR';
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


  .state('login', {
    url: '/login',
    views: {
      'principal': { templateUrl: 'template/login.html',controller: 'controlLogin' }
    }
  })

 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});



app.controller('controlMenu', function($scope, $http, $auth, $state) {
  $scope.DatoTest="**Menu**";

  if($auth.isAuthenticated())
  {
    //PARA HACER VISIBLES LOS BOTONES DE ACUERDO AL TIPO

    console.log("estoy en el if is Authenticated");

    $scope.esVisible={}; //PARA EL NG-IF ADMIN Y VENDEDOR
    if($auth.getPayload().tipo=="administrador" || $auth.getPayload().tipo=="vendedor")
    {
      console.info("estoy en if, tipo: " + $auth.getPayload().tipo);
      $scope.esVisible=true;
    }
    else
    {
      console.info("estoy en else, tipo: " + $auth.getPayload().tipo);
      $scope.esVisible=false;
    }

    $scope.esVisibleAdmin={}; //PARA EL NG-IF SOLO ADMIN
    if($auth.getPayload().tipo=="administrador")
    {
      console.info("estoy en if, tipo: " + $auth.getPayload().tipo);
      $scope.esVisibleAdmin=true;
    }
    else
    {
      console.info("estoy en else, tipo: " + $auth.getPayload().tipo);
      $scope.esVisibleAdmin=false;
    }

    console.info($auth.isAuthenticated(), $auth.getPayload());
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

app.controller('controlUsuario')


 //controller del Menu Superior

app.controller('controlMenuSuperior', function($scope, $http, $auth, $state) {
  $scope.usuario={};
  $scope.usuario.tipo=$auth.getPayload().tipo;
  //$scope.usuario.foto=$auth.getPayload().foto;   tengo que traer la foto con otro método

  console.log("Estoy en el menu Superior")
  console.log($auth.getPayload());

  if($auth.isAuthenticated())
  {
    //PARA HACER VISIBLES LOS BOTONES DE ACUERDO AL TIPO

    console.log("estoy en el if is Authenticated");

    $scope.esVisible={}; //PARA EL NG-IF ADMIN Y VENDEDOR
    if($auth.getPayload().tipo=="administrador" || $auth.getPayload().tipo=="cliente")
    {
      console.info("estoy en if, tipo: " + $auth.getPayload().tipo);
      $scope.esVisible=true;
    }
    else
    {
      console.info("estoy en else, tipo: " + $auth.getPayload().tipo);
      $scope.esVisible=false;
    }

    $scope.esVisibleAdmin={}; //PARA EL NG-IF SOLO ADMIN
    if($auth.getPayload().tipo=="administrador")
    {
      console.info("estoy en if, tipo: " + $auth.getPayload().tipo);
      $scope.esVisibleAdmin=true;
    }
    else
    {
      console.info("estoy en else, tipo: " + $auth.getPayload().tipo);
      $scope.esVisibleAdmin=false;
    }

    console.info($auth.isAuthenticated(), $auth.getPayload());
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


app.controller('controlGrillaUsuario', function($scope, $http,$location,$state) {
    $scope.DatoTest="**grilla Usuario**";


$scope.guardar = function(usuario){

console.log( JSON.stringify(usuario));
  $state.go("modificarUsuario, {usuario:" + JSON.stringify(usuario)  + "}");
}

 
  $http.get('PHP/nexo.php', { params: {accion :"traer"}})
  .then(function(respuesta) {       

         $scope.ListadoUsuarios = respuesta.data.listado;
         console.log(respuesta.data);

    },function errorCallback(response) {
         $scope.ListadoUsuarios= [];
        console.log( response);     
   });

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

});
//Fin controller GrillaUsuario



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