import {createRouter, createWebHistory} from "vue-router"

const routes = [
    {
        path:'/',
        name:"login",
        meta:{title:'登录界面'},
        component: ()=> import("@/pages/Login.vue")
    },
    {
        path:'/home',
        name:'home',
        meta:{title:'主界面'},
        component: ()=>import("@/pages/home/whms-basic.vue")
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

export default router