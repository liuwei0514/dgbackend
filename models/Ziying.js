var keystone = require('keystone');
var Types = keystone.Field.Types;
var mongoose = keystone.mongoose;

/**
 * Ziying Model
 * ==========
 */

var Ziying = new keystone.List('Ziying', {

});

Ziying.add({
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
    collectedDate: {
        type: Types.Datetime,
        index: true
    }
});

Ziying.defaultColumns = 'name';
Ziying.register();
