import { getItem } from './../utils/storage';
import { useStore } from '@/store/main';
import {createRouter,createWebHashHistory, createWebHistory} from 'vue-router';

const routes =[
    {
        path:'/',
        name:'Layout',
        component: ()=> import ('@/views/Layout.vue'),
        children:[
            {
                path:'',
                name:'index',
                meta:{requireAuth:false},
                component:()=> import ('@/views/index/index.vue')
            },
            {
                path:'edit',
                name:'edit',
                meta:{requireAuth:true},
                component:()=> import ('@/views/edit/index.vue')
            },
            {
                path:'articlelist',
                name:'articleList',
                meta:{requireAuth:false},
                component:()=> import ('@/views/articlelist/index.vue')
            },
            {
                path:'messageboard',
                name:'messageboard',
                component:()=> import ('@/views/messageboard/index.vue')
            },
            {
                path:'home',
                name:'home',
                meta:{requireAuth:true},
                component:()=> import ('@/views/home/index.vue')
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
        component:()=> import ('@/views/article/index.vue')
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