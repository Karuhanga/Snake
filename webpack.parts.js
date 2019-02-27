/**
 * Base Parts
 */

// Images
exports.loadImagesAndFonts = {
    module: {
        rules: [
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "images/[name].[ext]",
                    },
                },
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    },
                },
            },
        ],
    },
};

// JS
exports.loadJavaScript = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
            },
        ],
    },
};

/**
 * Development Parts
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
// HTML File Processing Setup
exports.HTMLWebpackConfig = {
    plugins: [
        new HtmlWebpackPlugin({
            title: "Snake",
            template: "src/index.html"
        }),
    ]
};

// CSS Processing
// Load and inline css
exports.loadCSS = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
};

// Source Maps
exports.sourceMaps = {
    devtool: "cheap-module-eval-source-map",
};

// Better cmd output
const DashboardPlugin = require("webpack-dashboard/plugin");
exports.dashboard = {
    plugins: [
        new DashboardPlugin()
    ]
};

// Friendlier errors
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
exports.friendlierErrors = {
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
    ]
};

/**
 * Production Parts
 */

// CSS Processing
// Load and extract css
// Auto Pre-fixer allows auto generation of browser specific style prefixes
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
exports.loadAndExtractCSS = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [autoprefixer()],
                        },
                    }
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[name].css",
        })],
};
