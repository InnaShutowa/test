var path = require('path');

module.exports = {
    entry: path.join(__dirname, "./src/index.js"),
    //"./src/index.js",
    mode: "development",
    output: {
        filename: "./main.js"
    },
    devServer: {
        contentBase: path.join(__dirname),
        //"C:\\Users\\Инна\\source\\repos\\ServerApi\\front",
        compress: true,
        port: 9000,
        watchContentBase: true,
        progress: true,
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    }
};