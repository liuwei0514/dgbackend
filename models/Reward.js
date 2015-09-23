var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Reward Model
 * ==========
 */

var Reward = new keystone.List('Reward', {
});

Reward.add({
    type: { type: Types.Select, options: 'expired,valid,invalid', default: 'valid', index: true },
	
    year: { type: Number, index: true },
    month: { type: Number, index: true },
    amount: { type: Types.Money, index: true },

	appUser: { type: Types.Relationship, ref: 'AppUser', index: true },
});

Reward.defaultColumns = 'createdDate';
Reward.register();
