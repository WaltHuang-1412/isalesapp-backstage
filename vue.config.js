const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/styles/app.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '^/api/v1': {
        target: 'http://54.255.251.215:8080/iSaleApp/'
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/variables/_index.scss'),
        path.resolve(__dirname, './src/styles/mixins/_index.scss'),
        path.resolve(__dirname, './src/styles/functions/_index.scss')
      ]
    }
  }
})
