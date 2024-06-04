var express = require('express');
var router = express.Router();

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient({errorFormat: "minimal"});

const {exceptionHandler} = require('../utils/handlers');

// LISTAR TODOS OS INGRESSOS
router.get('/', async (req, res) =>{
    try {
        const ingressos = await prisma.ingresso.findMany()
        res.json({ingressos});

    } catch (exception) {
        exceptionHandler(exception, res);
    }
});

// POST
router.post('/', async (req, res)=>{
    const data = req.body
    try {
        const ingresso = await prisma.ingresso.create({
            data: data,
        });
        res.status(201).json(ingresso);

    } catch (exception) {
        exceptionHandler(exception, res);
    }
});

router.get('/:id', async (req, res) =>{
    try {
        const id = Number(req.params.id);
        const ingresso = await prisma.ingresso.findFirstOrThrow({
            where:{
                id: id
            }
        });
        res.json(ingresso)
    } catch (exception) {
        exceptionHandler(exception, res);
    }
});

router.patch('/:id', async (req, res) =>{
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const ingresso = await prisma.ingresso.update({
            where:{
                id:id
            },
            data: data
        });
        res.json(ingresso);
    } catch (exception) {
        exceptionHandler(exception, res)
    }
});

router.delete('/:id', async (req, res)=>{
    try {
        const id = Number(req.params.id);
        const ingresso = await prisma.ingresso.delete({
            where:{
                id:id
            }
        });
        res.status(204).end();
    } catch (exception) {
        exceptionHandler(exception, res);
    }
});

// POST INGRESSO/COMPRA/:INGRESSO_ID/:USER_ID - REGISTRAR COMPRA DE INGRESSO
router.post('/compra/:ingresso_id/:user_id', async (req, res)=>{
    try {
        const ingressoId= Number(req.params.ingresso_id);
        const userId= Number(req.params.user_id);

        const data = req.body;

        const ingresso = await prisma.preco.findUniqueOrThrow({
            where:{id: ingressoId}
        });
        const user = await prisma.usuario.findUniqueOrThrow({
            where:{id: userId}
        });
        const compraIngresso = await prisma.ingresso.create({
            data:{
                ...data,
                id_ingresso_tipo: ingresso.id,
                cliente_id: user.id
            }
        });
        res.status(201).json(compraIngresso)
    } catch (exception) {
        exceptionHandler(exception, res);
    }
});

// RES ROTAS NÃO EXISTENTES
router.all('*', (req, res)=>{
    res.status(501).end();
});

module.exports = router