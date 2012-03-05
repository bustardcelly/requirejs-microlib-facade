(function( require ) {
	
	var router, 
		selector;

	function loadLibs() {
		require.config({
			baseUrl: '.'
		});
		require( ['script/selector/SimpleSelector', 'script/router/PathHashTagAdapter', 'lib/vine'], handleLibs );
	}

	function handleLibs( selectorFacade, routeFacade, nonAMDObserver ) {
		selector = selectorFacade;
		router = routeFacade;
		loadScripts( selector, router, vine );
	}

	function loadScripts( $, router, observer ) {
		
		require( ['./script/Greeter', './script/Helloer'], function( greeter, helloer ) {
	    	greeter.init( $, router, observer );
	    	helloer.init( $, router, observer );
	    	initRoute();
	    });

	}

	function initRoute() {
		router.root( '/hello' );
		router.init();
	}

	loadLibs();

})( requirejs );