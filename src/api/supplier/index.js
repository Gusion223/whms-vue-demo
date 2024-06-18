// Supplier的相关接口 --------------------------------------------
import http from "@/utils/http";

export const ApiListSupplier = () => {
    return http.get("/supplier/list");
}
export const ApiGetSupplier = (index, size, sname) => {
    return http.post(
        "/supplier/page",
        {
            pageIndex: index,
            pageSize: size,
            params: {sname: sname}
        }
    )
}
export const ApiAddSupplier = (sname, saddr, sphone, sdesc) => {
    return http.post(
        "/supplier/add",
        {sname: sname, saddr: saddr, sphone: sphone, sdesc: sdesc}
    )
}
export const ApiUpdateSupplier = (sid, sname, saddr, sphone, sdesc) => {
    return http.post(
        "/supplier/update",
        {sid: sid, sname: sname, saddr: saddr, sphone: sphone, sdesc: sdesc}
    )
}
export const ApiDeleteSupplier= (sid)=>{
    return http.post(
        "/supplier/delete",
        {sid:sid}
    )
}