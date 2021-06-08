const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: ["./src/main.js"],
    mode: "development",
    devtool: "eval-cheap-source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        port: 3000,
        //compress: true,
        historyApiFallback: true,
        //writeToDisk: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        /*
        new CopyPlugin({
            patterns: [{
                from: "./src/img",
                to: "img"
            }],
        }),*/
    ],
    module: {
        rules: [{
            test: /\.js$/i,
            include: path.resolve(__dirname, "src"),
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ],
        },
        {
            test: /\.html$/i,
            loader: "html-loader",
        },
        {
            test: /\.(png|jpe?g|jpg|gif)$/i,
            type: "asset/resource",
        },
        {
            test: /\.handlebars$/,
            loader: "handlebars-loader",
        },
        ],
    },
};