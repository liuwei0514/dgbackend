var keystone = require('keystone');

/**
 * TejiaCategory Model
 * ==================
 */

var TejiaCategory = new keystone.List('TejiaCategory', {
    autokey: {
        from: 'categoryId',
        path: 'name',
        unique: true
    }
});

TejiaCategory.add({
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

TejiaCategory.relationship({
    ref: 'Tejia',
    path: 'category'
});
TejiaCategory.defaultColumns = 'title,categoryId,url';

TejiaCategory.register();
