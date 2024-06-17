// PurchaseOrder相关的接口------------------------------------------
import http from "@/utils/http";

export const ApiAddPurchaseOrderWithDetail = (id, wid, sid, potime, details) => {
    return http.post(
        "/purchase-order/addOrderWithDetail",
        {
            order: {id: id, wid: wid, sid: sid, potime},
            list: details
        }
    )
}