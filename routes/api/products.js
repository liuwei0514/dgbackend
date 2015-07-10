var keystone = require('keystone');

exports = module.exports = function(req, res) {
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
        res.json(results);
        next(err);
    });
};
