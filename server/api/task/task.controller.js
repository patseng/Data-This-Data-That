/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /tasks              ->  index
 * POST    /tasks              ->  create
 * GET     /tasks/:id          ->  show
 * PUT     /tasks/:id          ->  update
 * DELETE  /tasks/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Task = require('./task.model');
var Section = require('../section/section.model');
var User = require('../user/user.model');

// Get list of tasks
exports.index = function(req, res) {
  Task.find(req.query, function (err, tasks) {
    if(err) { return handleError(res, err); }
    return res.json(200, tasks);
  });
};

// Get a single task
exports.show = function(req, res) {
  
  Task.findById(req.params.id, function (err, task) {
    if(err) { return handleError(res, err); }
    if(!task) { return res.send(404); }

    return res.json(task);
  });
};

// Creates a new task in the DB.
exports.create = function(req, res) {
  Task.create(req.body, function(err, task) {
    if(err) { return handleError(res, err); }
    return res.json(201, task);
  });
};

// Updates an existing task in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Task.findById(req.params.id, function (err, task) {
    if (err) { return handleError(res, err); }
    if(!task) { return res.send(404); }
    var updated = _.merge(task, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, task);
    });
  });
};

// Makes assignments
exports.assign = function(req, res) {
  console.log(req.query);
  var numAssignments = req.query["numAssignments"];

  //Get tasks of correct type
  Task.find({"task_type": req.query["taskType"]}, function (err, tasks) {
    if(err) { return handleError(res, err); }
    var tasksToAssign = tasks.slice(0, numAssignments);
    var userId = req.query["assignedTo_id"];
    //Get user
    User.findById(userId, function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(401);

      for (var i = 0; i < tasksToAssign.length; i++) { 
        var taskToAssign = tasksToAssign[i];
        taskToAssign.assignedTo_id = user._id;
        taskToAssign.save();
        user.assignedTask_ids.push(taskToAssign._id);
      }
      user.save();

      console.log(user);
      console.log(tasksToAssign);

      res.json(user.profile);
    });
  });

};

// Deletes a task from the DB.
exports.destroy = function(req, res) {
  Task.findById(req.params.id, function (err, task) {
    if(err) { return handleError(res, err); }
    if(!task) { return res.send(404); }
    task.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}