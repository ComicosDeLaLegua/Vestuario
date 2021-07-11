const express = require("express");
const app = express();


const user = require("./Routes/User")
const admin = require("./Routes/Admin")



const auth = require("./middleware/authentication.js")
const cors = require("./middleware/cors")

app.use(cors)
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.get("/",(req,res,next)=>{
    res.status(200).json({code:200,message:"Vestuario Comicos de la Legua"})
})
app.use("/Admin",admin)
app.use(auth)
app.use("/user",user)


app.listen(process.env.PORT ||4000,()=>{

    console.log("Servidor Corriendo...")
})
