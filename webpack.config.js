const webpack = require("webpack")
const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ExtensionReloader  = require("webpack-extension-reloader")

const distFolder = 'dist'
const distPath = path.join(__dirname, distFolder)
const distSrcPath = path.join(distPath, 'src')

const contentScripts = {
  content: './src/src/content.js'
}
const extensionPages = {
  options: './src/src/options.js'
}

module.exports = {
  mode: 'development',
  devtool: "inline-source-map",
  entry: {
    background: './src/src/background.js',
    ...contentScripts,
    ...extensionPages
  },
  output: {
    path: distSrcPath,
    filename: "[name].js"
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "./src/manifest.json", to: distPath },
      { context: 'src/src/', from: "*.html", to: distSrcPath },
      { context: 'src/src/', from: "*.css", to: distSrcPath }
    ]),
    new ExtensionReloader({
      port: 1417,
      reloadPage: true,
      entries: {
        contentScript: Object.keys(contentScripts),
        extensionPage: Object.keys(extensionPages),
        background: 'background'
      }
    })
  ]
}
