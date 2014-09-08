'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DocSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Doc', DocSchema);