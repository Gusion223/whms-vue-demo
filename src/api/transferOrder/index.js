import http from "@/utils/http";
import {ApiCommonQuery} from "@/api/serviceApi";

export const ApiAddTransferOrderWithDetail=(id, widPrev, widCur, totime, details)=>{
    return http.post(
        "/transfer-order/addOrderWithDetail",
        {order:{id:id, widPrev:widPrev, widCur:widCur, totime:totime}, list:details}
    )
}

export const ApiGetTransferOrder = (index, size)=>{
    return ApiCommonQuery("/transfer-order/page", {index:index, size:size} )
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
