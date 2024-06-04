const express = require("express")
const cors = require("cors")
const userRouter = require("./routers/userRouter.js")
const ingressoRouter = require("./routers/ingresso.js")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json({menssagem:"qualquer coisa"})
});

app.use("/user", userRouter)

app.use("/ingresso", ingressoRouter )

app.listen(3000,()=>{
    console.log("servidor rodando em http://localhost:3000")
});