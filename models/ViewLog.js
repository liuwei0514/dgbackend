var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ViewLog Model
 * ==========
 */

var ViewLog = new keystone.List('ViewLog', {
});

ViewLog.add({
    createdDate: {
        type: Types.Datetime,
        index: true
    }
});

ViewLog.defaultColumns = 'createdDate';
ViewLog.register();
