import {ApiCommonQuery} from "@/api/serviceApi";

export const ApiListStoreRecord = (wid)=>{
    return ApiCommonQuery("/store-record/list-fullInfo", null, null, {wid:wid})
}