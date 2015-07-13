var keystone = require('keystone');
var Types = keystone.Field.Types;
var mongoose = keystone.mongoose;

// var modelCleanCyclic = require('./modelCleanCyclic');

/**
 * Product Model
 * ==========
 */

var Product = new keystone.List('Product', {
    map: {
        name: "baseinfo.itemId"
    }
});

Product.add({
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
    merit: {
        desc: {
            type: Types.TextArray
        },
        down: {
            type: Types.TextArray
        },
        up: {
            type: Types.TextArray
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
    promotion: {
        hongbao: {
            type: Number
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
    category: {
        type: String,
        index: true
    },
});


Product.schema.add({
    tags: {
        type: mongoose.Schema.Types.Mixed
    }
});
// Product.schema.set('toJSON', {
//   virtuals: true,
//   transform: modelCleanCyclic.transformer
// });

Product.defaultColumns = 'baseinfo.itemId, name.shortName, price.actPrice';
Product.register();
