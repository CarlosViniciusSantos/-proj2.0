const express = require("express")
const cors = require("cors")
const userRouter = require("./routers/userRouter.js")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json({menssagem:"qualquer coisa"})
});

// app.get("/users",(req,res) =>{
//     res.json({menssagem:"users"})
// });

// app.post("/users",(req,res) =>{
//     res.json({menssagem:"users POST"})
// });

app.use("/user", userRouter)

app.listen(3000,()=>{
    console.log("servidor rodando em http://localhost:3000")
});