const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // configureWebpack: {
  //   externals: {
  //     BMap: 'BMap',
  //     BMap_Symbol_SHAPE_POINT: 'BMap_Symbol_SHAPE_POINT',
  //   },
  // },
})
