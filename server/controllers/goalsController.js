var Goal = require('../models/goal')

function createGoal(req, res){
	var goal = new Goal ();
		  // todo.username = ;
    	goal.entries = req.body.entries;
    	goal.date = Date.now();
      goal.current = true

  goal.save(function(err) {
    if(err) throw err;

    console.log('New Goal');
    res.json({ success: true });
  });
}

function getUserGoalList(req, res) {
  console.log(req.params.username)
  Goal.find({user: req.params.username}, function(err, goals) {
    res.json(goals);
  });
};

module.exports = {
  createGoal,
  getUserGoalList
}