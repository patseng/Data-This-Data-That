/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /docs              ->  index
 * POST    /docs              ->  create
 * GET     /docs/:id          ->  show
 * PUT     /docs/:id          ->  update
 * DELETE  /docs/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Doc = require('./doc.model');
var Section = require('../section/section.model');

// Get list of docs
exports.index = function(req, res) {
  Doc.find(req.query, function (err, docs) {
    if(err) { return handleError(res, err); }
    return res.json(200, docs);
  });
};

// Get a single doc
exports.show = function(req, res) {

  Doc.findById(req.params.id, function (err, doc) {
    if(err) { return handleError(res, err); }

    if(!doc) { return res.send(404); }

    // on documents, the image_url is stored as a virtual field
    return res.json(doc.toObject({virtuals: true}));
  });
};

// Creates a new doc in the DB.
exports.create = function(req, res) {
  Doc.create(req.body, function(err, doc) {
    if(err) { return handleError(res, err); }
    return res.json(201, doc);
  });
};

// Updates an existing doc in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Doc.findById(req.params.id, function (err, doc) {
    if (err) { return handleError(res, err); }
    if(!doc) { return res.send(404); }
    var updated = _.merge(doc, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, doc);
    });
  });
};

// Deletes a doc from the DB.
exports.destroy = function(req, res) {
  Doc.findById(req.params.id, function (err, doc) {
    if(err) { return handleError(res, err); }
    if(!doc) { return res.send(404); }
    doc.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}