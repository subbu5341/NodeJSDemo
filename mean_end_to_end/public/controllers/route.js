(function(){
	angular
	  .module('app')
	  .config(function($routeProvider, toastrConfig) {
	  	$routeProvider
		.when('/login', {
			controller: 'HomeController',
			controllerAs: 'vm',
			templateUrl: './views/login.html'
		})
		.when('/details', {
			controller: 'HomeController',
			controllerAs: 'vm',
			templateUrl: './views/home.html'
		})
		.when('/register', {
			controller: 'HomeController',
			controllerAs: 'vm',
			templateUrl: './views/register.html'
		})
		.otherwise('/login');

		/**
	    * @desc:toastr config
	    */
		angular.extend(toastrConfig, {
		    autoDismiss: false,
		    containerId: 'toast-container',
		    maxOpened: 0,    
		    newestOnTop: true,
		    positionClass: 'toast-top-center',
		    preventDuplicates: false,
		    preventOpenDuplicates: false,
		    target: 'body',
		    timeOut: 100000,
		    tapToDismiss: false
	    });
	}).run(function($rootScope, $location) {
	    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
	        if ($rootScope.loggedInUser == false) {
	          // no logged user, redirect to /login	        
	          $location.path("/login");
        }	      
	    });
	});
})();