var keystone = require('keystone');
var Types = keystone.Field.Types;
var mongoose = keystone.mongoose;

/**
 * AppUser Model
 * ==========
 */

var AppUser = new keystone.List('AppUser', {
    map: { name: 'taobaoid' },

});

AppUser.add({
    // nickname: {
    //     type: Types.Text,
    //     index: {
    //         unique: true
    //     }
    // },

    password: {
        type: Types.Password,
    },

    tel: {
        type: Types.Number,
        index: true,
        initial: true,
    },

    taobaoid: {
        index: {
            unique: true
        },
        type: Types.Text,
        require: true,  
    },

    alipayid: {
        type: Types.Text
    },

    reference: { type: Types.Relationship, ref: 'AppUser' },

    income: {
        total: {
            type: Types.Money
        },
        shared: {
            type: Types.Money
        },
        saled: {
            type: Types.Money
        },
        balance: {
            type: Types.Money
        }
    },

    state: {
        type: Types.Select,
        options: 'forbidden, nomal, unValidated',
        default: 'unValidated',
        index: true
    },

    createdDate: {
        type: Types.Datetime,
        index: true
    }
});
AppUser.relationship({ path: 'staffs', ref: 'AppUser', refPath: 'reference' });

AppUser.defaultColumns = 'taobaoid';
AppUser.register();
