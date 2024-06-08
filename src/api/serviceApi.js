import http from "../utils/http"

export const ApiGetUsers = (index, size)=>{
  return http.post(
    '/user/pageC',{
      "pageIndex":index,
      "pageSize":size
    }
  )
}

export const ApiLogin = (userName, password, userType) => {
    return http.post(
        "/user/login",
        {
            params:{
                userName:userName,
                password:password,
                userType:userType
            }
        }
    )
}