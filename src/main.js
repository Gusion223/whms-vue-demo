import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementPlus, {ElMessage} from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'

// 去除ResizeObserver报错
const debounce = (fn, delay) => {
  let timer
   return (...args) => {
     if (timer) {
       clearTimeout(timer)
     }
     timer = setTimeout(() => {
       fn(...args)
     }, delay)
   }
}
  
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
   constructor(callback) {
     callback = debounce(callback, 200);
     super(callback);
   }
}
///////////////////////

// 配置动态网页名称
// 全局前置守卫：任何页面的访问都要经过这里
// to：要去哪里的路由信息
// from：从哪里来的路由信息
// next：通行的标志
router.beforeEach((to, from, next)=>{
  document.title = to.meta.title ? to.meta.title : '管理平台';  //是否设置了meta.title
  // to.meta 是一个数组（匹配到是路由记录）
  if(to.meta.requireAuth && sessionStorage.getItem("CurrentUser")==null){  //是否需要认证,暂时还没弄到这一步
      // 进入登录界面
      ElMessage({message:"您当前尚未登录,请前往主界面进行登录", type:"info"})
      next("/")
  }else{
      next()
  }
})
///////////////////////////////


const app = createApp(App)
app.use(ElementPlus, {locale:zhCn})
app.provide("$axios", axios)
axios.defaults.baseURL = "http://192.168.1.107:8090"
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router)

app.mount("#app")
