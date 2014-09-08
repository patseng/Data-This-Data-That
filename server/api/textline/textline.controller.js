/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /textlines              ->  index
 * POST    /textlines              ->  create
 * GET     /textlines/:id          ->  show
 * PUT     /textlines/:id          ->  update
 * DELETE  /textlines/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Textline = require('./textline.model');

// Get list of textlines
exports.index = function(req, res) {
  console.log("textline page");
  console.log(parser.get_document_ids(req.originalUrl));
  Textline.find(function (err, textlines) {
    if(err) { return handleError(res, err); }
    return res.json(200, textlines);
  });
};

// Get a single textline
exports.show = function(req, res) {
  console.log(req.params.id);
  Textline.findById(req.params.id, function (err, textline) {
    if(err) { return handleError(res, err); }
    if(!textline) { return res.send(404); }
    return res.json(textline);
  });
};

// Creates a new textline in the DB.
exports.create = function(req, res) {
  Textline.create(req.body, function(err, textline) {
    if(err) { return handleError(res, err); }
    return res.json(201, textline);
  });
};

// Updates an existing textline in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Textline.findById(req.params.id, function (err, textline) {
    if (err) { return handleError(res, err); }
    if(!textline) { return res.send(404); }
    var updated = _.merge(textline, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, textline);
    });
  });
};

// Deletes a textline from the DB.
exports.destroy = function(req, res) {
  Textline.findById(req.params.id, function (err, textline) {
    if(err) { return handleError(res, err); }
    if(!textline) { return res.send(404); }
    textline.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}