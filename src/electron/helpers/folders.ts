import db from "../db/db.js";

export async function getFoldersInFolder(parentID: number | null) {
    if(parentID === null) {
        return db.execute(`SELECT id, name FROM folders WHERE parent IS NULL`)
    }
    return db.execute(
        `SELECT id, name FROM folders WHERE parent = ?`,
        [parentID]
    )
}

export async function getFilesInFolder(parentID: number | null) {
    if(parentID === null) {
        return db.execute(`SELECT id, name FROM files WHERE parent IS NULL`)
    }
    return db.execute(
        `SELECT id, name FROM files WHERE parent = ?`,
        [parentID]
    )
}

export async function createNewFolder(name: string, parentID: number) {
    return db.execute(
        `INSERT INTO folders (name, parent) VALUES (?, ?)`,
        [name, parentID]
    )
}

export async function deleteFolder(folderID: number) {
    return db.execute(
        `DELETE FROM folders WHERE id = ?`,
        [folderID]
    )
}

export async function renameFolder(folderID: number, newName: string) {
    return db.execute(
        `UPDATE folders SET name = ? WHERE id = ?`,
        [newName, folderID]
    )
}
