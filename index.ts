import Server from "./clases/server";
import fileUpload from 'express-fileupload';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';

import usuarioRutas from "./rutas/usuario";
import contactoRutas from './rutas/contacto';
import yoRutas from './rutas/imagenesYo';
import sobreMiRutas from "./rutas/sobreMi";
import tecnologiasRutas from "./rutas/tecnologias";
import noticiasRutas from "./rutas/noticias";


const server = new Server();

//Body Parser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

//CORS
server.app.use(cors({origin:true,credentials:true}));

//FileUpload
server.app.use(fileUpload());

//Rutas
server.app.use('/usuario', usuarioRutas);
server.app.use('/contacto', contactoRutas);
server.app.use('/uploadYo', yoRutas );
server.app.use('/sobreMi', sobreMiRutas );
server.app.use('/tecnologia',tecnologiasRutas);
server.app.use('/noticias', noticiasRutas);
server.app.use(cors());

//Conectar BBDD

let mongoDB:string
if(process.env.MODE_ENV=='production'){
  mongoDB='mongodb+srv://admin_1:abc123.@cluster0.dydpz.mongodb.net/FedeDjBase'
}else{
  mongoDB='mongodb://localhost:27017/FedeDjBase'
}

mongoose.connect(
  mongoDB,
 // 'mongodb+srv://admin_1:abc123.@cluster0.dydpz.mongodb.net/FedeDjBase?retryWrites=true&w=majority',
{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false},
(err)=>{
    if(err) throw "err";
    console.log('Base de Datos ONLINE');
}


);

//Levantar el Servidor
server.start(() => {
  console.log("Sevidor FEDE corriendo en el puerto: " + server.port);
});
