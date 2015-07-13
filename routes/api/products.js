var async = require('async'),
    keystone = require('keystone'),
    Product = keystone.list('Product');

exports = module.exports = {
    list: function(req, res, next) {

        var q = keystone.list('Product').paginate({
            page: req.query.page || 1,
            perPage: 10,
            maxPages: 10
        });
        // .populate('categories');

        if (req.params.category) {
            q.where('categories').in([req.params.category]);
        }

        q.exec(function(err, results) {
            if (err) return res.apiError('database error', err);
            res.apiResponse(results);
        });
    },
    create: function(req, res, next) {
        var items = req.body.itemList;
        var categoryName = req.body.categoryName;
        var len = items.length;
        async.eachSeries(items, function(item, callback) {
            var product = new Product.model(item);
            product.category = categoryName;
            product.tags = item.name.tags;
            product.save(function(err){
                callback(null); 
            });
        }, function(err) {
            res.status(200).end();
        });
    }
}
