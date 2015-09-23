var keystone = require('keystone');

/**
 * JHSCategory Model
 * ==================
 */

var JHSCategory = new keystone.List('JHSCategory', {
    autokey: {
        from: 'categoryId',
        path: 'name',
        unique: true
    }
});

JHSCategory.add({
    url: {
        type: String,
        initial: true
    },
    categoryId: {
        type: Number,
        initial: true
    },
    title: {
        type: String,
        initial: true
    }
});

JHSCategory.relationship({
    ref: 'JHS',
    path: 'category'
});
JHSCategory.defaultColumns = 'title,categoryId,url';

JHSCategory.register();
