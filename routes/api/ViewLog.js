var async = require('async'),
    keystone = require('keystone'),
    ViewLog = keystone.list('ViewLog');

exports = module.exports = {

    create: function(req, res, next) {
        var viewLog = new ViewLog.model();
        viewLog.createdDate = new Date();
        viewLog.save(function(err) {
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
