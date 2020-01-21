const path = require('path')
const IS_PROD = ['production', 'development'].includes(process.env.NODE_ENV)
const resolve = dir => path.join(__dirname, dir)

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  runtimeCompiler: true,
  productionSourceMap: !IS_PROD,
  chainWebpack: config => {
    config.resolve.alias
        .set('@', resolve('src'))
        .set('@assets', resolve('src/assets'))
        .set('@components', resolve('src/components'))
        .set('@plugins', resolve('src/plugins'))
        .set('@views', resolve('src/views'))
        .set('@store', resolve('src/store'))
        .set('@router', resolve('src/router'))
        .set('@layouts', resolve('src/layouts'))
        .set('@static', resolve('src/static'))
        .set('@api', resolve('src/api'))
        .set('@utils', resolve('src/utils'))
    config.performance
        .maxEntrypointSize(5000000)
        .maxAssetSize(3000000)
  },
  devServer: {
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' ? 'http://123.57.152.161:3000' : 'http://localhost:3000/api/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}