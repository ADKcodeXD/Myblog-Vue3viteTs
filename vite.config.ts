import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';

function resovePath(paths: string) {
  // 如何 __dirname 找不到 需要 yarn add @types/node --save-dev
  return resolve(__dirname, paths);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),AutoImport({
    dts:'src/auto-imports.d.ts',
    imports:['vue','vue-router']
  }),Components({
    dirs:['src/components'],
    extensions:['vue'],
    dts:'src/components.d.ts'
  })],
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src')
    }
  },
  // css
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        javascriptEnabled: true,
        // 这样就能全局使用 src/assets/styles/base.less 定义的 变量
        additionalData: `@import "${resovePath('src/assets/styles/mixins.less')}";`
      },
    },
  },
  server:{
    port:5000
  }
})


