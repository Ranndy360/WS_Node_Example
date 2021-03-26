const express = require('express');
const router = express.Router();
//modelo
const Mascota = require('../models/mascota');

router.get('/',(req,resp)=>{
    resp.render("index",{titulo:"Ranndy360"});
});
router.get('/servicios',(req,resp)=>{
    resp.render("./servicios/servicios",{titulo:"Ranndy360"});
});
//VER LISTA
router.get('/mascotas', async (req,resp)=>{

    try {
        const arrayMascota = await Mascota.find();
        resp.render("./servicios/mascotas",{mascotas:arrayMascota});
    } catch (error) {
        console.log(error);
    }

});
router.get('/mascotas/crear', (req,resp)=>{
    resp.render('./servicios/crear');
});
//CREAR
router.post('/mascotas/crear', async(req,resp)=>{
    const body = req.body;
    try {
        const mascotaDB = new Mascota(body);
        await mascotaDB.save();
        resp.redirect('/api/mascotas');
    } catch (error) {
        console.log(error);
    }
});
//VER DETALLE
router.get('/mascota/:id', async(req,resp)=>{
    const id = req.params.id;
    try {
        const mascotaDB = await Mascota.findOne({_id:id});
        
        resp.render('./servicios/editar',
        {
            mascota: mascotaDB,
            error:false
        });
    } catch (error) {
        console.log(error);
        resp.render('./servicios/editar',
        {
            error:true,
            mensaje: "No se encontro"
        });
    }
});
//ELIMINAR
router.delete('/mascota/:id', async (req,resp)=>{
    const id = req.params.id;
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({_id:id});
        if(mascotaDB){
            resp.json({
                estado: true,
                mensaje: "Eliminado"
            });
        }else{            
            resp.json({
                estado: false,
                mensaje: "Error al Eliminar"
            });
        }
    } catch (error) {
        console.log(error);
    }
});
//EDITAR
router.put('/mascota/:id', async(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    try {
        const mascotaDB =  await Mascota.findByIdAndUpdate(id, body, {useFindAndModify:false} );
        res.json({
            estado:true,
            mensaje: "Exito"
        });
    } catch (error) {
        console.log(error);
        res.json({
            estado:false,
            mensaje: "Fallo"
        });
    }
});

module.exports = router;