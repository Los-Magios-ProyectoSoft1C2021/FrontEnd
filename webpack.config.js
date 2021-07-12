const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
//const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: ["./src/main.js"],
    mode: "production",
    devtool: (process.env.NODE_ENV === 'production') ? 'cheap-module-source-map' : 'eval-source-map',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/",
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        hot: false,
        port: 8080,
        //compress: true,
        historyApiFallback: true,
        //writeToDisk: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimize: true,
        minimizer: [new TerserPlugin({
            parallel: true,
        })],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin(),
        /*
        new CopyPlugin({
            patterns: [{
                from: "./src/img",
                to: "img"
            }]
        }),
        */
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
            use: [MiniCssExtractPlugin.loader, /*"style-loader",*/ "css-loader", "postcss-loader"],
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
            options: {
                helperDirs: [path.join(__dirname, './src/js/handlebars')],
            },
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
        ]
    },
};