import {ApiCommonQuery} from "@/api/serviceApi";
import http from "@/utils/http";

export const ApiGetSaleDetail = (index, size, soid)=>{
    return ApiCommonQuery("/sale-detail/page-fullInfo", index, size, {soid:soid})
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