var keystone = require('keystone');
var Types = keystone.Field.Types;
var mongoose = keystone.mongoose;

// var modelCleanCyclic = require('./modelCleanCyclic');

/**
 * Qiang Model
 * ==========
 */

var Qiang = new keystone.List('Qiang', {
    
});

Qiang.add({
    baseinfo: {
        itemId: {
            type: String,
            index: {
                unique: true
            },
            require: true,
            initial: true
        },
        itemStatus: {
            type: String
        },
        itemUrl: {
            type: String
        },
        juId: {
            type: Number
        },
        oetime: {
            type: Types.Datetime,
            format: "x"
        },
        ostime: {
            type: Types.Datetime,
            format: "x"
        },
        picGroup: {
            type: Types.TextArray
        },
        picUrl: {
            type: String
        },
        picUrlFromIc: {
            type: String
        },
        picUrlM: {
            type: String
        },
        picUrlNew: {
            type: String
        },
        push: {
            type: Boolean
        },
        salesSite: {
            type: Number
        },
        soldAmount: {
            type: Number
        },
        soldRatio: {
            type: Number
        }, //销售比例
        stock: {
            type: Number
        }, 
        totalStock: {
            type: Number
        }
    },
    extend: {
        fwIcon: {
            type: String
        },
        fwType: {
            type: String
        },
        titleIcon: {
            type: String
        }
    },
    name: {
        longName: {
            type: String
        },
        prefix: {
            type: Types.TextArray
        },
        shortName: {
            type: String
        },
        title: {
            type: String
        }
    },
    price: {
        actPrice: {
            type: String
        },
        discount: {
            type: String
        },
        discountText: {
            type: String
        },
        hangtagPrice: {
            type: Boolean
        },
        longerPrice: {
            type: Boolean
        },
        origPrice: {
            type: String
        }
    },
    remind: {
        fire: {
            type: Boolean
        },
        remindNum: {
            type: Number
        },
        soldCount: {
            type: Number
        }
    },
    collectedDate: { type: Types.Date, index: true },
    category: { type: Types.Relationship, ref: 'QiangCategory', many: false ,index: true}
});


Qiang.defaultColumns = 'baseinfo.itemId, name.shortName, price.actPrice';
Qiang.register();
