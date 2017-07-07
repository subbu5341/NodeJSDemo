(function(){
	angular.module('app', ['ngRoute'])
		.controller('myController',myController);
	function myController($scope) {
		/*var self = this;
        self.gmail = {
        	username: "",
        	email : ""
        };
        
        self.onGoogleLogin = function() {
           	var params = {
           	  	'clientid': '406103434121-if7qhtk870kvbmd28tlarh9ik1u3uls0.apps.googleusercontent.com',
           	  	'cookiepolicy': 'single_host_origin',
	           	'callback': function (result) {
	           		if(result['status']['signed_in']){
	           			var request = gapi.client.plus.people.get(
		           			{
		           				'userId': 'me'
		           			}
	           			);
	           			request.then(function(resp) {
	           				$scope.$apply(function() {
	           					self.gmail.username = resp.displayname;
	           					self.gmail.email = resp.emails[0].value;
	           				})
	           			})
	           		}
	           	},
	           	'approvalprompt': 'force',
	           	'scope':'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
            };
            gapi.auth.signIn(params);
        }*/

	}
})();
