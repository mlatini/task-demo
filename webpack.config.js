const path = require('path');

module.exports = {
  entry: {
    main: './src/client/main.js',
    tasks: './src/client/tasks.js',
    addTask: './src/client/addTask.js',
    editTask: './src/client/editTask.js',
    editCategories: './src/client/editCategories.js',
    admin: './src/client/admin.js'
  },
  output: {
    filename: '[name]Bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  resolve: {
    extensions: [
      '.js', '.jsx'
    ]
  },
  module: {
    rules: [
      //{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      //{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      //{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
     // { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      //{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.(png|jpg|gif)$/, use: [ 'file-loader' ] }
    ]
  },
};
