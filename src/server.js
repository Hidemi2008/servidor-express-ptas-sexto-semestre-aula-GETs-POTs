import app from "./app.js"

import { readProducts, readUsers } from "./db.js"

import dotenv from "dotenv"

dotenv.config()

app.listen(process.env.PORTA, () => {
    console.log("Servidor rodando na Porta " + process.env.PORTA)
})

app.get("/", async (req, res) => {
    res.send("Seja bem vindo !!!")
})

app.get("/users", async (req, res) => {
    const users = await readUsers()

    res.json(users)
})

app.get('/users/:id', async (req, res) => {
    const users = await readUsers()
    const user = users.find(u => u.id === Number(req.params.id))

    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' })
    res.json(user)
})

app.get("/products", async (req, res) => {
    const products = await readProducts()

    res.json(products)
})

app.get("/products/:id", async (req, res) => {
    const products = await readProducts()
    const product = products.find(p => p.id === Number(req.params.id))
    res.json(product)
})  