import {ApiCommonQuery} from "@/api/serviceApi";

export const ApiListStoreRecord = (wid)=>{
    return ApiCommonQuery("/store-record/list-fullInfo", null, null, {wid:wid})
}

export const ApiGetStoreRecord = (index, size)=>{
    return ApiCommonQuery("/store-record/page-fullInfo",index, size)
}