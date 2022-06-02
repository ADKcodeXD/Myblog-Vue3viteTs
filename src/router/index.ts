import { getItem } from './../utils/storage';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';

const routes:RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/welcome',
    },
    {
        path: '/index',
        name: 'Layout',
        component: () => import('@/views/Layout.vue'),
        children: [
            {
                path: '',
                name: 'Index',
                meta: { requireAuth: false, keepAlive: false },
                component: () => import('@/views/index/index.vue')
            },
            {
                path: 'edit',
                name: 'Edit',
                meta: { requireAuth: true, keepAlive: false },
                component: () => import('@/views/edit/index.vue')
            },
            {
                path: 'articlelist',
                name: 'ArticleList',
                meta: { requireAuth: false, keepAlive: true },
                component: () => import('@/views/articlelist/index.vue')
            },
            {
                path: 'messageboard',
                name: 'MessageBoard',
                meta: { keepAlive: true },
                component: () => import('@/views/messageboard/index.vue')
            },
            {
                path: 'home',
                name: 'Home',
                meta: { requireAuth: true, keepAlive: true },
                component: () => import('@/views/home/index.vue')
            },
            {
                path: 'anime',
                name: 'Anime',
                meta: { requireAuth: false, keepAlive: true },
                component: () => import('@/views/anime/index.vue'),
            },
            {
                path: 'animedetail/:id',
                name: 'AnimeDetail',
                meta: { requireAuth: false, keepAlive: false },
                component: () => import('@/views/animedetail/index.vue')
            },
            {
                path: 'animesearch',
                name: 'AnimeSearch',
                meta: { requireAuth: false, keepAlive: false },
                component: () => import('@/views/animesearch/index.vue')
            },
            {
                path: 'animeplay/:id',
                name: 'AnimePlay',
                meta: { requireAuth: false, keepAlive: false },
                component: () => import('@/views/animeplay/index.vue')
            },
            {
                path: 'animenew',
                name: 'AnimeNew',
                meta: { requireAuth: false, keepAlive: false },
                component: () => import('@/views/animenew/index.vue')
            },
            {
                path: 'animebgminfo',
                name: 'AnimeBgmInfo',
                meta: { requireAuth: false, keepAlive: false },
                component: () => import('@/views/animebgminfo/index.vue')
            },
        ]
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/newindex/index.vue')
    },
    // {
    //     path: '/project',
    //     name: 'project',
    //     component: () => import('@/views/profile/index.vue')
    // },
    {
        path: '/login',
        name: 'login',
        meta: { requireAuth: false },
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/article/:id',
        name: 'articledetail',
        meta: { keepAlive: false },
        component: () => import('@/views/article/index.vue')
    },
    {
        path: '/threeshow',
        name: 'threeshow',
        component: () => import('@/views/threeshow/index.vue')
    },
    {
        path: '/play',
        name: 'Player',
        meta: { requireAuth: false, keepAlive: false },
        component: () => import('@/views/animeplay/components/player.vue')
    },
]


const router = createRouter({
    linkExactActiveClass:"router-active", 
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = getItem("user")
    if (to.meta.requireAuth) {
        if (token) {
            next()
        } else {
            ElMessageBox.confirm(
                '该页面需要登录才能使用，请问是否跳转到登录页面？',
                '登录提示',
                {
                  confirmButtonText: '确认',
                  cancelButtonText: '我不去了',
                  type: 'warning',
                }
              )
                .then(() => {
                    next({ path: '/login' })
                })
                .catch(() => {
                  return
                })
        }
    } else {
        next()
    }
})
export default router;