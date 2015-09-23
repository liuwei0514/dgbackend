var async = require('async'),
    keystone = require('keystone'),
    SharedLog = keystone.list('SharedLog');

exports = module.exports = {
    create: function(req, res, next) {
        var sharedLog = new SharedLog.model();
        sharedLog.appUser = req.body.userid;
        sharedLog.type = "weixin";
        sharedLog.sharedLogDate = new Date();
        sharedLog.save(function(err) {
            if (err) {
                res.status(500).send({
                    error: "err"
                });
            } else {
            	res.status(200).end();
            }
        });
    }
}
