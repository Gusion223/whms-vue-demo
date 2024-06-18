import {ApiCommonQuery} from "@/api/serviceApi";

export const ApiListStoreRecord = (wid, gname, gtype)=>{
    return ApiCommonQuery("/store-record/list-fullInfo", null, null, {wid:wid, gname:gname, gtype:gtype})
}

export const ApiGetStoreRecord = (index, size, wid, gname, gtype)=>{
    return ApiCommonQuery("/store-record/page-fullInfo",index, size, {wid:wid, gname:gname, gtype:gtype})
}