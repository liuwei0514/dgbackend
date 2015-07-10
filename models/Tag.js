var keystone = require('keystone');

/**
 * Tag Model
 * ==================
 */

var Tag = new keystone.List('Tag', {
	map: { name: 'text' }
});

Tag.add({
	tag: { type: String, required: true , initial: true},
	text: { type: String, required: true , initial: true}
});

Tag.relationship({ ref: 'Product', path: 'tags' });

Tag.register();
