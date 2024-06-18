import http from "@/utils/http";
import {ApiCommonQuery} from "@/api/serviceApi";


export const ApiAddSaleOrderWithDetail = (id, wid, cid, sotime, details)=>{
    let data ={
        order:{id:id, wid:wid, cid:cid, sotime:sotime},
        list:details
    }
    return http.post("/sale-order/addOrderWithDetail",data)
}

export const ApiGetSaleOrder = (index, size)=>{
    return ApiCommonQuery("/sale-order/page", index, size)
}

export const ApiAddSaleOrder = (id, wid, cid, sotime)=>{
    return http.post("/sale-order/add", {id:id, wid:wid, cid:cid, sotime:sotime, sototal:0})
}

export const ApiUpdateSaleOrder = (soid, id, wid, cid, sotime, sototal)=>{
    return http.post("/sale-order/update", {soid:soid, id:id, wid:wid, cid:cid, sotime:sotime, sototal:sototal})
}

export const ApiDeleteSaleOrder = (soid)=>{
    return http.post("/sale-order/delete", {soid:soid})
}