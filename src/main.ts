import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import {createPinia} from 'pinia';
// import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import '@/assets/styles/iconfont/iconfont.less'
import hljs from 'highlight.js';
import '@/assets/styles/tailwind/index.css'
import '@/assets/styles/tailwind/preflight.css';
import 'virtual:svg-icons-register';
import { createHead } from '@vueuse/head';
const head = createHead();
const pinia=createPinia();
const app = createApp(App).use(router).use(pinia).use(head);
// app.config.globalProperties.$echarts = echarts;
// highlight js 的自定义指令
app.directive('highlight', {
    mounted(el) {
        hljs.configure({});
        let blocks = el.querySelectorAll('pre');
        blocks.forEach((block) => {
            hljs.highlightBlock(block)
        })
    }
})
app.mount('#app')
