'use strict';

var Textline = require('../textline/textline.model');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SectionSchema = new Schema({
	textline_ids : [{type: mongoose.Schema.ObjectId, ref: 'TextlineSchema'}],
	doc_id : mongoose.Schema.ObjectId,
});

module.exports = mongoose.model('Section', SectionSchema);