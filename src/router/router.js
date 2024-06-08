import {createRouter, createWebHistory} from "vue-router"

const routes = [
    {
        path:'/',
        name:"login",
        meta:{title:'登录界面'},
        component: ()=> import("@/pages/login.vue")
    },
    {
        path:'/home',
        name:'home',
        meta:{title:'主界面', requireAuth:true},
        component: ()=>import("@/pages/home.vue"),
        children:[
            {
                // 此处路径不用加 '/',运行时会自动加的
                path: ':userInfo',
                name: 'userInfo',
                meta:{title:"用户界面"},
                component: ()=>import("@/pages/home/user-info.vue")
            }
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        name: "no found",
        meta: {title: 404},
        component: ()=>import("@/pages/404.vue")
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

export default router