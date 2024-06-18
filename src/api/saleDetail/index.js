import {ApiCommonQuery} from "@/api/serviceApi";
import http from "@/utils/http";

export const ApiGetSaleDetail = (index, size)=>{
    return ApiCommonQuery("/sale-detail/page", index, size)
}

export const  ApiAddSaleDetail = (soid, gid, sdamount, sdtotal)=>{
    return http.post("/sale-detail/add", {soid:soid, gid:gid, sdamount:sdamount, sdtotal:sdtotal})
}

export const  ApiUpdateSaleDetail = (soid, gid, sdamount, sdtotal)=>{
    return http.post("/sale-detail/update", {soid:soid, gid:gid, sdamount:sdamount, sdtotal:sdtotal})
}

export const ApiDeleteSaleDetail = (soid, gid)=>{
    return http.post("/sale-detail/update", {soid:soid, gid:gid})
}