var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ShareViewedLog Model
 * ==========
 */

var ShareViewedLog = new keystone.List('ShareViewedLog', {
});

ShareViewedLog.add({
	appUser: { type: Types.Relationship, ref: 'AppUser', index: true },
	
    createdDate: {
        type: Types.Datetime,
        index: true
    }
});

ShareViewedLog.defaultColumns = 'createdDate';
ShareViewedLog.register();
