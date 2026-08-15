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
    const { maior } = req.query;
    let users = await readUsers();
    if (maior) {
        users = users.filter((u) => u.idade >= Number(maior));
    }
    res.json(users);
});

app.get('/users/:id', async (req, res) => {
    const users = await readUsers()
    const user = users.find(u => u.id === Number(req.params.id))

    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' })
    res.json(user)
})



app.get("/products/:id", async (req, res) => {
    const products = await readProducts()
    const product = products.find(p => p.id === Number(req.params.id))
    if (!product) {
        return res.status(404).json({
            status: 404,
            message: "Produto não encontrado"
        })
    }
    res.json(product)
}
)

app.get("/products", async (req, res) => {
    let products = await readProducts()
    const { min } = req.query
    if (min) {
        products = products.filter(p => p.preco >= parseFloat(min))
    }
    res.json(products)
})  