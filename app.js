const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//conexion bdd
const mongoose = require('mongoose');
const user = 'test';
const pwd = 'MuEgUE3GSZ58JV10';
const uri = `mongodb+srv://${user}:${pwd}@test.pfqtg.mongodb.net/veterinaria?retryWrites=true&w=majority`;

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('Conectado'))
    .catch(e => console.log(e));

//motor de plantillas
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.use(express.static(__dirname+"/public"));
//usar router
app.use('/api',require('./router/routes'));

app.use((req,res,next)=>{ 
    res.status(404).render("404");
});
app.listen(port,()=>{
    console.log(`listen port ${port}`);
})