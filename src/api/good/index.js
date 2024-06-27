import http from "@/utils/http";

export const ApiListGood=()=>{
    return http.get("/good/list")
}
export const ApiGetGood = (index, size, gname, gtype)=>{
    return http.post(
        "/good/page",
        {
            pageIndex:index,
            pageSize:size,
            params:{
                gname:gname,
                gtype:gtype
            }
        }
    )
}
export const ApiAddGood = (gname, gtype, gunitPrice, gunit)=>{
    return http.post("/good/add", {gname:gname, gtype:gtype, gunitPrice:gunitPrice, gunit:gunit})
}
export const ApiUpdateGood =(gid, gname, gtype, gunitPrice, gunit)=>{
    return http.post("/good/update", {gid:gid, gname:gname, gtype:gtype, gunitPrice:gunitPrice, gunit:gunit})
}
export const ApiDeleteGood =(gid)=>{
    return http.post("/good/delete", {gid:gid})
}