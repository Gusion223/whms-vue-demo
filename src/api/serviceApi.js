import http from "../utils/http"

export const ApiCommonQuery=(url, index, size, params)=>{
    return http.post(
        url,
        {
            pageIndex:index,
            pageSize:size,
            parms:params
        }
    )
}


