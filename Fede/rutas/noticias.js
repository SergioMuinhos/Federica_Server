"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileSystemNoticias_1 = __importDefault(require("../clases/fileSystemNoticias"));
const autentificacion_1 = require("../middelwares/autentificacion");
const noticias_1 = require("../modelos/noticias");
const noticiasRutas = express_1.Router();
const fileSystemNoticias = new fileSystemNoticias_1.default();
//Crear Noticia
noticiasRutas.post('/:img/:imgYo', autentificacion_1.verificarToken, (req, res) => {
    const body = req.body;
    const img = req.params.img;
    const imgYo = req.params.imgYo;
    body.img = img;
    body.imgYo = imgYo;
    noticias_1.Noticias.create(body).then(noticiaDB => {
        res.json({
            ok: true,
            noticia: noticiaDB
        });
    }).catch((err) => {
        res.json(err);
    });
});
//Obtener Noticias 
noticiasRutas.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let saltar = pagina - 1;
    saltar = saltar * 8;
    const noticias = yield noticias_1.Noticias.find()
        .sort({ _id: -1 })
        .skip(saltar)
        .limit(8)
        .exec();
    res.json({
        ok: true,
        pagina,
        noticias
    });
}));
//Subir ImagenesYo 
noticiasRutas.post('/upload1', autentificacion_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file1 = req.files.imgYo;
    yield fileSystemNoticias.guardarImgYo(file1);
    res.json({
        ok: true,
        file1: file1.name
    });
}));
//Subir imagenesNoticia
noticiasRutas.post('/upload2', autentificacion_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file2 = req.files.img;
    yield fileSystemNoticias.guardarImg(file2);
    res.json({
        ok: true,
        file2: file2.name
    });
}));
//Mostrar ImagenNoticia por URL
noticiasRutas.get("/imgNoticia/:img", (req, res) => {
    const img = req.params.img;
    const pathImagen = fileSystemNoticias.getImgNoticiaUrl(img);
    res.sendFile(pathImagen);
});
//Mostrar ImagenYO por URL
noticiasRutas.get("/imgYo/:img", (req, res) => {
    const img = req.params.img;
    const pathImagen = fileSystemNoticias.getImgYoUrl(img);
    res.sendFile(pathImagen);
});
exports.default = noticiasRutas;
