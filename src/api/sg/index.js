// SG相关接口----------------------------------------------------
import http from "@/utils/http";
import {ApiCommonQuery} from "@/api/commonApi";

export const ApiListSGGood = (sid) => {
    return http.post("/s-g/list-goodInfo", {params: {sid: sid}})
}
export const ApiGetSG = (index, size, sname, gtype) => {
    let params = {sname: sname, gtype:gtype}
    return ApiCommonQuery("/s-g/page-good-supplierInfo", index, size, params)
}
export const ApiAddSG = (sid, gid, gunitCost) => {
    return http.post("/s-g/add", {sid: sid,gid: gid, gunitCost: gunitCost})
}
export const ApiUpdateSG = (sid, gid, gunitCost) => {
    return http.post("/s-g/update", {sid: sid, gid: gid, gunitCost: gunitCost})
}
export const ApiDeleteSG = (sid, gid) => {
    return http.post("/s-g/delete", {sid: sid, gid: gid})
}