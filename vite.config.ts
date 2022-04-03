import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import viteCompression from 'vite-plugin-compression'
function resovePath(paths: string) {
  // 如何 __dirname 找不到 需要 yarn add @types/node --save-dev
  return resolve(__dirname, paths);
}
// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    base: '/',
    plugins: [vue(), AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue', 'vue-router']
    }), Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      dts: 'src/components.d.ts'
    }), viteCompression(),],
    resolve: {
      alias: {
        "@": resolve(__dirname, 'src')
      }
    },
    define:{
      'process.env':process.env
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
      postcss: {
        plugins: [
          require('autoprefixer'),
          require('tailwindcss'),
        ]
      },

    },
    server: {
      port: 5000,
      proxy: {
        '/api': {
          target: 'http://localhost:8888',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        '/bgm': {
          target: 'https://api.bgm.tv',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/bgm/, '')
        },
        '/yhdm': {
          target: 'https://tup.yinghuacd.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/yhdm/, '')
        }
      }
    }
  })
}


