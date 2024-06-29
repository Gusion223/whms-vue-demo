import http from "@/utils/http";
import {ApiCommonQuery} from "@/api/commonApi";

export const ApiGetPurchaseDetail=(index, size, poid)=>{
    return ApiCommonQuery("/purchase-detail/page-fullInfo", index, size, {poid:poid})
}

export const ApiAddPurchaseDetail=(poid, gid, pdamount, pdtotalCost)=>{
    return http.post("/purchase-detail/add", {poid:poid, gid:gid, pdamount:pdamount, pdtotalCost:pdtotalCost})
}

export const ApiUpdatePurchaseDetail=(poid, gid, pdamount, pdtotalCost)=>{
    return http.post("/purchase-detail/update", {poid:poid, gid:gid, pdamount:pdamount, pdtotalCost})
}

export const ApiDeletePurchaseDetail=(poid, gid)=>{
    return http.post("/purchase-detial/delete", {poid:poid, gid:gid})
}