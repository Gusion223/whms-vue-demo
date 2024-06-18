import {ApiCommonQuery} from "@/api/serviceApi";
import http from "@/utils/http";

export const ApiGetTransferDetail = (index, size)=>{
    return ApiCommonQuery("/transfer-detail/page", index, size)
}

export const ApiAddTransferDetail = (toid, gid, tdamount)=>{
    return http.post("/transfer-detail/add", {toid:toid, gid:gid, tdamount:tdamount})
}

export const ApiUpdateTransferDetail = (toid, gid, tdamount)=>{
    return http.post("/transfer-detail/update", {toid:toid, gid:gid, tdamount:tdamount})
}

export const ApiDeleteTransferDetail = (toid, gid)=>{
    return http.post("/transfer-detail/delete", {toid:toid, gid:gid})
}