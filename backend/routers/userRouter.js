const express = require("express")
const router = express.Router()

// get post put delete

router.get("/1",(req,res)=>{
    res.json({menssagem:"METODO: GET"})
});

router.post("/:id",(req,res)=>{
    const body = req.body
    const {id} = req.params
    res.json({body, id})
});

router.put("/",(req,res)=>{
    res.json({menssagem:"METODO: PUT"})
});

router.delete("/",(req,res)=>{
    res.json({menssagem:"METODO: DELETE"})
});

module.exports = router