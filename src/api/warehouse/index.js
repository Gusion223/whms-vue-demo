// Warehouse的相关接口-------------------------------------------
import http from "@/utils/http";
import {ApiCommonQuery} from "@/api/serviceApi";

export const ApiListWarehouse = () => {
    return http.get("/warehouse/list")
}

export const ApiGetWarehouse = (index, size)=>{
    return ApiCommonQuery("/warehouse/page", index, size)
}

export const ApiAddWarehouse=(wname, waddr)=>{
    http.post("/warehouse/add", {wname:wname, waddr:waddr})
}

export const ApiUpdateWarehouse = (wid, wname, waddr)=>{
    http.post("/warehouse/update", {wid:wid, wname:wname, waddr:waddr})
}

export const ApiDeleteWarehouse = (wid)=>{
    http.post("/warehouse/delete", {wid:wid})
}