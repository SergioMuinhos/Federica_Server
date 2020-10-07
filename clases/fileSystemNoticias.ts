import path from "path";
import fs from "fs";

export default class FileSystemNoticias {
  constructor() {}

  guardarImg(file: any) {
    return new Promise((resolve, reject) => {
      //Crear Carpeta
      const path = this.crearCarpetaImagenNoticia();
      //Crear Nombre Archivo
      const nombreArchivo = file.name;
      //Mover archivo a Carpeta
      //   console.log("Archivo  Existe");
      file.mv(`${path}/${nombreArchivo}`, (err: any) => {
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }

  //Comprobar si existe un archivo o Imagen
  fileExists(path: string) {
    try {
      if (fs.statSync(path).isFile()) {
        return true;
      }
    } catch (err) {
      if (err.code === "ENOENT") {
        return false;
      }
    }
  }

  //Creacion de la carpeta
  private crearCarpetaImagenNoticia() {
    const pathImagenNoticia = path.resolve(__dirname, "../uploads/imgNoticia");
    const existe = fs.existsSync(pathImagenNoticia);
    if (!existe) {
      fs.mkdirSync(pathImagenNoticia);
    }
    return pathImagenNoticia;
  }

  //Mostrar imagen por URL
  getImgNoticiaUrl(img: string) {
    const pathImgNoticia = path.resolve(
      __dirname,
      "../uploads",
      "imgNoticia",
      img
    );
    return pathImgNoticia;
  }

  //Imagen de Autor

  guardarImgYo(file: any) {
    return new Promise((resolve, reject) => {
      //Crear Carpeta
      const path = this.crearCarpetaImagenNoticiaYo();
      //Crear Nombre Archivo
      const nombreArchivo = file.name;
      //Mover archivo a Carpeta
      //   console.log("Archivo  Existe");
      file.mv(`${path}/${nombreArchivo}`, (err: any) => {
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }

  //Creacion de la carpeta
  private crearCarpetaImagenNoticiaYo() {
    const pathImagenYo = path.resolve(__dirname, "../uploads/imgYo");
    const existe = fs.existsSync(pathImagenYo);
    if (!existe) {
      fs.mkdirSync(pathImagenYo);
    }
    return pathImagenYo;
  }

  //Mostrar imagen por URL
  getImgYoUrl(img: string) {
    const pathImagenYo = path.resolve(__dirname, "../uploads", "imgYo", img);
    return pathImagenYo;
  }
}
