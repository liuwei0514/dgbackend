var keystone = require('keystone');

/**
 * QingCategory Model
 * ==================
 */

var QingCategory = new keystone.List('QingCategory', {
    autokey: {
        from: 'categoryId',
        path: 'name',
        unique: true
    }
});

QingCategory.add({
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

QingCategory.relationship({
    ref: 'Qing',
    path: 'category'
});
QingCategory.defaultColumns = 'title,categoryId,url';

QingCategory.register();
