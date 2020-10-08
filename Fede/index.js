"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const usuario_1 = __importDefault(require("./rutas/usuario"));
const contacto_1 = __importDefault(require("./rutas/contacto"));
const imagenesYo_1 = __importDefault(require("./rutas/imagenesYo"));
const sobreMi_1 = __importDefault(require("./rutas/sobreMi"));
const tecnologias_1 = __importDefault(require("./rutas/tecnologias"));
const noticias_1 = __importDefault(require("./rutas/noticias"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const server = new server_1.default();
//Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
//FileUpload
server.app.use(express_fileupload_1.default());
//Rutas
server.app.use(express_1.default.static(path_1.default.join((__dirname + '/public'))));
server.app.use('/usuario', usuario_1.default);
server.app.use('/contacto', contacto_1.default);
server.app.use('/uploadYo', imagenesYo_1.default);
server.app.use('/sobreMi', sobreMi_1.default);
server.app.use('/tecnologia', tecnologias_1.default);
server.app.use('/noticias', noticias_1.default);
//server.app.use(cors());
//Conectar BBDD
let mongoDB;
if (process.env.MODE_ENV == 'production') {
    mongoDB = 'mongodb+srv://admin_1:abc123.@cluster0.dydpz.mongodb.net/FedeDjBase';
}
else {
    mongoDB = 'mongodb://localhost:27017/FedeDjBase';
}
mongoose_1.default.connect(mongoDB, 
// 'mongodb+srv://admin_1:abc123.@cluster0.dydpz.mongodb.net/FedeDjBase?retryWrites=true&w=majority',
{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true }, (err) => {
    if (err)
        throw "err";
    console.log('Base de Datos ONLINE');
});
//Levantar el Servidor
server.start(() => {
    console.log("Sevidor FEDE corriendo en el puerto: " + server.port);
});
