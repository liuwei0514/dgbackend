var async = require('async'),
    keystone = require('keystone'),
    ShareViewedLog = keystone.list('ShareViewedLog');

exports = module.exports = {
    create: function(req, res, next) {
        var shareViewedLog = new ShareViewedLog.model();
        shareViewedLog.appUser = req.body.userid;
        shareViewedLog.createdDate = new Date();
        shareViewedLog.save(function(err) {
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
