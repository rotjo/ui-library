var merge = require('deepmerge');

/**
 * Files
 */
var shared = require('./resources/shared.resources');
var small = require('./resources/small.resources');
var large = require('./resources/large.resources');

/**
 * Bundles
 */
exports.scripts = {
    'ui-library': merge(shared.scripts, small.scripts)
};

exports.styles = {
    'ui-library__small': merge(shared.styles, small.styles),
    'ui-library__large': merge(shared.styles, large.styles)
};
/*
exports.fonts = {
    'resources__small': merge(shared.fonts, small.fonts),
    'resources__large': merge(shared.fonts, large.fonts)
};

exports.images = {
    'resources__small': merge(shared.images, small.images),
    'resources__large': merge(shared.images, large.images)
};
*/
