'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  task_type: String,
  date_uploaded: Date, 
  assignedTo_id : mongoose.Schema.ObjectId,
});

module.exports = mongoose.model('Task', TaskSchema);