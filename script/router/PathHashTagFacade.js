define( ['../../lib/path.min.js'], function() {
	
	var adapter = {
		/**
		 * Maps a fragment to a delegate handler for enter of url state. Invokes handler with following signature:
		 *    + handler( ...args ) - wherein ...args is an undetermined array of parameter values which is often the case when setting a variable fragment, such as /employee/:id.
		 * @param  {String} fragment Contextual URL to capture in change of location state in order to notify client on delegate.
		 * @param  {Function} delegate Delegate handler associated with the URL fragment.
		 */
		map: function( fragment, delegate ) {
			Path.map( '#'+fragment ).to( function() {
				var paramProperty,
					paramArray = [];
				for( paramProperty in this.params ) {
					paramArray[paramArray.length] = this.params[paramProperty];
				}
				delegate.apply( this, paramArray )
			});
		},
		/**
		 * Defines the root URL fragment for the application path.
		 * @param  {String} fragment Contexturl URL.
		 */
		root: function( fragment ) {
			Path.root( '#'+fragment );
		},
		/**
		 * Initializes the router.
		 * @param  {Boolean} useHistory Flag to use the HTML5 History API.
		 */
		init: function( useHistory ) {
			Path.listen();
		}
	};

	// Return adapter.
	return adapter;
});