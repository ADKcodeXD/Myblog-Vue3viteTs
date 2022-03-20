import { getItem } from './../utils/storage';
import {createRouter,createWebHashHistory, createWebHistory} from 'vue-router';

const routes =[
    {
        path:'/',
        redirect:'/threeshow',
    },
    {
        path:'/index',
        name:'Layout',
        component: ()=> import ('@/views/Layout.vue'),
        children:[
            {
                path:'',
                name:'Index',
                meta:{requireAuth:false,keepAlive:false},
                component:()=> import ('@/views/index/index.vue')
            },
            {
                path:'edit',
                name:'Edit',
                meta:{requireAuth:true,keepAlive:false},
                component:()=> import ('@/views/edit/index.vue')
            },
            {
                path:'articlelist',
                name:'ArticleList',
                meta:{requireAuth:false,keepAlive:true},
                component:()=> import ('@/views/articlelist/index.vue')
            },
            {
                path:'messageboard',
                name:'MessageBoard',
                meta:{keepAlive:true},
                component:()=> import ('@/views/messageboard/index.vue')
            },
            {
                path:'home',
                name:'Home',
                meta:{requireAuth:true,keepAlive:true},
                component:()=> import ('@/views/home/index.vue')
            },
            {
                path:'anime',
                name:'Anime',
                meta:{requireAuth:false,keepAlive:false},
                component:()=> import ('@/views/anime/index.vue')
            },
        ]
    },
    {
        path:'/welcome',
        name:'welcome',
        component: ()=> import ('@/components/WelcomePage.vue')
    },
    {
        path:'/project',
        name:'project',
        component: ()=> import ('@/views/profile/index.vue')
    },
    {
        path:'/login',
        name:'login',
        meta:{requireAuth:false},
        component: ()=> import ('@/views/login/index.vue')
    },
    {
        path:'/article/:id',
        name:'articledetail',
        meta:{keepAlive:false},
        component:()=> import ('@/views/article/index.vue')
    },
    {
        path:'/threeshow',
        name:'threeshow',
        component:()=> import ('@/views/threeshow/index.vue')
    },
]


const router=createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from,next)=> {
    const token=getItem("user")
    if(to.meta.requireAuth){
        if(token){
            next()
        }else{
            next({path:'/login'})
        }
    }else{
       next()
    }
})
export default router;