import http from "@/utils/http";

export const ApiAddTransferOrderWithDetail=(id, widPrev, widCur, totime, details)=>{
    return http.post(
        "/transfer-order/addOrderWithDetail",
        {order:{id:id, widPrev:widPrev, widCur:widCur, totime:totime}, list:details}
    )
}