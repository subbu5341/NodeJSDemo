(function() {
	
	// Google login code
	

	/*function start() {
        // Initializes the client with the API key and the Translate API.
        gapi.client.init({
          'apiKey': 'AIzaSyBVRORLunFs4q2PH6xbr4USYiGZKuKOi1I',
          'discoveryDocs': ['https://people.googleapis.com/$discovery/rest?version=v1'],
        }).then(function() {
          // Executes an API request, and returns a Promise.
          // The method name `language.translations.list` comes from the API discovery.
          return gapi.client.language.translations.list({
            q: 'hello world',
            source: 'en',
            target: 'de',
          });
        }).then(function(response) {
          console.log(response.result.data.translations[0].translatedText);
        }, function(reason) {
          console.log('Error: ' + reason.message);
        });
      };

      // Loads the JavaScript client library and invokes `start` afterwards.
      gapi.load('client', start);*/
	/*var p = document.createElement('script');
	p.type = "text/javascript";
	p.async = true;
	p.src ='https://apis.google.com/js/client.js?onLoad=onLoadFunction';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(p, s);*/

	//facebook login code
	window.fbAsyncInit = function() {
	    FB.init({
	      appId            : '2062705467290275',
	      autoLogAppEvents : true,
	      xfbml            : true,
	      version          : 'v2.9',
	      status		   : true
	    });
	    //FB.AppEvents.logPageView();
	    FB.getLoginStatus(function(response) {
	    	if(response.status === 'connected' ) {
	    		// we are connected
	    	} else if(response.status === 'not_authorized' ) {
	    		// not auth
	    	} else {
	    		// we are not logged in to fb
	    	}
		    //statusChangeCallback(response);
		});
	};

	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));
})();