const config = {
	dev: {
		httpPort: 3000,
		httpsPort: 3001,
		envName: "dev",
		baseUrl: "http://localhost:3000",
		mongodbUrl: "mongodb+srv://hendriksthzn:inB4G2ksCBcBJcZ8@supporthubcluster.oijsqip.mongodb.net/SupportHub",
		secret: "!@#$%^&*()_+\|}{:?><,./;'[]=-0987654321`~",
		passphrase: "Polysphere is a leading company that provides innovative solutions for businesses in various industries such as technology, finance, healthcare, and more. The company's vision is to create a world where everyone can access cutting-edge technologies that simplify and improve their daily lives. Polysphere's team of experts is dedicated to delivering the highest level of service to its clients, and they are always striving to exceed expectations. With its commitment to excellence, Polysphere is poised for continued success in the years ahead.",
		gmail: {
			user: "noreply@polysphere.co.za"
			, pass: "P0l@dm1n"
			, host: "smtp.gmail.com"
			, port: 587
			, secure: true
		}
	}
	, prod: {
		httpPort: 80
		, httpsPort: 403
		, envName: "prod"
		, baseUrl: "http://localhost:3000"
		, mongodbUrl: "mongodb://localhost:27017/SupportHub"
		, secret: "!@#$%^&*()_+\|}{:?><,./;'[]=-0987654321`~"
		, passphrase: "4n/15j/JD,2-#JkVb24e8C13,+r+#TQblzk^tMM@@(2,KK4i!6TrldGFm/tSDB0vMf##+^x9c^n^pMB!qU^OVTtCG+^F33/^r^mE8jNlw@X6pkT2wG/2BRnZ2Vn2/r^j0F%9o1*jYejOJKJq3Bbzsn/1ffQ8Pzo%P^JtMHd(1b\n"
		, gmail: {
			user: "noreply@polysphere.co.za"
			, pass: "P0l@dm1n"
			, host: "smtp.gmail.com"
			, port: 587
			, secure: true
		}
	}
}

const currentEnvironment = typeof (process.env.NODE_ENV) === "string" ? process.env.NODE_ENV.toLowerCase() : "";
const exportENV = typeof config[ currentEnvironment ] === "object" ? config[ currentEnvironment ] : config.dev;

module.exports = exportENV;