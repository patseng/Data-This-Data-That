'use strict';

var Word = require('../word/word.model');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TextlineSchema = new Schema({
	word_ids : [{type: mongoose.Schema.ObjectId, ref: 'WordSchema'}],
	section_id : mongoose.Schema.ObjectId,
});

module.exports = mongoose.model('Textline', TextlineSchema);