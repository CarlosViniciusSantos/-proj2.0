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

router.put('/:id', async (req, res) =>{
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

router.get('/codigo/:codigo', async (req, res) => {
    try {
        const codigo = Number(req.params.codigo);

        if (isNaN(codigo)) {
            return res.status(400).json({ error: 'Invalid code' });
        }


        const existe = await prisma.ingresso.findFirst({
            where: { codigo: codigo },
            
            select:{
                id_ingresso_tipo: true
            }
           
        });

        if (existe) {
            res.json({
                exists: true,
               ...existe
             });
            
        } else {
            res.json({ exists: false });
        }
    } catch (exception) {
        exceptionHandler(exception, res);
    }
});

// Rota PATCH para atualizar a data de acesso
router.patch('/atualizarData', async (req, res) => {
    try {
      const { codigoIngresso } = req.body;
  
  
      // Verifique se o ingresso existe no banco de dados
      const ingresso = await prisma.ingresso.findFirst({
        where: {
          codigo: codigoIngresso,
        },
      });
      
      // Se não encontrarmos o ingresso, retorne um erro
      if (!ingresso) {
        return res.status(404).json({ error: 'Ingresso não encontrado' });
      }
      const user = await prisma.usuario.findUnique({
        where:{
            id: ingresso.cliente_id
        }
      })
  
      // Verifique se a data de acesso já foi registrada
      if (ingresso.data_utilizacao) {
        return res.status(400).json({ error: 'Este ingresso já foi utilizado', ingresso:{...ingresso,userName: user.nome_completo} });
      }

      let date = new Date();
      date.setHours(date.getHours()- 3)

      // Atualize a data de acesso para a data atual
      await prisma.ingresso.update({
        where: {           
          id: ingresso.id,
        },
        data: {
          data_utilizacao: date,
        },
      });
  
      // Envie uma resposta de sucesso
      res.status(200).json({ message: 'Data de acesso atualizada com sucesso', ingresso:{...ingresso,userName: user.nome_completo} });
    } catch (error) {
      console.error('Erro ao atualizar data de acesso:', error);
      res.status(500).json({ error: 'Erro ao processar a solicitação' });
    }
  });
  
  


// RES ROTAS NÃO EXISTENTES
router.all('*', (req, res)=>{
    res.status(501).end();
});

module.exports = router