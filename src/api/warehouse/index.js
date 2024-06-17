// Warehouse的相关接口-------------------------------------------
import http from "@/utils/http";

export const ApiListWarehouse = () => {
    return http.get("/warehouse/list")
}