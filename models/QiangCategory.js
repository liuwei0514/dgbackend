var keystone = require('keystone');

/**
 * QiangCategory Model
 * ==================
 */

var QiangCategory = new keystone.List('QiangCategory', {
    autokey: {
        from: 'categoryId',
        path: 'name',
        unique: true
    }
});

QiangCategory.add({
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

QiangCategory.relationship({
    ref: 'Qiang',
    path: 'category'
});
QiangCategory.defaultColumns = 'title,categoryId,url';

QiangCategory.register();
