var Goal = require('../models/goal');
var config = require('../../config');

function createGoal(req, res){
	var goal = new Goal ();
	goal.username = req.body.username;
  goal.entry = req.body.entry;
  goal.date = Date.now();
  goal.current = true;

  goal.save(function(err) {
    if(err) throw err;
    res.json({ success: true });
  });
}

function getUserGoalList(req, res) {
  Goal.find({username: req.params.username}, function(err, goals) {
    res.json(goals);
  });
}

function goalComplete(req, res) {
	Goal.update({_id: req.params.goalId}, {$set: {current: false}},
		function(err, goals) {
		res.json(goals);
	})
}

module.exports = {
  createGoal,
  getUserGoalList,
	goalComplete
}
