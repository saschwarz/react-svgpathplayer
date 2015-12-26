import fs from 'fs';
import path from 'path';
import marked from 'marked';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import SystemBellPlugin from 'system-bell-webpack-plugin';
import Clean from 'clean-webpack-plugin';
import merge from 'webpack-merge';
import React from 'react';
import ReactDOM from 'react-dom/server';
import pkg from './package.json';

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = __dirname;
const config = {
  paths: {
    dist: path.join(ROOT_PATH, 'dist'),
    src: path.join(ROOT_PATH, 'src'),
    demo: path.join(ROOT_PATH, 'demo'),
    tests: path.join(ROOT_PATH, 'tests')
  },
  filename: 'svgpathplayer',
  library: 'SVGPathPlayer'
};
const CSS_PATHS = [
  config.paths.demo,
  path.join(ROOT_PATH, 'node_modules/purecss'),
  path.join(ROOT_PATH, 'node_modules/highlight.js/styles/github.css'),
  path.join(ROOT_PATH, 'node_modules/react-ghfork/gh-fork-ribbon.ie.css'),
  path.join(ROOT_PATH, 'node_modules/react-ghfork/gh-fork-ribbon.css')
];

process.env.BABEL_ENV = TARGET;

const demoCommon = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.png', '.jpg', '.scss']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: [
          config.paths.demo,
          config.paths.src
        ]
      }
    ],
    loaders: [
      {
          // https://github.com/adobe-webplatform/Snap.svg/issues/341#issuecomment-143267637
          test: require.resolve('snapsvg'),
          loader: 'imports-loader?this=>window,fix=>module.exports=0'
      },
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /\.png$/,
        loader: 'url?limit=100000&mimetype=image/png',
        include: config.paths.demo
      },
      {
        test: /(\.jpg)|(\.svg)$/,
        loader: 'file',
        include: config.paths.demo
      },
      {
        test: /\.json$/,
        loader: 'json',
        include: path.join(ROOT_PATH, 'package.json')
      }
    ]
  },
  plugins: [
    new SystemBellPlugin()
  ]
};

if (TARGET === 'start') {
  module.exports = merge(demoCommon, {
    devtool: 'eval-source-map',
    entry: config.paths.demo,
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      new HtmlWebpackPlugin({
        title: pkg.name + ' - ' + pkg.description,
        filename: 'index.html',
        templateContent: renderHTML.bind(null, 'demo/index.html')
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: CSS_PATHS
        },
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: [
            config.paths.demo,
            config.paths.src
          ]
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      host: process.env.HOST,
      port: process.env.PORT,
      stats: 'errors-only'
    }
  });
}

// // !TARGET === prepush hook for test
// if (TARGET === 'test' || TARGET === 'tdd' || !TARGET) {
//   module.exports = merge(demoCommon, {
//     module: {
//       preLoaders: [
//         {
//           test: /\.jsx?$/,
//           loaders: ['eslint'],
//           include: [
//             config.paths.tests
//           ]
//         }
//       ],
//       loaders: [
//         {
//           test: /\.jsx?$/,
//           loaders: ['babel'],
//           include: [
//             config.paths.src,
//             config.paths.tests
//           ]
//         }
//       ]
//     }
//   })
// }

const distCommon = {
  devtool: 'source-map',
  output: {
    path: config.paths.dist,
    libraryTarget: 'umd',
    library: config.library
  },
  entry: config.paths.src,
  // want packaged version to contain only it's code
  externals: {
   'react': 'var React',
   'react/addons': 'var React',
   'snapsvg': 'var Snap',
   'lodash': 'var _'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /(\.js)|(\.jsx)$/,
        loader: 'babel-loader',
        include: config.paths.src,
        query: {
            stage: 1
        },
      }
    ]
  },
  plugins: [
    new SystemBellPlugin()
  ]
};

if (TARGET === 'dist') {
  module.exports = merge(distCommon, {
    output: {
      filename: config.filename + '.js'
    }
  });
}

if (TARGET === 'dist-min') {
  module.exports = merge(distCommon, {
    output: {
      filename: config.filename + '.min.js'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}

if (TARGET === 'script') {
  module.exports = merge(distCommon, {
    output: {
      // export itself to a global var
      libraryTarget: "var",
      // name of the global var:
      library: config.library,
      filename: config.filename + '.script.js'
    }
  });
}
if (TARGET === 'script-min') {
  module.exports = merge(distCommon, {
    output: {
      // export itself to a global var
      libraryTarget: "var",
      // name of the global var:
      library: config.library,
      filename: config.filename + '.script.min.js'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}

if (TARGET === 'gh-pages' || TARGET === 'deploy-gh-pages') {
  module.exports = merge(demoCommon, {
    entry: {
      app: path.join(config.paths.demo, 'index.js'),
      script: path.join(config.paths.demo, 'script.js'),
      vendors: [
        'react',
        'react-dom',
        'lodash',
        'snapsvg'
      ]
    },
    output: {
      path: './gh-pages',
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    plugins: [
      new Clean(['gh-pages']),
      new ExtractTextPlugin('styles.[chunkhash].css'),
      new webpack.DefinePlugin({
          // This has effect on the react lib size
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      // script.html doesn't use any entry point info
      // relies on dist/*.script.js
      new HtmlWebpackPlugin({
        title: pkg.name + ' - ' + pkg.description,
        filename: 'script.html',
        templateContent: renderHTML.bind(null, 'demo/script.html')
      }),
      new HtmlWebpackPlugin({
        title: pkg.name + ' - ' + pkg.description,
        filename: 'index.html',
        templateContent: renderHTML.bind(null, 'demo/index.html')
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendors', 'manifest']
      })
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: CSS_PATHS
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          include: [
            config.paths.demo,
            config.paths.src
          ],
          query: {
            stage: 1
          }
        },
        // copy into gh-pages/images
        {
          test: /image\.svg$/,
          loader: 'file?name=images/image.svg',
          include: config.paths.demo
        },
        {
          test: /svgpathplayer\.script\.min\.js$/,
          loader: 'file?name=svgpathplayer.script.min.js',
          include: config.paths.dist
        }
      ]
    }
  });
}

function renderHTML(htmlTemplate, demoTemplate, templateParams, compilation) {
  demoTemplate = demoTemplate || '';

  var tpl = fs.readFileSync(path.join(__dirname, htmlTemplate), 'utf8');
  var readme = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');
  var replacements = {
    name: pkg.name,
    description: pkg.description,
    demo: demoTemplate,
    readme: marked(readme)
  };

  return tpl.replace(/%(\w*)%/g, function(match) {
    var key = match.slice(1, -1);

    return replacements[key] ? replacements[key] : match;
  });
}
