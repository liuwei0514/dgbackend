var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * DownloadLog Model
 * ==========
 */

var DownloadLog = new keystone.List('DownloadLog', {
});

DownloadLog.add({
    createdDate: {
        type: Types.Datetime,
        index: true
    }
});

DownloadLog.defaultColumns = 'createdDate';
DownloadLog.register();
