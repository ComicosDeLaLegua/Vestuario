const express = require('express');
const Admin = express.Router();
const db = require('../config/database')
const jwt = require('jsonwebtoken');



Admin.post("/login",async(req,res,next)=>{

    const {username,password} = req.body
    const query = `Select * from User where username = '${username}' and password = MD5('${password}');`
    const rows = await db.query(query)


if(username&&password){
if(rows.length == 1){
    const token = jwt.sign({
        id : rows[0].ID,
        username: rows[0].username
    }, 'ComicosLegua')
    return res.status(200).json({code:200,message:token})
}
else{

    return res.status(200).json({code:401,message:'Datos incorrectos'})
}

}
return res.status(500).json({code:500,message:'Campos Incompletos'})
})



Admin.get("/",async(req,res,next)=>{

    let query = `Select * from User`
   const rows = await db.query(query);

   
    return res.status(200).json({code:200,message:rows})

})


Admin.post("/newAdmin",async(req,res,next)=>{

    const {username,password} = req.body
    

    let query = `insert into user(Username,password)Values('${username}', MD5('${password}'))`
   
   
   
    

   try {
    const rows = await db.query(query);
    return res.status(200).json({code:200,message:"Admin Agregado Correctamente"})
   } catch (error) {
       console.log(error)
    return res.status(500).json({code:200,message:"Error en servidor "})
   }

    

})
module.exports = Admin