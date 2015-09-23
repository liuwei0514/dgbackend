var async = require('async'),
    keystone = require('keystone'),
    Reward = keystone.list('Reward');


var list = function(req, res, next) {
    var appUserId = req.params.appUserId;
    if(appUserId){
        Reward.model.find().where('appUser', appUserId).exec(function(err, rewards) {
            var r = {
                rewards: rewards
            };
            res.json(r);
        });
    }else{
        res.status(500).send({
            error: ""
        });
    }
};

exports = module.exports = {
    list: list
}
