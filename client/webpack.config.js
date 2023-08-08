const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'jate',
        template: './index.html'
      }),
      // Injects manifest
      new InjectManifest({
        swDest: 'src-sw.js',
        swSrc: './src-sw.js',
      }),
      // Creates new manifest file
      new WebpackPwaManifest({
        inject: true,
        name: 'Just Another Text Editor',
        prints: false,
        description: 'text editor',
        publicPath: '/',
        short_name: 'jate',
        tart_url: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [94, 126, 190, 254, 382, 510],
            destination: path.join('icons', 'assets'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        
      ],
    },
  };
};
