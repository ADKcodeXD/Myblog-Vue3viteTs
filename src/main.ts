import { createApp } from 'vue'
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/iconfont.less'
import '@/assets/styles/github-light.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/github.css'

createApp(App).use(ElementPlus).use(createPinia()).use(router).use(hljsVuePlugin).mount('#app')


