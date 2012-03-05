define( function() {

	var _init = function( qSA, router, observer ) {

			router.map( '/hello', function() {
				var element = qSA('.test')[0];
				element.innerHTML = '<p>hello world</p>';	
			});
			
		};

	return {
		init: _init
	};

});