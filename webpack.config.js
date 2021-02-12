const path = require("path")
const glob = require("glob")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const setMPA = function() {
    let entry = {};
    let htmlWebpackPlugins = [];
    let entryFiles = glob.sync( path.join(__dirname, "./src/*/index.js") )

    entryFiles.forEach( entryPath => {

        let match = entryPath.match( /src\/(.*)\/index\.js/ );
        let pageName = match && match[1];

        entry[pageName] = entryPath;
        let template = entryPath.replace( /\.js/, ".html" );
        htmlWebpackPlugins.push( 
            new HtmlWebpackPlugin({
                template: "index.html",
                filename: `${pageName}.html`,
                chunks: ['vendors', pageName],
                inject: "body"
            })
         )
    } )
    
    return {
        entry,
        htmlWebpackPlugins
    }
}

let { entry, htmlWebpackPlugins } = setMPA();
console.log(entry)
module.exports = {
    mode: "development",

    entry: entry,

    output: {
        path: path.join( __dirname, "dist" ),
        filename: "[name].js"
    },

    devServer: {
        contentBase: "./dist",
        hot: true
    },

    plugins: [...htmlWebpackPlugins],
    
    devtool: 'cheap-source-map'
}