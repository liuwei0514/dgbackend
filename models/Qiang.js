var keystone = require('keystone');
var Types = keystone.Field.Types;
var mongoose = keystone.mongoose;


/**
 * Qiang Model
 * ==========
 */

var Qiang = new keystone.List('Qiang', {

});

Qiang.add({
    href: {
        type: String
    },
    itemId: {
        type: String,
        index: {
            unique: true
        },
        require: true,
        initial: true
    },
    img: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        original: {
            type: String
        },
        promo: {
            type: String
        }
    },
    startDate: {
        type: Types.Datetime
    },
    collectedDate: {
        type: Types.Datetime,
        index: true
    },
    category: {
        type: Types.Relationship,
        ref: 'QiangCategory',
        many: false,
        index: true
    }
});


Qiang.defaultColumns = 'name';
Qiang.register();
