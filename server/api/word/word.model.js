'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WordSchema = new Schema({
	textline_id : mongoose.Schema.ObjectId,
});

module.exports = mongoose.model('Word', WordSchema);