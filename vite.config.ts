import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 预构建插件
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import eslintPlugin from 'vite-plugin-eslint' // 导入包
function resovePath(paths: string) {
  // 如何 __dirname 找不到 需要 yarn add @types/node --save-dev
  return resolve(__dirname, paths)
}
// https://vitejs.dev/config/
export default ({ mode }) => {
  // 用于导入生产和开发环境的配置
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())
  }
  return defineConfig({
    base: process.env.VITE_PUBLIC_PATH,
    assetsInclude: resolve(__dirname, 'src/assets'),
    plugins: [
      vue(),
      AutoImport({
        dts: true,
        imports: ['vue', 'vue-router'],
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        dts: true,
        resolvers: [ElementPlusResolver()]
      }),
      viteCompression(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      PkgConfig(),
      OptimizationPersist(),
      // 增加下面的配置项,这样在运行时就能检查eslint规范
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    define: {
      'process.env': process.env
    },
    // css
    css: {
      preprocessorOptions: {
        less: {
          charset: false,
          javascriptEnabled: true,
          // 这样就能全局使用 src/assets/styles/mixins.less 定义的 变量
          additionalData: `@import "${resovePath('src/assets/styles/mixins.less')}";`
        }
      },
      postcss: {
        plugins: [require('autoprefixer'), require('tailwindcss')]
      }
    },
    server: {
      port: 5001,
      proxy: {
        '/api': {
          target: 'http://localhost:8888',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        '/bgmtv': {
          target: 'https://bgm.tv',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/bgm/, '')
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
