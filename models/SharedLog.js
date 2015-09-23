var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SharedLog Model
 * ==========
 */

var SharedLog = new keystone.List('SharedLog', {
});

SharedLog.add({
	type: { type: Types.Select, options: 'weixin, pengyou, qq,qzone,qqsc,weibo', default: 'weixin', index: true },
	
    sharedLogDate: { type: Types.Datetime, index: true },

	appUser: { type: Types.Relationship, ref: 'AppUser', index: true },
});

SharedLog.defaultColumns = 'type, sharedLogDate, appUser';
SharedLog.register();
