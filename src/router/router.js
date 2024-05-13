import {createRouter, createWebHistory} from "vue-router"



const routes = [
    {
        path:'/',
        name:'login',
        component: ()=>import(/*webpackChunkName:'login'*/"@/pages/login/whms-basic.vue")
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

export default router