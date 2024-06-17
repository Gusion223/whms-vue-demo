// Backup 相关接口 ----------------------------------------------
import http from "@/utils/http";

export const ApiGetBackupInfo = (index, size, date) => {
    return http.post(
        "/backup/page", {
            pageIndex: index,
            pageSize: size,
            params: {date: date}
        }
    )
}
export const ApiCreateBackup = (user_id, bdesc) => {
    return http.post("/backup/create", {id: user_id, bdesc: bdesc, autoCreate: "N"})
}
export const ApiDeleteBackup = (bid, bfilePath) => {
    return http.post("/backup/delete", {bid: bid, bfilepath: bfilePath})
}
export const ApiRollbackBackup = (bid, bfilepath) => {
    return http.post("/backup/rollback", {bid: bid, bfilepath: bfilepath})
}