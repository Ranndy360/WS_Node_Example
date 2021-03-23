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
module.exports = router;