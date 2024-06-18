import {ApiCommonQuery} from "@/api/serviceApi";
import http from "@/utils/http";

export const ApiGetTransferDetail = (index, size, toid)=>{
    return ApiCommonQuery("/transfer-detail/page-fullInfo", index, size, toid)
}

export const ApiAddTransferDetail = (toid, gid, tdamount)=>{
    return http.post("/transfer-detail/add", {toid:toid, gid:gid, tdamount:tdamount})
}

export const ApiUpdateTransferDetail = (toid, gid, tdamount,gname)=>{
    return http.post("/transfer-detail/update", {toid:toid, gid:gid, tdamount:tdamount})
}

export const ApiDeleteTransferDetail = (toid, gid)=>{
    return http.post("/transfer-detail/delete", {toid:toid, gid:gid})
}