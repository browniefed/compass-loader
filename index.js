var utils = require('loader-utils');
var compass = require('compass-node');
var path = require('path');

module.exports = function (content) {
    this.cacheable();
    var callback = this.async();

    var opt = utils.parseQuery(this.query);
    opt.data = content;

    // skip empty files, otherwise it will stop webpack, see issue #21
    if (opt.data.trim() === '') {
        return callback(null, content);
    }

    // set include path to fix imports
    opt.includePaths = opt.includePaths || [];
    opt.includePaths.push(path.dirname(this.resourcePath));
    if (this.options.resolve && this.options.resolve.root) {
        var root = [].concat(this.options.resolve.root);
        opt.includePaths = opt.includePaths.concat(root);
    }

    opt.spriteDist = opt.spriteOutput || '';

    // output compressed by default
    opt.outputStyle = opt.outputStyle || 'compressed';
    opt.stats = {};
    
    var loadPaths = opt.includePaths;
    var markDependencies = function (deps) {
        deps.forEach(function(file) {
            this.addDependency(file);
        }.bind(this))
    }.bind(this);

    opt.success = function (css) {
        markDependencies( (css.stats && css.stats.includedFiles || []) )
        callback(null, css.css);
    }.bind(this);

    opt.error = function (err) {
        this.emitError(err);
        callback(err);
    }.bind(this);

    compass.render(this.resourcePath, opt);
};
