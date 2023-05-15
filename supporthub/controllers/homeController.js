const homeController = {}
const Ticket = require( '../models/Ticket' );

homeController.index = ( req, res ) => {

	Ticket.find( { assignedTo: res.locals.user.id } )
		.then( tickets => {
			res.render( 'home/index', {
				title: 'Home Page',
				data: tickets
			} );
		} )
		.catch( err => {
			console.log( err );
			res.render( 'home/index', {
				title: 'Home Page',
				error: err.msg
				, data: []
			} );
		} );

}

module.exports = homeController;