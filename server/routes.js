/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/api/docs', require('./api/doc'));
  app.use('/api/sections', require('./api/section'));
  app.use('/api/textlines', require('./api/textline'));
  app.use('/api/words', require('./api/word'));
  app.use('/api/tasks', require('./api/task'));


  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  app.route('/testtextline')
   .get(function(req, res) {
     res.sendfile(app.get('appPath') + '/textlinecroptest.html');
   });

  app.route('/test4points')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/4pointscroptest.html');
    });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
