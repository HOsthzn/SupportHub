const crypto = require( 'crypto' );
const algorithm = 'aes-256-cbc';
const { passphrase } = require( '../appconfig' );

const Crypt = {
	encrypt( text ) {
		const salt = crypto.randomBytes( 16 );
		const key = crypto.scryptSync( passphrase, salt, 32 );
		const iv = crypto.randomBytes( 16 );

		const cipher = crypto.createCipheriv( algorithm, key, iv );
		let encrypted = cipher.update( text, 'utf8', 'hex' );
		encrypted += cipher.final( 'hex' );

		return {
			salt: salt.toString( 'hex' ),
			iv: iv.toString( 'hex' ),
			cipher: encrypted,
		};
	},

	decrypt( data ) {
		const salt = Buffer.from( data.salt, 'hex' );
		const key = crypto.scryptSync( passphrase, salt, 32 );
		const iv = Buffer.from( data.iv, 'hex' );

		const decipher = crypto.createDecipheriv( algorithm, key, iv );
		let decrypted = decipher.update( data.cipher, 'hex', 'utf8' );
		decrypted += decipher.final( 'utf8' );

		return decrypted;
	},
};

module.exports = Crypt;