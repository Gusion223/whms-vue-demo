    // PurchaseOrder相关的接口------------------------------------------
import http from "@/utils/http";
import {ApiCommonQuery} from "@/api/commonApi";

export const ApiAddPurchaseOrderWithDetail = (id, wid, sid, potime, details) => {
    return http.post(
        "/purchase-order/addOrderWithDetail",
        {
            order: {id: id, wid: wid, sid: sid, potime},
            list: details
        }
    )
}

export const ApiGetPurchaseOrder=(index, size, podate, wid, sid, id, poid)=>{
    return ApiCommonQuery("/purchase-order/page-fullInfo", index, size, {poid:poid, podate:podate,wid:wid, sid:sid, id:id})
}

export const ApiAddPurchaseOrder=(id, wid, sid, potime)=>{
    return http.post("/purchase-order/add", {id:id, wid:wid, sid:sid, potime:potime, pototalCost:0})
}
export const ApiUpdatePurchaseOrder=(poid, id, wid, sid, potime)=>{
    return http.post("/purchase-order/update", {poid:poid, id:id, wid:wid, sid:sid, potime:potime, pototalCost:null})
}
export const ApiDeletePurchaseOrder=(poid)=>{
    return http.post("/purchase-order/delete", {poid:poid})
}