define( ['../../lib/director-1.0.7.min.js'],function() {

	var router, root,
		routes = {},
		adapter = {
			/**
			 * Maps a fragment to a delegate handler for enter of url state. Invokes handler with following signature:
			 *    + handler( ...args ) - wherein ...args is an undetermined array of parameter values which is often the case when setting a variable fragment, such as /employee/:id.
			 * @param  {String} fragment Contextual URL to capture in change of location state in order to notify client on delegate.
			 * @param  {Function} delegate Delegate handler associated with the URL fragment.
			 */
			map: function( fragment, delegate ) {
				// router.on( fragment, delegate );
				routes[fragment] = delegate;
			},
			/**
			 * Defines the root URL fragment for the application path.
			 * @param  {String} fragment Contexturl URL.
			 */
			root: function( fragment ) {
				if( router === undefined ) {
					root = fragment;
				}
				else {
					router.setRoute( fragment );
				}
			},
			/**
			 * Initializes the router.
			 * @param  {Boolean} useHistory Flag to use the HTML5 History API.
			 */
			init: function( useHistory ) {
				router = new Router( routes );
				router.init();
				if( root !== undefined ) {
					router.setRoute( root );
				}
			}
		};

	return adapter;

});