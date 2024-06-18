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
                path:"addTransferOrder",
                name:"addTransferOrder",
                meta:{title:"填写转仓信息"},
                component: ()=>import("@/pages/home/add-transfer-order.vue")
            },
            {
                path:"addSaleOrder",
                name:"addSaleOrder",
                meta:{title:"填写销售信息"},
                component: ()=>import("@/pages/home/add-sale-order.vue")
            },
            {
                path:"goodInfo",
                name:"goodInfo",
                meta:{title: "商品信息界面"},
                component:()=>import("@/pages/home/good-info.vue")
            },
            {
                path:"s_gInfo",
                name:"s_gInfo",
                meta: {title: "供货条目界面"},
                component:()=>import("@/pages/home/s_g-info.vue")
            },
            {
                path:"supplierInfo",
                name:"supplierInfo",
                meta:{title: "供货商信息界面"},
                component:()=>import("@/pages/home/supplier-info.vue")
            },
            {
                path: "purchaseOrder",
                name: "purchaseOrder",
                meta:{title: "入库记录总则"},
                component:()=>import("@/pages/home/purchase_order.vue")
            },
            {
                path: "purchaseDetail",
                name:"purchaseDetail",
                meta: {title: "入库记录细则"},
                component:()=>import("@/pages/home/purchase_detail.vue")
            },
            {
                path: "transferOrder",
                name:"transferOrder",
                meta: {title: "转储记录总则"},
                component:()=>import("@/pages/home/transfer_order.vue")
            },
            {
                path: "transferDetail",
                name: "transferDetail",
                meta: {title: "转储记录细则"},
                component:()=>import("@/pages/home/transfer_detail.vue")

            },
            {
                path: "warehouse"  ,
                name: "warehouse",
                meta: {title: "仓库信息"},
                component:()=>import("@/pages/home/warehouse.vue")
            },
            {
                path: "saleOrder",
                name: "saleOrder",
                meta: {title: "销售记录"},
                component:()=>import("@/pages/home/sale_order.vue")
            },
            {
                path: "saleDetail",
                name: "saleDetail",
                meta: {title: "销售细则"},
                component:()=>import("@/pages/home/sale_detail.vue")
            },
            {
                path: "storeRecord",
                name:"storeRecord",
                meta: {title: "仓库存储清单"},
                component:()=>import("@/pages/home/storeRecord.vue")
            },
            {
                path:"customerInfo",
                name:"customerInfo",
                meta:{title: "顾客信息管理"},
                component: ()=>import("@/pages/home/customer-info.vue")
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
                component: ()=>import("@/template/dynamic-form-base.vue")
            },
            {
                path:"tableInDialog",
                name:"tableInDialog",
                meta:{title:"对话框中的表格",  showFather:false},
                component: ()=>import("@/template/table-in-dialog-base.vue")
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