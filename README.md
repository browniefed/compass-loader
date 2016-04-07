# DO NOT USE THIS

## THIS IS NOT MAINTAINED

If you do not need compass (various mixins and sprite generation, etc) then please see the sass-loader [https://github.com/jtangelder/sass-loader](https://github.com/jtangelder/sass-loader)

## compass loader for [webpack](http://webpack.github.io/)



####Warning
This is all pretty beta stuff, I don't recommend using this in production just yet. 
Honestly you're better off using `sass-loader` and [https://github.com/Igosuki/compass-mixins](https://github.com/Igosuki/compass-mixins) then add `node_modules/compass-mixins/lib` as an include path.

####You've been warned

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var css = require("!raw!compass!./file.scss");
// => returns compiled css code from file.scss, resolves imports
var css = require("!css!compass!./file.scss");
// => returns compiled css code from file.scss, resolves imports and url(...)s
```

Use in tandem with the [`style-loader`](https://github.com/webpack/style-loader) to add the css rules to your document:

``` javascript
require("!style!css!compass!./file.scss");
```

### webpack config

It's recommended to adjust your `webpack.config` so `style!css!compass!` is applied automatically on all files ending on `.scss`:

``` javascript
module.exports = {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: "style!css!compass?outputStyle=expanded&" +
          "includePaths[]=" +
            (path.resolve(__dirname, "./bower_components")) + "&" +
          "includePaths[]=" +
            (path.resolve(__dirname, "./node_modules"))
      }
    ]
  }
};
```

If you utilize sprites or anything that utilizes your `config.rb` images path then you'll need to pass in both `imagePath` and `spriteDist` paths.
``` javascript
var imagePath = path.resolve(__dirname, '../images'),
    spriteOutput = imagePath;
require("!style!raw!compass!./file.scss?imagePath=" + imagePath + "&spriteOutput=" + spriteOutput);
```

Comma separate imports are not supported.
```
@import "language", "another/module";
```
should be written as
```
@import "language";
@import "another/module";
```
Sorry.


Also this depends on the latest node-sass 2.0 beta to return all included files so we can tell webpack about dependencies.
This may or may not work well, and also won't work when node-sass generates errors as it will not complete parsing the CSS and will not return all included files. To get this functionality sass-graph would have to be modified



Then you only need to write: `require("./file.scss")`. See [`node-sass`](https://github.com/andrew/node-sass) for the available options.

## Install

`npm install compass-loader`

## Caveats

Currently the sass-loader does not follow all of the webpack loader guidelines. The general problem is that the entry scss-file is passed to [node-sass](https://github.com/sass/node-sass) which does pretty much the rest. Thus `@import` statements inside your scss-files cannot be resolved by webpack's resolver. However, there is an [issue for that missing feature in libsass](https://github.com/sass/libsass/issues/21).

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
