import {createRouter,createWebHashHistory} from 'vue-router';

const routes =[
    {
        path:'/',
        name:'Layout',
        component: ()=> import ('@/views/Layout.vue'),
        children:[
            {
                path:'',
                name:'index',
                component:()=> import ('@/views/index/index.vue')
            },
            {
                path:'edit',
                name:'edit',
                component:()=> import ('@/views/edit/index.vue')
            },
            {
                path:'articlelist',
                name:'articleList',
                component:()=> import ('@/views/articlelist/index.vue')
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
        component: ()=> import ('@/views/login/index.vue')
    },
    {
        path:'/article/:id',
        name:'articledetail',
        component:()=> import ('@/views/article/index.vue')
    },
]


const router=createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;