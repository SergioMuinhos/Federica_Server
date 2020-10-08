"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystemYo {
    constructor() { }
    guardarImagenYo(file, nombre) {
        return new Promise((resolve, reject) => {
            //Crear Carpeta
            const path = this.crearCarpetaYo(nombre);
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
            if (err.code === 'ENOENT') {
                return false;
            }
        }
    }
    //Creacion de la carpeta
    crearCarpetaYo(nombre) {
        const pathYo = path_1.default.resolve(__dirname, '../uploads', nombre);
        const existe = fs_1.default.existsSync(pathYo);
        if (!existe) {
            fs_1.default.mkdirSync(pathYo);
        }
        return pathYo;
    }
    //Mostrar imagen por URL 
    getImgUrl(img) {
        const pathImagen = path_1.default.resolve(__dirname, '../uploads', 'Federica', img);
        return pathImagen;
    }
}
exports.default = FileSystemYo;
