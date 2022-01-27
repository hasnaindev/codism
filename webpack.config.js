const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HTMLPlugins = () =>
  glob.sync('./src/**/*.html').map(
    (dir) =>
      new HTMLWebpackPlugin({
        template: dir,
        publicPath: '/',
        filename: path.basename(dir),
      }),
  );

module.exports = (_, { mode }) => {
  const isDev = mode === 'development';

  const plugins = [
    ...HTMLPlugins(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          to: 'static',
          from: 'src/static',
        },
      ],
    }),
  ];

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    plugins.unshift(
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[hash].css',
      }),
    );
  }

  return {
    entry: ['babel-polyfill', './src/scripts/index.js'],

    output: {
      filename: 'scripts/[name].[hash].js',
      path: path.resolve(__dirname, 'dist'),
    },

    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.s?css$/i,
          use: [
            isDev
              ? 'style-loader'
              : {
                  loader: MiniCssExtractPlugin.loader,
              },
            'css-loader',
            'postcss-loader'
          ],
        },
        {
          loader: 'file-loader',
          test: /\.(png|jpe?g|gif|svg)$/i,
          options: {
            outputPath: 'assets/',
            publicPath: '/assets/',
          },
        },
        {
          loader: 'file-loader',
          test: /\.(eot|woff2?|ttf)$/i,
          options: {
            outputPath: 'fonts/',
            publicPath: '../fonts/',
            name: '[name].[ext]',
          },
        },
      ],
    },

    plugins,

    resolve: {
      extensions: ['.js', '.css'],
    },

    devServer: {
      watchFiles: ['./src/**/*.html'],
      port: 8080,
      hot: isDev,
      open: isDev,
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    devtool: isDev ? 'inline-source-map' : 'source-map',

    cache: isDev,

    mode,
  };
};
