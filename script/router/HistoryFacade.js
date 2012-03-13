define( ['../selector/SimpleSelectorFacade'], function( $ ) {

	/**
	 * Shim for Object.create().
	 */
	if(typeof Object.create !== "function") {
	    Object.create = function (o) {
	        function F() {}
	        F.prototype = o;
	        return new F();
	    };
	}
	
	/**
	 * rootLocation: root location to direct browser to on landing.
	 * routes: mapping of ${base-location}: {route:$routeTemplateObject, paths:$params[]}
	 * links, [i, length]: dom elements to reassign click handling to.
	 * routeTemplate: object template to use in creating new routes.
	 * adapter: export.
	 */
	var rootLocation,
		routes = {},
		links = $('a'),
		i = 0, length = links.length,
		routeTemplate = {
			delegate: undefined,
			params: [],
			run: function() {
				this.delegate.apply( this, this.params );
			}
		},
		adapter = {
			/**
			 * Attempts to find matching param'ed route in map based on location. If success, invokes delegate method associated with route and updates history state.
			 * @param  {String} location Full path.
			 */
			go: function( location ) {
				var route;
				if( typeof location !== undefined ) {
					route = matchRoute( stripPreceding( location ) );
					if( route !== null ) {
						route.run();
	 					history.pushState( {}, '', location );
					}
	 			}
			},
			/**
			 * Maps a fragment to a delegate handler for enter of url state. Invokes handler with following signature:
			 *    + handler( ...args ) - wherein ...args is an undetermined array of parameter values which is often the case when setting a variable fragment, such as /employee/:id.
			 * @param  {String} fragment Contextual URL to capture in change of location state in order to notify client on delegate.
			 * @param  {Function} delegate Delegate handler associated with the URL fragment.
			 */
			map: function( fragment, delegate ) {
				fragment = stripPreceding( fragment );
				var paths = fragment.split( '/' );
				mapRoute( paths, fragment, delegate );
			},
			/**
			 * Defines the root URL fragment for the application path.
			 * @param  {String} fragment Contexturl URL.
			 */
			root: function( fragment ) {
				rootLocation = fragment;
			},
			/**
			 * Initializes the router.
			 * @param  {Boolean} useHistory Flag to use the HTML5 History API.
			 */
			init: function( useHistory ) {
				this.go( rootLocation );
			}
		};

	// Intercept click event for proper routing.	
	for( i; i < length; i++ ) {
		links[i].onclick = function( event ){
			event.preventDefault();

			var location = this.attributes['href'].value;
			location = location.split( '#' ).join( '' );
	        adapter.go( location );
	        return false;
	    };
	}

	// Intercept popstate to forward action to adapter.
	window.addEventListener( 'popstate', function( e ) {
		var location = document.location.pathname;
 		adapter.go( location );
	});

	/**
	 * Strips preceding backslash from path string.
	 * @param  {String} value A path.
	 * @return {String}
	 */
	function stripPreceding( value ) {
		return ( value.charAt(0) == '/' ) ? value.substr( 1, value.length ) : value;
	}

	/**
	 * Defines a route Object in the map based on base location and optional param'ed path.
	 * @param  {Array} paths   Split paths from the base fragment.
	 * @param  {String} base     The base fragment / full path.
	 * @param  {Function} delegate The method to invoke with optional value filled params.
	 */
	function mapRoute( paths, base, delegate ) {
		var route, 
			routeBase,
			routePaths = [];

		if( !routes.hasOwnProperty( base ) ) {
			routeBase = paths.shift();
			route = Object.create( routeTemplate );
			route.delegate = delegate;
			while( paths.length > 0 ) {
				routePaths[routePaths.length] = paths.shift();
			}
			routes[routeBase] = {route:route, paths:routePaths};
		};
	}

	/**
	 * Attempts to find a match within the routing map that is associated with the base path and optional param'ed descendents.
	 * @param  {String} location The base fragment / full path
	 * @return {Route} The mapped Route object on which to call run(). Null if not matched.
	 */
	function matchRoute( location ) {
		var paths = location.split( '/' ),
			base = paths.shift(), params = [],
			path, route,
			pathMap, i, length;

		if( routes.hasOwnProperty( base ) ) {
			route = routes[base].route;
			pathMap = routes[base].paths;
			i = 0;
			length = pathMap.length;
			for( i; i < length; i++ ) {
				path = pathMap[i];
				if( path.charAt( 0 ) == ':' ) {
					if( paths.length > i ) {
						params[params.length] = paths[i];
					}
				}
			}
			route.params = params;
			return route;
		}
		return null;
	}

	return adapter;

});