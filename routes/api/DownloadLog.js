var async = require('async'),
    keystone = require('keystone'),
    DownloadLog = keystone.list('DownloadLog');

exports = module.exports = {

    create: function(req, res, next) {
        var downloadLog = new DownloadLog.model();
        downloadLog.createdDate = new Date();
        downloadLog.save(function(err) {
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
