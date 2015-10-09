var async = require('async'),
    keystone = require('keystone'),
    Ziying = keystone.list('Ziying');

exports = module.exports = {
    list: function(req, res, next) {

        var q = keystone.list('Ziying').paginate({
            page: req.query.page || 1,
            perPage: 10,
            maxPages: 100
        });
        q= q.sort('-collectedDate');
        // .populate('categories');

        if (req.params.category) {
            q.where('category').in([req.params.category]);
        }

        q.exec(function(err, results) {
            if (err) return res.apiError('database error', err);
            res.apiResponse(results);
        });
    }
}
