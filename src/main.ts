import { createApp } from 'vue'
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import '@/assets/styles/iconfont.less'
import '@/assets/styles/github-light.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/github.css'
import '@/assets/styles/index.css'

createApp(App).use(ElementPlus,{locale: zhCn,}).use(createPinia()).use(router).use(hljsVuePlugin).mount('#app')


