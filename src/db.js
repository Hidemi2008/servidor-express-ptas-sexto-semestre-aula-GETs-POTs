import { readFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const DB_PATH = join(__dirname, 'data.json')

export async function readUsers() {
    try {
        const raw = await readFile(DB_PATH, "utf-8")
        return JSON.parse(raw)

    } catch (err) {
        if (err.code === "ENOENT") return []

        throw err
    }
}

