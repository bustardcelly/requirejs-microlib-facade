define( function() {

	var _init = function( qSA, router, observer ) {

			router.map( '/greeting/:salutation', function( value ) {
				var element = qSA('.test')[0];
				element.innerHTML = '<p>hola, ' + value + '.</p>';	
			});
			
		};

	return {
		init: _init
	};

});