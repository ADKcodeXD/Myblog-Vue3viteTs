import { getItem } from './../utils/storage';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import NProgress from 'nprogress';
import '@/assets/styles/myNprogress.css';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Layout',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '',
        name: 'IndexPage',
        meta: {
          title: '首页',
          requireAuth: false,
          keepAlive: false
        },
        component: () => import('@/views/index/index.vue')
      },
      {
        path: 'edit',
        name: 'Edit',
        meta: {
          title: '写文章',
          requireAuth: true,
          keepAlive: false
        },
        component: () => import('@/views/edit/EditPage.vue')
      },
      {
        path: 'articlelist',
        name: 'ArticleList',
        meta: {
          title: '文章列表',
          requireAuth: false,
          keepAlive: true
        },
        component: () => import('@/views/articlelist/index.vue')
      },
      {
        path: 'messageboard',
        name: 'MessageBoard',
        meta: {
          title: '留言板',
          keepAlive: true
        },
        component: () => import('@/views/messageboard/index.vue')
      },
      {
        path: 'home',
        name: 'HomeIndex',
        meta: {
          title: '个人信息',
          requireAuth: true,
          keepAlive: true
        },
        component: () => import('@/views/home/HomeIndex.vue')
      },
      {
        path: 'anime',
        name: 'AnimePage',
        meta: {
          title: '动漫',
          requireAuth: false,
          keepAlive: true
        },
        component: () => import('@/views/anime/index.vue')
      },
      {
        path: 'animedetail/:id',
        name: 'AnimeDetail',
        meta: {
          title: '动漫详情',
          requireAuth: false,
          keepAlive: true
        },
        component: () => import('@/views/animedetail/index.vue')
      },
      {
        path: 'animesearch',
        name: 'AnimeSearch',
        meta: {
          title: '动漫搜索',
          requireAuth: false,
          keepAlive: false
        },
        component: () => import('@/views/animesearch/AnimeSearch.vue')
      },
      {
        path: 'animeplay/:id',
        name: 'AnimePlay',
        meta: {
          title: '动漫播放',
          requireAuth: false,
          keepAlive: false
        },
        component: () => import('@/views/animeplay/index.vue')
      },
      {
        path: 'animenew',
        name: 'AnimeNew',
        meta: {
          title: '新番速看',
          requireAuth: false,
          keepAlive: false
        },
        component: () => import('@/views/animenew/AnimeNew.vue')
      },
      {
        path: 'animebgminfo',
        name: 'AnimeBgmInfo',
        meta: {
          title: '我的追番',
          requireAuth: false,
          keepAlive: false
        },
        component: () => import('@/views/animebgminfo/AnimeBgmInfo.vue')
      },
      {
        path: 'options',
        name: 'OptionsPage',
        meta: {
          title: '设置',
          requireAuth: false,
          keepAlive: true
        },
        component: () => import('@/views/options/index.vue')
      },
      {
        path: 'aboutme',
        name: 'AboutMe',
        meta: {
          title: '关于我',
          requireAuth: false,
          keepAlive: true
        },
        component: () => import('@/views/AboutMe/AboutMePage.vue')
      },
      {
        path: 'create',
        name: 'Create',
        meta: {
          title: '创作中心',
          requireAuth: true,
          keepAlive: false
        },
        component: () => import('@/views/create/Create.vue')
      },
      {
        path: 'picture',
        name: 'Picture',
        meta: {
          title: '画廊',
          requireAuth: false,
          keepAlive: true
        },
        component: () => import('@/views/picture/Picture.vue')
      },
      {
        path: 'friendslink',
        name: 'FriendsLink',
        meta: {
          title: '友情链接',
          requireAuth: false,
          keepAlive: false
        },
        component: () => import('@/views/FriendsLink/FriendsLink.vue')
      },
      {
        path: 'updatearticle/:id',
        name: 'UpdateArticle',
        meta: {
          title: '修改文章',
          requireAuth: true,
          keepAlive: false
        },
        component: () => import('@/views/updatearticle/UpdateArticle.vue')
      }
    ]
  },
  {
    path: '/welcome',
    name: 'welcome',
    meta: {
      title: '欢迎~'
    },
    component: () => import('@/views/newindex/NewIndex.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requireAuth: false
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    meta: {
      keepAlive: false
    },
    component: () => import('@/views/article/ArticleDetail.vue')
  },
  {
    path: '/threeshow',
    name: 'threeshow',
    component: () => import('@/views/threeshow/ThreeShow.vue')
  },
  {
    path: '/play',
    name: 'Player',
    meta: {
      requireAuth: false,
      keepAlive: false
    },
    component: () => import('@/views/animeplay/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    meta: {
      title: '页面走失啦~',
      requireAuth: false,
      keepAlive: false
    },
    component: () => import('@/views/404.vue')
  }
];
const router = createRouter({
  linkExactActiveClass: 'router-active',
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = getItem('user');
  if (to.meta.title) {
    document.title = `${to.meta.title}-ADK-blog 我的个人小站`;
  }
  if (to.meta.requireAuth) {
    if (token) {
      NProgress.start();
      next();
    } else {
      ElMessageBox.confirm('该页面需要登录才能使用，请问是否跳转到登录页面？', '登录提示', {
        confirmButtonText: '确认',
        cancelButtonText: '我不去了',
        type: 'warning'
      })
        .then(() => {
          NProgress.start();
          next({ path: '/login' });
        })
        .catch(() => {
          return;
        });
    }
  } else {
    NProgress.start();
    next();
  }
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
