var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ShareDownloadLog Model
 * ==========
 */

var ShareDownloadLog = new keystone.List('ShareDownloadLog', {
});

ShareDownloadLog.add({
    createdDate: {
        type: Types.Datetime,
        index: true
    }
});

ShareDownloadLog.defaultColumns = 'createdDate';
ShareDownloadLog.register();
