import http from "@/utils/http";

export const ApiGetUsers = (index, size)=>{
    return http.post(
        '/user/pageC',{
            pageIndex:index,
            pageSize:size
        }
    )
}


export const ApiGetUserWith = (index, size, nickName, userType) => {
    console.log("API USER PAGEWITH", index, size, nickName, userType)
    return http.post(
        '/user/pageWith',
        {
            pageIndex: index,
            pageSize: size,
            params: {
                nickName: nickName,
                userType: userType
            }
        }
    )
}
export const ApiLogin = (userName, password, userType) => {
    return http.post(
        "/user/login",
        {
            params: {
                userName: userName,
                password: password,
                userType: userType
            }
        }
    )
}
export const ApiAddUser = (userName, nickName, password, sex, age, phone, userType) => {
    return http.post(
        '/user/add',
        {
            userName: userName,
            nickName: nickName,
            password: password,
            sex: sex,
            age: age,
            phone: phone,
            userType: userType
        }
    )
}
export const ApiUpdateUser = (id, nickName, sex, age, phone, userType) => {
    return http.post(
        '/user/update',
        {
            id: id,
            nickName: nickName,
            sex: sex,
            age: age,
            phone: phone,
            userType: userType
        }
    )
}
export const ApiDeleteUser = (id) => {
    return http.post(
        '/user/delete',
        {id: id}
    )
}

export const ApiGetDayPurchaseSale=()=>{
    return http.get("/user/get-dayPurchaseSale")
}

export const ApiGetTotalCostSale=()=>{
    return http.get("/user/get-totalCostSale")
}
