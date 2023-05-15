const IMAPHostSchema = require( "../../models/IMAPHost" );
const ImapCronManager = require( "./imapCron" );

async function startCronTasks() {
	try {
		const imapHosts = await IMAPHostSchema.find();
		imapHosts.forEach( imapHost => {
			ImapCronManager.startTask( imapHost );
		} );
		console.log( "Cron tasks started" );
	} catch ( err ) {
		console.log( 'Error starting cron tasks:', err );
	}
}

module.exports = startCronTasks;
