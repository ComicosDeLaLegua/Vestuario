const express = require('express');
const User = express.Router();
const db = require('../config/database')

//Vestuario
User.post("/vestuario", async (req, res, next) => {
    const { nombre , talla , almacen , tags} = req.body

    if (nombre &&talla && almacen && tags) {
        let query = `insert into vestuario(nombre , talla , id_almacen,tags) values("${nombre}" ,"${talla}" , ${almacen} , "${tags}");`
        

        try {
            const rows = await db.query(query)

            return res.status(201).json({ code: 201, message: "Vestuario agregado", AfectedRows: rows["affectedRows"] })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ code: 500, message: "Error en servidor" })
        }



    }
    else {
        res.status(500).json({ code: 500, message: "Campos Incompletos" })
    }
})

User.get("/vestuario/getall", async (req, res, next) => {
    const users = await db.query("SELECT * FROM vestuario")
    res.status(200)
    res.json({ code: 200, message: users })
})

User.get("/vestuario/:name([A-Za-z]+)", async (req, res, next) => {
    const name = req.params.name
    const name2 = name.toLowerCase()

    const user = await db.query(`select * from vestuario where nombre like '%${name2}%'`)
    res.status(200).json({ code: 200, message: user })
})

User.delete("/vestuario/:id([0-9]{1,3})", async (req, res, next) => {

    const id = req.params.id
    

    if (id) {

        let query = `delete from vestuario where id_vestuario = ${id}`
        try {
            const rows = await db.query(query)

            return res.status(201).json({ code: 201, message: "Vestuario borrado", AfectedRows: rows["affectedRows"] })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ code: 500, message: "Error en servidor" })
        }
    }
    else {
        res.status(500).json({ code: 500, message: "Campos Incompletos" })
    }

})


User.put("/vestuario/:id([0-9]{1,3})",async(req,res,next)=>{

    const id = req.params.id
    const {nombre,talla,almacen,tags} = req.body
   
    if (nombre && talla && almacen && id &&tags){
        
        let query = `Update  vestuario set nombre = "${nombre}" , talla = "${talla}",id_almacen = ${almacen} , tags="${tags}" where id_vestuario = ${id}`
        
        try {
            const rows = await db.query(query)

            return res.status(201).json({ code: 201, message: "Vestuario Modificado", AfectedRows: rows["affectedRows"] })
        } catch (errors) {
            console.log(errors)
            return res.status(500).json({ code: 500, message: "Error en servidor" })
        }
    }else{
        
        res.status(500).json({code:500,message:"Campos Incompletos"})
    }
  

} )

User.get("/vestuario/tags/:name([A-Za-z]+)", async (req, res, next) => {
    const name = req.params.name
    const name2 = name.toLowerCase()

    const user = await db.query(`select * from vestuario where tags like '%${name2}%'`)
    res.status(200).json({ code: 200, message: user })
})

User.get("/vestuario/tallas/:name([A-Za-z]+)", async (req, res, next) => {
    const name = req.params.name
    const name2 = name.toLowerCase()

    const user = await db.query(`select * from vestuario where talla like '%${name2}%'`)
    res.status(200).json({ code: 200, message: user })
})
User.get('/vestuario/:id([0-9]{1,9})',async(req,res,next)=>{
    const id = req.params.id
    

    const ComicosVestuario = await db.query("Select * from vestuario where Id_vestuario = ?",[id])
        res.status(200).json({code:200,message:ComicosVestuario})
    })

//Almacen

User.post("/almacen", async (req, res, next) => {
    const { nombre , ubicacion} = req.body

    if (nombre &&ubicacion ) {
        let query = `insert into almacen(nombre , ubicacion ) values("${nombre}" ,"${ubicacion}" );`
        

        try {
            const rows = await db.query(query)

            return res.status(201).json({ code: 201, message: "Almacen agregado", AfectedRows: rows["affectedRows"] })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ code: 500, message: "Error en servidor" })
        }



    }
    else {
        res.status(500).json({ code: 500, message: "Campos Incompletos" })
    }
})

User.get("/almacen/getall", async (req, res, next) => {
    const users = await db.query("SELECT * FROM almacen")
    res.status(200)
    res.json({ code: 200, message: users })
})

User.get("/almacen/:name([A-Za-z]+)", async (req, res, next) => {
    const name = req.params.name
    const name2 = name.toLowerCase()

    const user = await db.query(`select * from almacen where nombre like '%${name2}%'`)
    res.status(200).json({ code: 200, message: user })
})

User.delete("/almacen/:id([0-9]{1,3})", async (req, res, next) => {

    const id = req.params.id
    

    if (id) {

        let query = `delete from almacen where id_almacen = ${id}`
        try {
            const rows = await db.query(query)

            return res.status(201).json({ code: 201, message: "Almacen borrado", AfectedRows: rows["affectedRows"] })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ code: 500, message: "Error en servidor" })
        }
    }
    else {
        res.status(500).json({ code: 500, message: "Campos Incompletos" })
    }

})

User.put("/almacen/:id([0-9]{1,3})",async(req,res,next)=>{

    const id = req.params.id
    const {nombre,ubicacion} = req.body
   
    if (nombre && ubicacion&& id){
        
        let query = `Update  almacen set nombre = "${nombre}" , ubicacion = "${ubicacion}" where id_almacen = ${id}`
        
        try {
            const rows = await db.query(query)

            return res.status(201).json({ code: 201, message: "Almacen Modificado", AfectedRows: rows["affectedRows"] })
        } catch (errors) {
            console.log(errors)
            return res.status(500).json({ code: 500, message: "Error en servidor" })
        }
    }else{
        
        res.status(500).json({code:500,message:"Campos Incompletos"})
    }
  

} )

User.get('/almacen/:id([0-9]{1,9})',async(req,res,next)=>{
    const id = req.params.id
    

    const ComicosVestuario = await db.query("Select * from almacen where Id_almacen = ?",[id])
        res.status(200).json({code:200,message:ComicosVestuario})
    })



//Artistas
User.post("/artista", async (req, res, next) => {
    const { nombre , apellido, contacto} = req.body

    if (nombre &&apellido&&contacto ) {
        let query = `insert into artista(nombres , apellido, num_contacto ) values("${nombre}" ,"${apellido}", "${contacto}" );`
        

        try {
            const rows = await db.query(query)

            return res.status(201).json({ code: 201, message: "Artista agregado", AfectedRows: rows["affectedRows"] })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ code: 500, message: "Error en servidor" })
        }



    }
    else {
        res.status(500).json({ code: 500, message: "Campos Incompletos" })
    }
})

User.get("/artista/getall", async (req, res, next) => {
    const users = await db.query("SELECT * FROM artista")
    res.status(200)
    res.json({ code: 200, message: users })
})

User.get("/artista/:name([A-Za-z]+)", async (req, res, next) => {
    const name = req.params.name
    const name2 = name.toLowerCase()

    const user = await db.query(`select * from artista where nombres like '%${name2}%'`)
    res.status(200).json({ code: 200, message: user })
})

User.delete("/artista/:id([0-9]{1,3})", async (req, res, next) => {

    const id = req.params.id
    

    if (id) {

        let query = `delete from artista where id_artista = ${id}`
        try {
            const rows = await db.query(query)

            return res.status(201).json({ code: 201, message: "Artista borrado", AfectedRows: rows["affectedRows"] })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ code: 500, message: "Error en servidor" })
        }
    }
    else {
        res.status(500).json({ code: 500, message: "Campos Incompletos" })
    }

})

User.put("/artista/:id([0-9]{1,3})",async(req,res,next)=>{

    const id = req.params.id
    const {nombre,apellido, contacto} = req.body
   
    if (nombre && apellido&& id){
        
        let query = `Update  artista set nombres = "${nombre}" , apellido = "${apellido}" , num_contacto = "${contacto}" where id_artista = ${id}`
        
        try {
            const rows = await db.query(query)

            return res.status(201).json({ code: 201, message: "Artista Modificado", AfectedRows: rows["affectedRows"] })
        } catch (errors) {
            console.log(errors)
            return res.status(500).json({ code: 500, message: "Error en servidor" })
        }
    }else{
        
        res.status(500).json({code:500,message:"Campos Incompletos"})
    }
  

} )

User.get('/artista/:id([0-9]{1,9})',async(req,res,next)=>{
    const id = req.params.id
    

    const ComicosVestuario = await db.query("Select * from artista where id_artista = ?",[id])
        res.status(200).json({code:200,message:ComicosVestuario})
    })

//Prestamos

User.post("/prestamos", async (req, res, next) => {
    const {	fechaRegreso ,id_vestuario ,id_artista } = req.body

    if (fechaRegreso && id_vestuario && id_artista ) {
        let query = `insert into prestamos(fechaPrestamo ,	fechaRegreso 	,id_vestuario ,	id_artista ) values(CURRENT_DATE ,	"${fechaRegreso}","${id_vestuario}","${id_artista}" );`
        

        try {
            const rows = await db.query(query)

            return res.status(201).json({ code: 201, message: "Prestamos agregado", AfectedRows: rows["affectedRows"] })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ code: 500, message: "Error en servidor" })
        }



    }
    else {
        res.status(500).json({ code: 500, message: "Campos Incompletos" })
    }
})

User.get("/prestamos/getall", async (req, res, next) => {
    const users = await db.query(`SELECT p.id_prestamos as id_prestamo, DATE_FORMAT(p.fechaPrestamo,"%Y-%m-%d") as Prestamo  , DATE_FORMAT(p.fechaRegreso,"%Y-%m-%d") as Regreso , v.nombre as Nombre_Vestuario , a.nombres as Nombre_artista , a.apellido as Apellido  FROM prestamos p join artista a on p.id_artista = a.id_artista
    join vestuario v on v.id_vestuario = p.id_vestuario`)
    res.status(200)
    res.json({ code: 200, message: users })
})

User.get("/prestamos/:name([A-Za-z]+)", async (req, res, next) => {
    const name = req.params.name
    const name2 = name.toLowerCase()

    const user = await db.query(`select  p.id_prestamos as id_prestamo ,DATE_FORMAT(p.fechaPrestamo,"%Y-%m-%d") as Prestamo ,DATE_FORMAT(p.fechaRegreso,"%Y-%m-%d") as Regreso	 ,a.nombres as Nombre_artista, a.apellido as Apellido , v.nombre as Nombre_Vestuario from prestamos p  join artista a on p.id_artista = a.id_artista
     join vestuario v on v.id_vestuario = p.id_vestuario   where a.nombres like '%${name2}%'`)
    res.status(200).json({ code: 200, message: user })
})

User.delete("/prestamos/:id([0-9]{1,3})", async (req, res, next) => {

    const id = req.params.id
    

    if (id) {

        let query = `delete from prestamos where id_prestamos = ${id}`
        try {
            const rows = await db.query(query)

            return res.status(201).json({ code: 201, message: "prestamos borrado", AfectedRows: rows["affectedRows"] })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ code: 500, message: "Error en servidor" })
        }
    }
    else {
        res.status(500).json({ code: 500, message: "Campos Incompletos" })
    }

})

User.put("/prestamos/:id([0-9]{1,3})",async(req,res,next)=>{

    const id = req.params.id
    const {fechaRegreso 	,id_vestuario ,	id_artista } = req.body
   
    if (fechaRegreso 	&&id_vestuario &&	id_artista &&id ){
        
        let query = `Update  prestamos set fechaRegreso = "${fechaRegreso}" , id_vestuario = "${id_vestuario}" , id_artista = "${id_artista}" where id_prestamos = ${id}`
        
        try {
            const rows = await db.query(query)

            return res.status(201).json({ code: 201, message: "prestamos Modificado", AfectedRows: rows["affectedRows"] })
        } catch (errors) {
            console.log(errors)
            return res.status(500).json({ code: 500, message: "Error en servidor" })
        }
    }else{
        
        res.status(500).json({code:500,message:"Campos Incompletos"})
    }
  

} )

User.get('/prestamos/:id([0-9]{1,9})',async(req,res,next)=>{
    const id = req.params.id
    

    const ComicosVestuario = await db.query(`Select id_prestamos as id_prestamo ,DATE_FORMAT(fechaPrestamo,"%Y-%m-%d") as Prestamo ,DATE_FORMAT(fechaRegreso,"%Y-%m-%d") as Regreso , id_artista , id_vestuario from prestamos where id_prestamos = ?`,[id])
        res.status(200).json({code:200,message:ComicosVestuario})
    })
module.exports = User