const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@cluster0.vl3oh.mongodb.net/solar-tracking?retryWrites=true&w=majority`;
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
