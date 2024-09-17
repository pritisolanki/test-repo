var mongoose = require('mongoose'); // Import Mongoose Package
var Schema = mongoose.Schema; // Assign Mongoose Schema function to variable

// SchemaOptions
let schemaOptions = {
	timestamps: true,
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
};

// User Mongoose Schema
var PuzzleSchema = new Schema({
	word: { type: String, required: true }
}, schemaOptions);

module.exports = mongoose.model('Puzzle', PuzzleSchema); // Export Puzzle Model for us in API