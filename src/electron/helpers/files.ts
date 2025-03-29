import db from "../db/db.js"

export async function createNewFile(name: string, parentID: number) {
    return db.execute(
        `INSERT INTO files (name, parent) VALUES (?, ?)`,
        [name, parentID]
    )
}

export async function saveFile(fileID: number, data: string) {
    return db.execute(
        `UPDATE files SET data = ? WHERE id = ?`,
        [data, fileID]
    )
}

export async function getFileData(fileID: number) {
    return db.execute(
        `SELECT data FROM files WHERE id = ?`,
        [fileID]
    )
}