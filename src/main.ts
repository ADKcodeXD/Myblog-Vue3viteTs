import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
// 本地化 elementplus
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
// 引入iconfont
import '@/assets/styles/iconfont.less'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
// tailwind 的css文件 
import '@/assets/styles/index.css'
import '@/assets/styles/preflight.css';
import 'virtual:svg-icons-register';

const app=createApp(App).use(ElementPlus,{locale: zhCn,}).use(createPinia()).use(router).use(hljsVuePlugin)
// app.config.globalProperties.$echarts = echarts;
app.mount('#app')
