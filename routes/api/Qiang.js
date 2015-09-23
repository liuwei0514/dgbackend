var async = require('async'),
    keystone = require('keystone'),
    Qiang = keystone.list('Qiang');

exports = module.exports = {
    list: function(req, res, next) {

        var q = keystone.list('Qiang').paginate({
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
    },
    create: function(req, res, next) {
        var items = req.body.itemList;
        var category = req.body.category;
        var len = items.length;
        async.eachSeries(items, function(item, callback) {
            var product = new Qiang.model(item);
            product.category = category;
            product.collectedDate = new Date();
            product.save(function(err){
                callback(null);
            });
        }, function(err) {
            res.status(200).end();
        });
    }
}
