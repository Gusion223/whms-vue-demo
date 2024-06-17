import http from "../utils/http"

// User的相关接口
export const ApiGetUsers = (index, size)=>{
  return http.post(
    '/user/pageC',{
      pageIndex:index,
      pageSize:size
    }
  )
}
export const ApiGetUserWith = (index, size, nickName, userType)=>{
    console.log("API USER PAGEWITH", index, size, nickName, userType)
    return http.post(
        '/user/pageWith',
        {
            pageIndex:index,
            pageSize:size,
            params:{
                nickName:nickName,
                userType:userType
            }
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
export const ApiAddUser = (userName, nickName, password, sex, age, phone, userType) =>{
    return http.post(
        '/user/add',
        {
            userName:userName,
            nickName:nickName,
            password:password,
            sex:sex,
            age:age,
            phone:phone,
            userType:userType
        }
    )
}
export const ApiUpdateUser = (id, nickName, sex, age, phone, userType) =>{
    return http.post(
        '/user/update',
        {
            id:id,
            nickName:nickName,
            sex:sex,
            age:age,
            phone:phone,
            userType:userType
        }
    )
}
export const ApiDeleteUser = (id) =>{
    return  http.post(
    '/user/delete',
    {id:id}
    )
}

// Backup 相关接口
export const ApiGetBackupInfo = (index, size, date)=>{
    return http.post(
        "/backup/page",{
            pageIndex:index,
            pageSize:size,
            params:{date:date}
        }
    )
}

export const ApiCreateBackup = (user_id, bdesc)=>{
    return http.post("/backup/create", {id:user_id, bdesc:bdesc, autoCreate:"N"})
}
export const ApiDeleteBackup = (bid, bfilePath)=>{
    return http.post("/backup/delete", {bid:bid, bfilepath:bfilePath})
}

export const ApiRollbackBackup = (bid, bfilepath)=>{
    return http.post("/backup/rollback", {bid:bid, bfilepath:bfilepath})
}

// Good的相关接口
export const ApiGetGood = (index, size, gname, gtype)=>{
    return http.post(
        "/good/page",
        {
            pageIndex:index,
            pageSize:size,
            params:{
                gname:gname,
                gtype:gtype
            }
        }
    )
}
// Supplier的相关接口
export const ApiListSupplier = ()=>{
    return http.get("/supplier/list");
}
// Warehouse的相关接口
export const ApiListWarehouse=()=>{
    return http.get("/warehouse/list")
}
// SG相关接口
export const ApiListSGGOOD = (sid)=>{
    return http.post("/s-g/list-goodInfo", {params:{sid:sid}})
}
// PurchaseOrder相关的接口
export const ApiAddPurchaseOrderWithDetail = (id, wid, sid, potime, details)=>{
    return http.post(
        "/purchase-order/addOrderWithDetail",
        {
            order:{id:id, wid:wid, sid:sid, potime},
            list:details
        }
    )
}