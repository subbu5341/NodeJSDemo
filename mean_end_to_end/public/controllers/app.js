(function(){		
	angular
		.module('app', ['ngRoute', 'toastr', 'ngCookies'])
		.controller('HomeController', function($scope, $http, $location, $route, toastr, $rootScope, $timeout, $interval){
			var successhandler, errorHandler, timer;
			var vm = this;
			vm.user = {
				username: "",
				password: ""
			};
			vm.users = [];
			vm.detailedUser;
			vm.title = "Details";
			$rootScope.loggedInUser = false;
			
			secCounter = 0;
			minCounter = 0;
			vm.minTime =0;
			vm.secTime =0;
			sesionCheck = false;
			var home = "http://localhost:8080/#/login";
			
			/*if(document.documentURI != home && login) {
				$location.path('/login');
				alert("Please login into Account");
			}*/

			vm.showDetails = function(user){
				vm.detailedUser = user;
				vm.detailed = true;
			}	
			
			
			/**
		    * @desc:Different logins
		    */
			
			vm.loginCheck = function(user) {
				loginCount = 0;
				fbLoginCount = 0;
				$rootScope.loggedInUser = true;
				loginCount++;

				//cookies(user);
				
				if(user && user.username && user.password){
					
					console.log('about to check login details');
					$http.post('/api/login', user).then(loginCheckSuccesshandler, loginCheckErrorHandler);
				}
				else {
					toastr.info("Please enter Login  details..", 'Information', { closeButton: true });
				}

			}

			loginCheckSuccesshandler = function(response){
				if(response.data){
					$location.path('/details');
					sesionCheck = true;
					sessionLogIn();
				}
			} 

			loginCheckErrorHandler = function(response){
				toastr.error("Login failed: Invalid Username or Password", 'Credentials Error', { closeButton: true })
			}

			/**
		    * @desc:FaceBook Login
		    */
			
			vm.fbLogin = function() {
				fbLoginCount = 0;
				loginCount = 0;
				$rootScope.loggedInUser = true;


				var fbUser = {username:"", password:"subbu0716", name:"", age:24, fbLoginCheck: true};
				FB.login(function(response) {
				    if (response.authResponse) {
				    	fbLoginCount++;
				     	console.log('Welcome!  Fetching your information.... ');
					     FB.api('/me', 'GET', {fields: 'email, first_name, name, id, picture'}, function(response) {
					       console.log('Good to see you, ' + response.name + '.');
					       
					       fbUser.username = response.email;
					       fbUser.name = response.name;
					       
					       vm.addUser(fbUser);
					       //$location.path('/details');
					       sessionLogIn();

					     });
					    } else {
					     toastr.info('User cancelled login or did not fully authorize.', 'Information', { closeButton: true });
					    }
				}, {
				    scope: 'email, user_likes',
				    auth_type: 'rerequest',
				    return_scopes: true
				  });

				/*FB.getLoginStatus(function(response) {
				    statusChangeCallback(response);
				});*/
				
			}
			

			/**
		    * @desc:session timeOut functions
		    */
		    			
			function sessionLogIn() {

				timer = $timeout(function sessionTime() {
			        vm.secTime = secCounter++ ;	
			        console.log(vm.secTime);	        
			        if(secCounter == 60){
			        	vm.minTime = ++minCounter;
			        	console.log(vm.minTime);
			        	secCounter = 0;
			        }

			         timer = $timeout(sessionTime, 1000);
			        if(vm.minTime == 1){	
			        	$timeout.cancel(timer);		        	
			        	document.location.hash ="/login";						
						toastr.info('Please Login again', 'sessionTimedOut', { closeButton: true });
			        }
		    	}, 1000);
		    	//$scope.$apply();
		   	}
			
			vm.Logout = function() {
				fbLoginCount--;
				loginCount--;

				if(fbLoginCount == 0) {
					FB.logout(function(response) {
						document.location.hash ="/login";
					});	
				}else if(loginCount == 0) {
					document.location.hash ="/login";
				}else {
					toastr.info('User already logged Out')
				}				
			}

			vm.register = function() {
				$rootScope.loggedInUser = true;
				$location.path('/register');
			}


			vm.getUsers = function(){
				$http.get('/api/users').then(function(response){
					vm.users = response.data;
				});
			}
			vm.getUsers();			
			
			/**
		    * @desc:Add a new user
		    */
			
			vm.addUser = function(user){
				loginCount = 0;
				fbLoginCount = 0;
				$rootScope.loggedInUser = true;
				loginCount++;

				if(user && user.name && user.age){
					console.log('about to create user');
					//$rootScope.loggedInUser = user.username;
					$http.post('/api/users', user).then(function(response){
						vm.getUsers();
						vm.user = '';
						vm.adduser = false;
						$location.path('/details');
						sessionLogIn();
					}, addUserErrorHandler);
				}
				else {
					toastr.info('You have not supplied enough details..', 'Information', { closeButton: true });
				}
			}

			addUserErrorHandler = function(response){
				toastr.error(" Registration Failed: User already exist with same mail ID ", 'Existing user Error', { closeButton: true })
			}
			
			/**
		    * @desc:Update existing user 
		    */
			
			vm.updateUser = function(user){
				if(user){
					$http.put('/api/users', user).then(function(response){
						console.log('updated user');
						vm.getUsers();
					})
				}
			}

			/**
		    * @desc:Remove user from list
		    */
			
			vm.removeUser = function(user){
				console.log(user);
				if(user){
					$http.delete('/api/users/' + user._id).then(function(response){
						vm.getUsers();
					});
				}
			}
			
			/*// Cookies
			function cookies(user) {
				cookieName = user.username;
				checkCookie();

				function setCookie(cname,cvalue,exdays) {
				    var d = new Date();
				    d.setTime(d.getTime() + (1*60*60*1000));
				    var expires = "expires=" + d.toGMTString();
				    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/details";
				}

				function getCookie(cname) {
				    var name = cname + "=";
				    var decodedCookie = decodeURIComponent(document.cookie);
				    var ca = decodedCookie.split(';');
				    for(var i = 0; i < ca.length; i++) {
				        var c = ca[i];
				        while (c.charAt(0) == ' ') {
				            c = c.substring(1);
				        }
				        if (c.indexOf(name) == 0) {
				            return c.substring(name.length, c.length);
				        }
				    }
				    return "";
				}

				function checkCookie() {
				    var user=getCookie("username");
				    if (user != "") {
				        alert("Welcome again " + user);
				    } else {
				        console.log("Please enter your name:","");
				        user = cookieName
				       if (user != "" && user != null) {
				           setCookie("username", user, 30);
				       }
				    }
				}
			}	*/
			/*function handleClientLoad() {
		        // Loads the client library and the auth2 library together for efficiency.
		        // Loading the auth2 library is optional here since `gapi.client.init` function will load
		        // it if not already loaded. Loading it upfront can save one network request.
		        gapi.load('client:auth2', initClient);
	        }

			function initClient() {
			    // Initialize the client with API key and People API, and initialize OAuth with an
			    // OAuth 2.0 client ID and scopes (space delimited string) to request access.
			    gapi.client.init({
			        apiKey: 'AIzaSyBVRORLunFs4q2PH6xbr4USYiGZKuKOi1I',
			        discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
			        clientId: '176896926239-6mbdunumoo35l3f5um543su2d9s53qae.apps.googleusercontent.com',
			        scope: 'profile'
			    }).then(function () {
			      // Listen for sign-in state changes.
			      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

			      // Handle the initial sign-in state.
			      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
			    });
			}

			function updateSigninStatus(isSignedIn) {
			    // When signin status changes, this function is called.
			    // If the signin status is changed to signedIn, we make an API call.
			    if (isSignedIn) {
			      makeApiCall();
			    }
			}

		    vm.handleSignInClick = function(event) {
		        // Ideally the button should only show up after gapi.client.init finishes, so that this
		        // handler won't be called before OAuth is initialized.
		        gapi.auth2.getAuthInstance().signIn();
		    }

		    function handleSignOutClick(event) {
		        gapi.auth2.getAuthInstance().signOut();
		    }

		    function makeApiCall() {
		        // Make an API call to the People API, and print the user's given name.
		        gapi.client.people.people.get({
		          'resourceName': 'people/me',
		          'requestMask.includeField': 'person.names'
		        }).then(function(response) {
		          console.log('Hello, ' + response.result.names[0].givenName);
		        }, function(reason) {
		          console.log('Error: ' + reason.result.error.message);
		        });
		    }*/



			return true;
		});		
		
})();		
	 		
