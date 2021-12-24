const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Solar = new Schema(
	{
		volt: {
			type: Number,
			require: true,
		},
		amp: {
			type: Number,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('solar', Solar);
