import { Router, Request, Response, response } from "express";
import FileSystemYo from "../clases/fileSystemYo";
import { verificarToken } from "../middelwares/autentificacion";
import { ImagenesYo } from "../modelos/imagenesYo";
import fs from "fs";
import path from "path";

const yoRutas = Router();
const fileSystemYo = new FileSystemYo();

//Subir imagen
yoRutas.post("/", verificarToken, (req: any, res: Response) => {
  const body = req.body;
  const file = req.files.img;
  body.img = file.name;
  console.log(file);

  ImagenesYo.create(body)
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
yoRutas.get("/federica/:img", (req: any, res: Response) => {
  const img = req.params.img;
  const pathImagen = fileSystemYo.getImgUrl(img);
  res.sendFile(pathImagen);
});

//Actualizar imagen por URL
yoRutas.post("/update", verificarToken, (req: any, res: Response) => {
  const file = req.files.img;

  if (
    fileSystemYo.fileExists(
      "./Fede/Uploads/" + req.usuario.nombre + "/" + file.name
    )
  ) {
    fileSystemYo.guardarImagenYo(file, req.usuario.nombre);
    res.json({
      ok: true,
      mensaje: "Imagen actualizada",
    });
  } else {
    res.json({
      ok: false,
      mensaje: "No se puede actualizar imagenes con distinto nombre",
    });
  }
});

//Borrar Imagen  o cualquier tipo de archivo
yoRutas.delete('/:id/:name',verificarToken,(req:any,res:Response)=>{
    const id=req.params.id;
    const name=req.params.name;

    ImagenesYo.findByIdAndRemove(id,(err,imgBorrar)=>{

        if(err) throw err;
        res.json({
            ok:true,
            mensaje:'imagen eliminada',
            body:imgBorrar
        })

        fs.unlinkSync(path.resolve(__dirname,'../uploads','Federica',name));

    });


});

export default yoRutas;
