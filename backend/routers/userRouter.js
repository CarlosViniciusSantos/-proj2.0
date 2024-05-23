const express = require("express")
const router = express.Router()
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

// get post put delete

router.get("/",async (req,res)=>{

    const users = await prisma.usuario.findMany()
    res.json({menssagem:"usuarios listados com sucesso", users})
});
router.get("/:id",async (req,res)=>{
    const {id} = req.params
    const user = await prisma.usuario.findUnique({ 
        where:{
            id:+id

        }
    })
    res.json({menssagem:"usuarios listados com sucesso", user})
});

router.post("/",async (req,res)=>{
    const body = req.body
    
    const user = await prisma.usuario.create({
        data: body
    })
    res.json({menssagem: "usuario criado com sucesso", user})
});

router.put("/:id", async(req,res)=>{
    const {id} = req.params
    const data = req.body
    const user = await prisma.usuario.update({ 
        where:{
            id:+id

        },
        data
    })
    res.json({menssagem:"usuarios atualizado com sucesso", user})
});

router.delete("/:id",async(req,res)=>{
    const {id} = req.params
    const user = await prisma.usuario.delete({ 
        where:{
            id:+id

        }
    })
    res.json({menssagem:"usuario deletado com sucesso", user})
});

module.exports = router