const express = require("express")
const router = express.Router()

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

const { generateAccessToken, authenticateToken } = require('../utils/auth')
const { exceptionHandler } = require('../utils/handlers');
// get post put delete

router.get("/", async (req, res) => {

    const users = await prisma.usuario.findMany()
    res.json({ menssagem: "usuarios listados com sucesso", users })
});

router.get("/:id", async (req, res) => {
    const { id } = req.params
    const user = await prisma.usuario.findUnique({
        where: {
            id: +id,
        }
    })
    res.json({ menssagem: "usuarios listados com sucesso", user })
});

router.post("/", async (req, res) => {
    const data = req.body
    if (!data.senha || data.senha.length < 8) {
        return res.status(400).json({
            error: "A senha é obrigatória e deve conter no minimo 8 caracteres"
        });
    }
    data.senha = await bcrypt.hash(data.senha, 10)
    try {
        const user = await prisma.usuario.create({
            data: data,
            select: {
                id: true,
                nome_completo: true,
                email: true,
                usuario: true,
                telefone: true
            }
        });
        const jwt = generateAccessToken(user);
        user.accessToken = jwt
        res.json({ menssagem: "usuario criado com sucesso", user })
    } catch (exception) {
        exceptionHandler(exception, res);
    }

});

router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = req.body
        console.log(data, "arroz")
        const token = req.acessToken

        const checkUser = await prisma.usuario.findUnique({
            where: {
                id: id,
                email: token.email
            }
        });

        if (checkUser === null || id !== token.id) {
            return res.sendStatus(403);
        }

        if ('password' in data) {
            if (data.password.length < 8) {
                return res.status(400).json({
                    error: "A senha deve conter no minimo 8 caracteres"
                });
            }
            data.password = await bcrypt.hash(data.password, 10)
        }
        data.id = +id
        const user = await prisma.usuario.update({
            where: {
                id: +id
            },
            data: data,
            select: {
                id: true,
                usuario: true,
                nome_completo: true,
                email: true,
                cpf: true,
                telefone: true
            }
        })
        const jwt = generateAccessToken(user);
        user.accessToken = jwt
        res.json({ menssagem: "usuarios atualizado com sucesso", user })
    } catch (exception) {
        exceptionHandler(exception, res);
    }
});

router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);

    const user = await prisma.usuario.delete({
        where: {
            id: +id

        }
    });
    res.json({ menssagem: "usuario deletado com sucesso", user })
});

router.post('/login', async (req, res) => {
    try {
        const data = req.body;
        if (!'password' in data || !'email' in data) {
            return res.status(401).json({
                error: "usuário e senha são obrigatórios"
            });
        }
        const user = await prisma.usuario.findUniqueOrThrow({
            where: {
                email: data.email
            }
        });

        const passwordCheck = await bcrypt.compare(data.senha, user.senha);
        if (!passwordCheck) {
            return res.status(401).json({
                error: "usuário e/ou senha incorreto(s)"
            });
        }
        delete user.senha;
        const jwt = generateAccessToken(user);
        user.accessToken = jwt;
        res.json(user);

    } catch (exception) {
        let error = exceptionHandler(exception);
        res.status(error.code).json({
            error: error.message,
        });
    }
})

router.put("/:id/adm", async (req, res) => {
    const { id } = req.params
    const data = req.body
    data.id = +id
    const user = await prisma.usuario.update({
        where: {
            id: +id
        },
        data
    })
    res.json({ menssagem: "usuarios atualizado com sucesso", user })
});

router.get('/ingresso/:IDUsuario', async (req, res) => {
    try {


        const IDUsuario = Number(req.params.IDUsuario);
        console.log('ID do usuário:', IDUsuario);


        const pedidosUsuario = await prisma.ingresso.findMany({
            where: {
                cliente_id: {
                    equals: IDUsuario
                }
            },
        include: {
            usuario: true,
        },
            });


        console.log('Pedidos encontrados:', pedidosUsuario);


        res.json(pedidosUsuario);


    } catch (exception) {
        console.error('Erro ao buscar pedidos:', exception);
        exceptionHandler(exception, res);
    }
});


module.exports = router