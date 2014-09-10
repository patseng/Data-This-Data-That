'use strict';

var Section = require('../section/section.model');
var mongoose = require('mongoose'),
		AWS = require('aws-sdk'),
		config = require('../../config/aws'),
    Schema = mongoose.Schema;

// set up AWS and S3
AWS.config.update({accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey});
var s3 = new AWS.S3();

var DocSchema = new Schema({
  s3Key: String,
  name: String,
  date_uploaded: Date,
  region_of_interest: {
  	points: [],
  },

  section_ids : [{type: mongoose.Schema.ObjectId, ref: 'SectionSchema'}],

});

// adds a virtual field (one that is not stored in the database)
DocSchema.methods.image_url = function (cb) {
	var params = {Bucket: config.bucket, Key: this.s3Key};
	var url = s3.getSignedUrl('getObject', params);
	return url;
};


module.exports = mongoose.model('Doc', DocSchema);