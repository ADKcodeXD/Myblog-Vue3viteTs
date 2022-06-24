import {getItem} from './../utils/storage';
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import {ElMessageBox} from 'element-plus';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'Layout',
        component: () => import ('@/views/Layout.vue'),
        children: [
            {
                path: '',
                name: 'Index',
                meta: {
                    title: '首页',
                    requireAuth: false,
                    keepAlive: false
                },
                component: () => import ('@/views/index/index.vue')
            },
            {
                path: 'edit',
                name: 'Edit',
                meta: {
                    title: '写文章',
                    requireAuth: true,
                    keepAlive: false
                },
                component: () => import ('@/views/edit/index.vue')
            },
            {
                path: 'articlelist',
                name: 'ArticleList',
                meta: {
                    title: '文章列表',
                    requireAuth: false,
                    keepAlive: true
                },
                component: () => import ('@/views/articlelist/index.vue')
            },
            {
                path: 'messageboard',
                name: 'MessageBoard',
                meta: {
                    title: '留言板',
                    keepAlive: true
                },
                component: () => import ('@/views/messageboard/index.vue')
            }, {
                path: 'home',
                name: 'Home',
                meta: {
                    title: '个人信息',
                    requireAuth: true,
                    keepAlive: true
                },
                component: () => import ('@/views/home/index.vue')
            }, {
                path: 'anime',
                name: 'Anime',
                meta: {
                    title: '动漫',
                    requireAuth: false,
                    keepAlive: true
                },
                component: () => import ('@/views/anime/index.vue')
            }, {
                path: 'animedetail/:id',
                name: 'AnimeDetail',
                meta: {
                    title: '动漫详情',
                    requireAuth: false,
                    keepAlive: true
                },
                component: () => import ('@/views/animedetail/index.vue'),
                
            }, {
                path: 'animesearch',
                name: 'AnimeSearch',
                meta: {
                    title: '动漫搜索',
                    requireAuth: false,
                    keepAlive: false
                },
                component: () => import ('@/views/animesearch/index.vue')
            }, {
                path: 'animeplay/:id',
                name: 'AnimePlay',
                meta: {
                    title: '动漫播放',
                    requireAuth: false,
                    keepAlive: false
                },
                component: () => import ('@/views/animeplay/index.vue')
            }, {
                path: 'animenew',
                name: 'AnimeNew',
                meta: {
                    title: '新番速看',
                    requireAuth: false,
                    keepAlive: false
                },
                component: () => import ('@/views/animenew/index.vue')
            }, {
                path: 'animebgminfo',
                name: 'AnimeBgmInfo',
                meta: {
                    title: '我的追番',
                    requireAuth: false,
                    keepAlive: false
                },
                component: () => import ('@/views/animebgminfo/index.vue')
            }, {
                path: 'options',
                name: 'Options',
                meta: {
                    title: '设置',
                    requireAuth: false,
                    keepAlive: true
                },
                component: () => import ('@/views/options/index.vue')
            }, {
                path: 'aboutme',
                name: 'Aboutme',
                meta: {
                    title: '关于我',
                    requireAuth: false,
                    keepAlive: true
                },
                component: () => import ('@/views/aboutme/Aboutme.vue')
            },
            {
                path: 'picture',
                name: 'Picture',
                meta: {
                    title: '画廊',
                    requireAuth: false,
                    keepAlive: true
                },
                component: () => import ('@/views/picture/index.vue')
            },
        ]
    },
    {
        path: '/welcome',
        name: 'welcome',
        meta:{
            title: '欢迎~',
        },
        component: () => import ('@/views/newindex/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            requireAuth: false
        },
        component: () => import ('@/views/login/index.vue')
    }, {
        path: '/article/:id',
        name: 'articledetail',
        meta: {
            keepAlive: false
        },
        component: () => import ('@/views/article/index.vue')
    }, {
        path: '/threeshow',
        name: 'threeshow',
        component: () => import ('@/views/threeshow/index.vue')
    }, {
        path: '/play',
        name: 'Player',
        meta: {
            requireAuth: false,
            keepAlive: false
        },
        component: () => import ('@/views/animeplay/components/player.vue')
    }, {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        meta: {
            title: '页面走失啦~',
            requireAuth: false,
            keepAlive: false
        },
        component: () => import ('@/views/404.vue')
    }
]
const router = createRouter({linkExactActiveClass: "router-active", history: createWebHistory(), routes})

router.beforeEach((to, from, next) => {
    const token = getItem("user");
    if (to.meta.title) {
        document.title=`${to.meta.title}-ADK-blog 我的个人小站`
    }
    if (to.meta.requireAuth) {
        if (token) {
            next()
        } else {
            ElMessageBox.confirm('该页面需要登录才能使用，请问是否跳转到登录页面？', '登录提示', {
                confirmButtonText: '确认',
                cancelButtonText: '我不去了',
                type: 'warning'
            }).then(() => {
                next({path: '/login'})
            }).catch(() => {
                return
            })
        }
    } else {
        next()
    }
})
export default router;
