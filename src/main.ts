import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
// import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import '@/assets/styles/iconfont.less'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import '@/assets/styles/index.css'
import '@/assets/styles/preflight.css';
import 'virtual:svg-icons-register';
const app=createApp(App).use(createPinia()).use(router).use(hljsVuePlugin)
// app.config.globalProperties.$echarts = echarts;
app.mount('#app')
