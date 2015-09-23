var keystone = require('keystone');
var Types = keystone.Field.Types;
var mongoose = keystone.mongoose;

// var modelCleanCyclic = require('./modelCleanCyclic');

/**
 * Tejia Model
 * ==========
 */

var Tejia = new keystone.List('Tejia', {
    
});

Tejia.add({
    itemId: {
        type: String,
        index: {
            unique: true
        },
        require: true,
        initial: true
    },

    title: {
        type: String
    },
    reservePrice: {
        type: String
    },
    discountPrice: {
        type: String
    },
    discount: {
        type: String
    },
    activityPicUrl: {
        type: String
    },
    currentSellOut: {
        type: String
    },
    quantity: {
        type: String
    },
    currentQuantity: {
        type: String
    },
    isGoldSeller: {
        type: Boolean
    },
    brandLogoUrl: {
        type: String
    },
    activityStartTime: {
        type: String
    },
    activityEndTime: {
        type: String
    },
    taokeUrl: {
        type: String
    },
    country: {
        type: String
    },
    status: {
        type: String
    },
    collectedDate: { type: Types.Datetime, index: true },
    category: { type: Types.Relationship, ref: 'TejiaCategory', many: false ,index: true}
});


Tejia.defaultColumns = 'itemId, title';
Tejia.register();
