var keystone = require('keystone');

/**
 * ProductCategory Model
 * ==================
 */

var ProductCategory = new keystone.List('ProductCategory', {
});

ProductCategory.add({
	urlKey: {
        type: String
    },
    floorIndex: {
        type: Number
    },
    name: {
        type: String
    }
});

ProductCategory.relationship({ ref: 'Product', path: 'categories' });

ProductCategory.register();
