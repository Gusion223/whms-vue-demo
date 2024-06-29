import http from "@/utils/http";
import {ApiCommonQuery} from "@/api/commonApi";

export const ApiGetCustomer = (index, size, cname)=>{
    let params={cname:cname}
    return ApiCommonQuery("/customer/page", index, size, params)
}
export const ApiAddCustomer = (cname, csex, cage, caddr, cphone)=>{
    return http.post("/customer/add", {cname:cname, csex:csex, cage:cage, caddr:caddr,cphone:cphone})
}

export const ApiUpdateCustomer =(cid, cname, csex, cage, caddr, cphone)=>{
    return http.post("/customer/update", {cid:cid, cname:cname, csex:csex, cage:cage, caddr:caddr, cphone:cphone})
}

export const ApiDeleteCustomer=(cid)=>{
    return http.post("/customer/delete", {cid:cid});
}

export const ApiListCustomer=()=>{
    return http.get("/customer/list")
}