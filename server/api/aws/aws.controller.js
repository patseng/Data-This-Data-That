'use strict';

var _ = require('lodash');
var crypto = require('crypto');
var config = require('../../config/aws.json');
/*
  Helper Functions
*/
var getExpiryTime = function () {
    var _date = new Date();
    return '' + (_date.getFullYear()) + '-' + (_date.getMonth() + 1) + '-' +
        (_date.getDate() + 1) + 'T' + (_date.getHours() + 3) + ':' + '00:00.000Z';
};

// Get list of awss
var createS3Policy = function(contentType, callback) {
    var date = new Date();
    var s3Policy = {
        'expiration': getExpiryTime(),
        'conditions': [
            ['starts-with', '$key', 's3UploadExample/'],
            {'bucket': config.bucket},
            {'acl': 'public-read'},
            ['starts-with', '$Content-Type', contentType],
            {'success_action_status' : '201'}
        ]
    };

    // stringify and encode the policy
    var stringPolicy = JSON.stringify(s3Policy);
    var base64Policy = new Buffer(stringPolicy, 'utf-8').toString('base64');

    // sign the base64 encoded policy
    var signature = crypto.createHmac('sha1', config.secretAccessKey)
                        .update(new Buffer(base64Policy, 'utf-8')).digest('base64');

    // build the results object
    var s3Credentials = {
        s3Policy: base64Policy,
        s3Signature: signature,
        AWSAccessKeyId: config.accessKeyId
    };

    // send it back
    callback(s3Credentials);
};

exports.getS3Policy = function(req, res) {
  console.log('asdfasd');
    createS3Policy(req.query.mimeType, function (creds, err) {
        if (!err) {
            console.log("success");
            console.log(creds);
            return res.send(200, creds);
        } else {
            console.log("failure");
            return res.send(500, err);
        }
    });
};

exports.getConfig = function(req, res) {
  return res.json(200, {
    awsConfig: {
      bucket: config.bucket
    }
  });
};
