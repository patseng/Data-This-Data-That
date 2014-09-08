'use strict';

var Section = require('../section/section.model');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DocSchema = new Schema({
  original_image: String,
  name: String,
  date_uploaded: Date, 
  region_of_interest: {
  	points: [],
  },

  section_ids : [{type: mongoose.Schema.ObjectId, ref: 'SectionSchema'}],

});

module.exports = mongoose.model('Doc', DocSchema);