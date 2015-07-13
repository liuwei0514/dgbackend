var async = require('async'),
    keystone = require('keystone');

exports = module.exports = {
    list: function(req, res, next) {

        var q = keystone.list('ProductCategory').paginate({
            page: req.query.page || 1,
            perPage: 10,
            maxPages: 10
        });

        q.exec(function(err, results) {
            if (err) return res.apiError('database error', err);
            res.apiResponse(results);
        });
    }
}
