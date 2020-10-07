"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystemNoticias {
    constructor() { }
    guardarImg(file) {
        return new Promise((resolve, reject) => {
            //Crear Carpeta
            const path = this.crearCarpetaImagenNoticia();
            //Crear Nombre Archivo
            const nombreArchivo = file.name;
            //Mover archivo a Carpeta
            //   console.log("Archivo  Existe");
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
    //Comprobar si existe un archivo o Imagen
    fileExists(path) {
        try {
            if (fs_1.default.statSync(path).isFile()) {
                return true;
            }
        }
        catch (err) {
            if (err.code === "ENOENT") {
                return false;
            }
        }
    }
    //Creacion de la carpeta
    crearCarpetaImagenNoticia() {
        const pathImagenNoticia = path_1.default.resolve(__dirname, "../uploads/imgNoticia");
        const existe = fs_1.default.existsSync(pathImagenNoticia);
        if (!existe) {
            fs_1.default.mkdirSync(pathImagenNoticia);
        }
        return pathImagenNoticia;
    }
    //Mostrar imagen por URL
    getImgNoticiaUrl(img) {
        const pathImgNoticia = path_1.default.resolve(__dirname, "../uploads", "imgNoticia", img);
        return pathImgNoticia;
    }
    //Imagen de Autor
    guardarImgYo(file) {
        return new Promise((resolve, reject) => {
            //Crear Carpeta
            const path = this.crearCarpetaImagenNoticiaYo();
            //Crear Nombre Archivo
            const nombreArchivo = file.name;
            //Mover archivo a Carpeta
            //   console.log("Archivo  Existe");
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
    //Creacion de la carpeta
    crearCarpetaImagenNoticiaYo() {
        const pathImagenYo = path_1.default.resolve(__dirname, "../uploads/imgYo");
        const existe = fs_1.default.existsSync(pathImagenYo);
        if (!existe) {
            fs_1.default.mkdirSync(pathImagenYo);
        }
        return pathImagenYo;
    }
    //Mostrar imagen por URL
    getImgYoUrl(img) {
        const pathImagenYo = path_1.default.resolve(__dirname, "../uploads", "imgYo", img);
        return pathImagenYo;
    }
}
exports.default = FileSystemNoticias;
