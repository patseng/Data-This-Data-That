/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /sections              ->  index
 * POST    /sections              ->  create
 * GET     /sections/:id          ->  show
 * PUT     /sections/:id          ->  update
 * DELETE  /sections/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Section = require('./section.model');
var Doc = require('../doc/doc.model');

// Get list of sections
exports.index = function(req, res) {
  console.log("section page");
  console.log(parser.get_document_ids(req.originalUrl));
  Section.find(function (err, sections) {
    if(err) { return handleError(res, err); }
    return res.json(200, sections);
  });
};

// Get a single section
exports.show = function(req, res) {
  console.log(req.params.id);
  Section.findById(req.params.id, function (err, section) {
    if(err) { return handleError(res, err); }
    if(!section) { return res.send(404); }
    return res.json(section);
  });
};

// Creates a new section in the DB.
exports.create = function(req, res) {
  Section.create(req.body, function(err, section) {
    if(err) { return handleError(res, err); }
    return res.json(201, section);
  });
};

// Updates an existing section in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Section.findById(req.params.id, function (err, section) {
    if (err) { return handleError(res, err); }
    if(!section) { return res.send(404); }
    var updated = _.merge(section, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, section);
    });
  });
};

// Deletes a section from the DB.
exports.destroy = function(req, res) {
  Section.findById(req.params.id, function (err, section) {
    if(err) { return handleError(res, err); }
    if(!section) { return res.send(404); }
    section.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}