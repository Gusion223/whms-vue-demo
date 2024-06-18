import http from "@/utils/http";


export const ApiAddSaleOrderWithDetail = (id, wid, cid, sotime, details)=>{
    let data ={
        order:{id:id, wid:wid, cid:cid, sotime:sotime},
        list:details
    }
    return http.post("/sale-order/addOrderWithDetail",data)
}
