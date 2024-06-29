import http from "@/utils/http";
import {ApiCommonQuery} from "@/api/commonApi";

export const ApiAddTransferOrderWithDetail=(id, widPrev, widCur, totime, details)=>{
    return http.post(
        "/transfer-order/addOrderWithDetail",
        {order:{id:id, widPrev:widPrev, widCur:widCur, totime:totime}, list:details}
    )
}

export const ApiGetTransferOrder = (index, size, toid)=>{
    return ApiCommonQuery("/transfer-order/page-fullInfo", index, size, {toid:toid} )
}

export const ApiAddTransferOrder = (id, widPrev, widCur, totime)=>{
    return http.post("/transfer-order/add", {id:id, widPrev:widPrev, widCur:widCur, totime:totime})
}

export const ApiUpdateTransferOrder = (toid, id, widPrev, widCur, totime)=>{
    return http.post("/transfer-order/update", {toid:toid, id:id, widPrev:widPrev, widCur:widCur, totime:totime})
}

export const ApiDeleteTransferOrder = (toid)=>{
    return http.post("/transfer-order/delete", {toid:toid})
}
