/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Textline = require('../api/textline/textline.model');
var Doc = require('../api/doc/doc.model');
var Section = require('../api/section/section.model');
var User = require('../api/user/user.model');

Textline.find({}).remove(function() {
  Textline.create({
  }, {
  }, {
  }, function() {
      console.log('finished populating textlines');
    });
});


Section.find({}).remove(function() {
  Section.create({
  }, {
  }, function() {
      console.log('finished populating sections');
    });
});

Doc.find({}).remove(function() {
  Doc.create({
    original_image : 'test_1',
  }, function() {
      console.log('finished populating docs');
    });

  console.log("setting test relationships up...\n\n");

  Textline.find(function (err, textlines) {
    console.log("textlines found:\n" + textlines + "\n\n");

    Section.find(function (err, sections) {
      console.log("sections found:\n" + sections + "\n\n");

      Doc.find(function (err, docs) {
      console.log("docs found:\n" + docs + "\n\n");

      docs[0].section_ids = [sections[0]._id, sections[1]._id];
      docs[0].save();

      sections[0].doc_id = docs[0]._id;
      sections[0].textline_ids = [textlines[0]._id, textlines[1]._id];
      sections[0].save();

      sections[1].doc_id = docs[0]._id;
      sections[1].textline_ids = [textlines[2]._id];
      sections[1].save();

      textlines[0].section_id = sections[0]._id;
      textlines[0].save();

      textlines[1].section_id = sections[0]._id;
      textlines[1].save();

      textlines[2].section_id = sections[1]._id;
      textlines[2].save();

     });

    });

  });

});







User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});