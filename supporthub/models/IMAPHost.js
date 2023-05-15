const mongoose = require( 'mongoose' );
const crypt = require( '../services/crypt' );
const IMAPHostSchema = new mongoose.Schema( {
	user: {
		type: String,
		required: true
	},
	password: {
		iv: String,
		salt: String,
		cipher: String
	},
	host: {
		type: String,
		required: true
	},
	port: {
		type: Number,
		required: true
	},
	mailbox: {
		type: String,
		default: "INBOX"
	},
	tls: {
		type: Boolean,
		required: true,
		default: false
	},
	refreshInterval: {
		type: Number,
		default: 300000
	}
} );

IMAPHostSchema.pre( "save", function ( next ) {
	this.password = crypt.encrypt( this.password.cipher );
	next();
} );

const IMAPHost = mongoose.model( 'IMAPHost', IMAPHostSchema );

module.exports = IMAPHost;