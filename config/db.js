const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@doantn.qrqas.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

async function connect() {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connecting successfully');
	} catch (error) {
		console.log('Connecting failure');
		process.exit(1);
	}
}

module.exports = {
	connect,
};
