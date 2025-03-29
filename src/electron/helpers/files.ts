import db from "../db/db.js"

export async function createNewFile(name: string, parentID: number) {
    return db.execute(
        `INSERT INTO files (name, parent) VALUES (?, ?)`,
        [name, parentID]
    )
}