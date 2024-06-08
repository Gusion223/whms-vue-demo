import axios from 'axios'
// import { ElMessageBox } from 'element-plus'

const instance = axios.create({
  baseURL:"http://192.168.1.107:8090",
  timeout:5000
})

// 请求拦截
instance.interceptors.request.use(
    (config)=>{
      return config
  },
  (err)=>{
      // 错误处理
      return Promise.reject(err);
  }
)
// 响应拦截
instance.interceptors.response.use(
  (res)=>{
    return res;
  },
  (err)=>{
    if(err.response.status){
      switch(err.response.status){
        case 400:
          // 处理错误信息，例如抛出错误信息提示，或者跳转页面等处理方式。
            err.message = "错误请求";
            break;
          case 401:
            err.message = "未授权，请重新登录";
            break;
          case 403:
            err.message = "拒绝访问";
            break;
          case 404:
            err.message = "请求错误,未找到该资源!!!!";
            alert(err.message)
            break;
          case 405:
            err.message = "请求方法未允许";
            break;
          case 408:
            err.message = "请求超时";
            break;
          case 500:
            err.message = "服务器端出错";
            break;
          case 501:
            err.message = "网络未实现";
            break;
          case 502:
            err.message = "网络错误";
            break;
          case 503:
            err.message = "服务不可用";
            break;
          case 504:
            err.message = "网络超时";
            break;
          case 505:
            err.message = "http版本不支持该请求";
            break;
          default:
            err.message = `连接错误${err.response.status}`;
      }
    }
    return Promise.reject(err)
  }
)

export default instance