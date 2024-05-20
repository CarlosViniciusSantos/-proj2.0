// api_simples.js
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()
app.use(express.json())

const usuarios = {}

app.get('/', (req, res) => {
    res.json({ msg: "API simples com Express!" })
})

app.post('/usuarios', (req, res) => {
    const usuario = req.body
    const idusuario = uuidv4()
    usuario.id = idusuario
    usuarios[idusuario] = usuario
    res.json({ msg: "usuario adicionado com sucesso!" })
})

app.get('/usuarios', (req, res) => {
    res.json({ usuarios: Object.values(usuarios) })
})

app.listen(8000, () => {
    console.log('Servidor pronto na porta 8000')
})

app.get('/usuarios/:id', (req, res) => {
    res.json({ usuario: usuarios[req.params.id] })
})

app.delete('/usuarios', (req, res) => {
    const id = req.query.id
    if (id && usuarios[id]) {
        delete usuarios[id]
        res.json({ msg: "usuario deletado com sucesso!" })
    } else {
        res.status(400).json({ msg: "usuario não encontrado!" })
    }
})

app.put('/usuarios', (req, res) => {
    const id = req.query.id
    if (id && usuarios[id]) {
        const usuario = req.body
        usuario.id = id
        usuarios[id] = usuario
        res.json({ msg: "usuario atualizado com sucesso!" })
    } else {
        res.status(400).json({ msg: "usuario não encontrado!" })
    }
})