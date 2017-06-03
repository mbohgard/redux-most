/* eslint-disable import/no-commonjs */

const webpack = require('webpack')

const baseConfig = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    library: 'ReduxMost',
    libraryTarget: 'umd',
  },
  externals: {
    most: {
      root: 'most',
      commonjs2: 'most',
      commonjs: 'most',
      amd: 'most',
    },
    redux: {
      root: 'Redux',
      commonjs2: 'redux',
      commonjs: 'redux',
      amd: 'redux',
    },
  },
  resolve: {
    extensions: ['.js'],
    mainFields: ['module', 'main', 'jsnext:main'],
  },
}

const devConfig = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    filename: './dist/redux-most.js',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      'NODE_ENV': 'development'
    }),
  ],
}

const prodConfig = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    filename: './dist/redux-most.min.js',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      'NODE_ENV': 'production'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      comments: false,
    }),
  ],
}

module.exports = [devConfig, prodConfig]
