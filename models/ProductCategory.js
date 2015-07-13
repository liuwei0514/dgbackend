var keystone = require('keystone');

/**
 * ProductCategory Model
 * ==================
 */

var ProductCategory = new keystone.List('ProductCategory', {
    autokey: {
        from: 'parent.urlKey floorIndex',
        path: 'name',
        unique: true
    }
});

ProductCategory.add({
    url: {
        type: String,
        initial: true
    },
    floorIndex: {
        type: Number,
        initial: true
    },
    title: {
        type: String,
        initial: true
    },
    parent: {
        title: {
            type: String,
            initial: true
        },
        urlKey: {
            type: String,
            initial: true
        }
    }
});

ProductCategory.relationship({
    ref: 'Product',
    path: 'category'
});
ProductCategory.defaultColumns = 'title, parent.title';

ProductCategory.register();
