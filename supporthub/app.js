// Import required modules
const config = require( './appconfig' );
const express = require( 'express' );
const mongoose = require( 'mongoose' );
const expressLayouts = require( 'express-ejs-layouts' );
const session = require( 'express-session' );
const flash = require( 'connect-flash' );
const passport = require( 'passport' );
const { loginCheck } = require( "./auth/passport" );
const rateLimit = require( 'express-rate-limit' );
const path = require( 'path' );

// Create express app
const app = express();

// Connect to the MongoDB database using Mongoose
mongoose.connect( config.mongodbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		family: 4
	} )
	.then( () => console.log( 'MongoDB Connected...' ) )
	.catch( err => console.log( err ) );

// Configure express-session middleware
app.use( session( {
	secret: config.secret,
	resave: false,
	saveUninitialized: false
} ) );

// Configure passport middleware
app.use( passport.initialize() );
app.use( passport.session() );

loginCheck( passport );

// Set up Express.js middleware to parse form data
app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );

// Set up the view engine and layout
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'ejs' );

app.use( expressLayouts );
app.set( 'layout', 'shared/_layout' );
app.set( "layout extractScripts", true );

// Set up Express.js middleware to serve static files
app.use( express.static( path.join( __dirname, 'public' ), {
	// Set the MIME type explicitly for CSS files
	mimeTypes: {
		'css': 'text/css'
		, 'js': 'text/javascript'
	}
} ) );

// Configure connect-flash middleware
app.use( flash() );

// Set up Express.js middleware to limit request rates
const limiter = rateLimit( {
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100 // limit each IP to 100 requests per windowMs
} );
app.use( limiter );

//Set global request variables
app.use( function ( request, response, next ) {
	const baseUrl = `http://localhost:${ config.httpPort }`;
	response.locals = {
		appName: "SupportHub",
		baseUrl,
		user: request.user
		, error: null
		, data: null
	}
	request.locals = {
		baseUrl
	}
	next();
} );

// Define the routes for the application
app.use( '/ping', ( req, res ) => {
	res.json( 200, { message: `site is up and running at ${ new Date() }` } )
} );
app.use( '/', require( './routes/homeRoutes' ) );
app.use( '/account', require( './routes/accountRoutes' ) );
app.use( '/imap', require( './routes/imapHostRoutes' ) );
app.use( '/client', require( './routes/clientRoutes' ) );
app.use( '/project', require( './routes/projectRoutes' ) );
app.use( '/ticket', require( './routes/ticketRoutes' ) );

// Start the server
app.listen( 3000, () => {
	console.log( 'Server started: http://localhost:3000/' );
	// Start the IMAP cron services
	require( "./services/Imap/imapCronServerStart" )();
} );