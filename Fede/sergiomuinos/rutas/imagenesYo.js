"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileSystemYo_1 = __importDefault(require("../clases/fileSystemYo"));
const autentificacion_1 = require("../middelwares/autentificacion");
const imagenesYo_1 = require("../modelos/imagenesYo");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yoRutas = express_1.Router();
const fileSystemYo = new fileSystemYo_1.default();
//Subir imagen
yoRutas.post("/", autentificacion_1.verificarToken, (req, res) => {
    const body = req.body;
    const file = req.files.img;
    body.img = file.name;
    console.log(file);
    imagenesYo_1.ImagenesYo.create(body)
        .then((imgYoDB) => {
        res.json({
            ok: true,
            imgYoDB,
        });
        fileSystemYo.guardarImagenYo(file, req.usuario.nombre); //req.usuario.nombre -> El Usuario.Nombre esta almacenado en el token de verificarToken()
    })
        .catch((err) => {
        res.json(err);
    });
});
//Mostrar Imagen por URL
yoRutas.get("/federica/:img", (req, res) => {
    const img = req.params.img;
    const pathImagen = fileSystemYo.getImgUrl(img);
    res.sendFile(pathImagen);
});
//Actualizar imagen por URL
yoRutas.post("/update", autentificacion_1.verificarToken, (req, res) => {
    const file = req.files.img;
    if (fileSystemYo.fileExists("./Fede/Uploads/" + req.usuario.nombre + "/" + file.name)) {
        fileSystemYo.guardarImagenYo(file, req.usuario.nombre);
        res.json({
            ok: true,
            mensaje: "Imagen actualizada",
        });
    }
    else {
        res.json({
            ok: false,
            mensaje: "No se puede actualizar imagenes con distinto nombre",
        });
    }
});
//Borrar Imagen  o cualquier tipo de archivo
yoRutas.delete('/:id/:name', autentificacion_1.verificarToken, (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    imagenesYo_1.ImagenesYo.findByIdAndRemove(id, (err, imgBorrar) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            mensaje: 'imagen eliminada',
            body: imgBorrar
        });
        fs_1.default.unlinkSync(path_1.default.resolve(__dirname, '../uploads', 'Federica', name));
    });
});
exports.default = yoRutas;
