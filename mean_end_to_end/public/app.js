(function(){		
	var app = angular.module('app', ['ngRoute']);
		app.controller('HomeController', function($http){
			var vm = this;
			vm.users = [];
			vm.detailedUser;
			vm.showDetails = function(user){
				vm.detailedUser = user;
				vm.detailed = true;
			}
			vm.getUsers = function(){
				$http.get('/api/users').then(function(response){
					vm.users = response.data;
				});
			}
			vm.getUsers();
			vm.updateUser = function(user){
				if(user){
					$http.put('/api/users', user).then(function(response){
						console.log('updated user');
						vm.getUsers();
					})
				}
			}
			vm.removeUser = function(user){
				console.log(user);
				if(user){
					$http.delete('/api/users/' + user._id).then(function(response){
						vm.getUsers();
					});
				}
			}
			vm.addUser = function(user){
				if(user && user.name && user.age){
					console.log('about to create user');
					$http.post('/api/users', user).then(function(response){
						vm.getUsers();
						vm.user = '';
						vm.adduser = false;
					});
				}
				else {
					console.log('You have not supplied enough details..');
				}
			}
			return true;
		});
		app.config(function($routeProvider) {
			$routeProvider.when('/', {
				controller: 'HomeController',
				controllerAs: 'vm',
				templateUrl: './home.html'
			});
			$routeProvider.otherwise('/');
		});
})();		
	 		
