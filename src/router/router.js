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
        meta:
            {
                title:'主界面',
                // requireAuth:true
            },
        component: ()=>import("@/pages/home.vue"),
        children:[
            {
                path:"dashboard",
                name:"dashboard",
                meta:{title: "主控面板"},
                component: ()=>import("@/pages/home/dashboard.vue")
            },
            {
                // 此处路径不用加 '/',运行时会自动加的
                path: 'userInfo',
                name: 'userInfo',
                meta:{title:"用户界面"},
                component: ()=>import("@/pages/home/user-info.vue")
            },
            {
                path:"backupInfo",
                name:"backupInfo",
                meta:{title: "数据库系统备份"},
                component: ()=>import("@/pages/home/backup-info.vue")
            },
            {
                path:"addPurchaseOrder",
                name:"addPurchaseOrder",
                meta:{title:"填写订货信息"},
                component: ()=>import("@/pages/home/add-purchase-order.vue")
            },
            {
                path: ":pathMatch(.*)*",
                redirect:"/404"
            }
        ]
    },
    {
        path: "/debug",
        name: "测试",
        meta:{title: "测试Debug"},
        component: ()=>import("@/pages/debug.vue"),
        children: [
            {
                path:"dForm",
                name:"动态表单",
                meta:{title: "测试动态表单", showFather:false},
                component: ()=>import("@/components/dynamic-form-base.vue")
            },
            {
                path:"tableInDialog",
                name:"tableInDialog",
                meta:{title:"对话框中的表格",  showFather:false},
                component: ()=>import("@/components/table-in-dialog-base.vue")
            },
            {
                path:"lineChart",
                name:"lineChart",
                meta: {title: "折线图", showFather:false},
                component: ()=> import("@/components/line-chart.vue")
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