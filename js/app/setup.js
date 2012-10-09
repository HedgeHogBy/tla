// Start the App!
$(document).ready(function(){
	App.initialize();
});

//Log all JavaScript errors
$(window).on('error', function(e){
	//console.log(e.message);
});

//Let all AJAX call timeout after 15 seconds
$.ajaxSettings.timeout = 15 * 1000;

// Handle all AJAX errors globally
$(document).on('ajaxError', function(e, xhr, options){
	if(options.type !== "POST"){ //Do not show alert if a App.debug.log post() fails 
		
		if(App.isMoreThan15SecSinceLastPopup == undefined || App.isMoreThan15SecSinceLastPopup){
			App.isMoreThan15SecSinceLastPopup = false;
			if(xhr.status === 0){
                console.log('connection error');
				setTimeout(function(){
					App.isMoreThan15SecSinceLastPopup = true;
				}, 1000 * 15);
			} 			
		}
	}
});





	
