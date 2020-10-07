import path from 'path';
import fs from 'fs';

export default class FileSystemYo{
    constructor(){}


guardarImagenYo(file:any, nombre:string){

return new Promise((resolve,reject)=>{
    //Crear Carpeta
const path =this.crearCarpetaYo(nombre);
//Crear Nombre Archivo
const nombreArchivo=file.name;
//Mover archivo a Carpeta
 //   console.log("Archivo  Existe");
file.mv(`${path}/${nombreArchivo}`,(err:any)=>{
    
    if(err){
        reject();
    }else{
        resolve();
    }
});

});

}

//Comprobar si existe un archivo o Imagen
fileExists(path:string){
    try{
         if(fs.statSync(path).isFile()){
            return true;
        }
    }catch(err){
        if(err.code==='ENOENT'){
            return false;
        }
        
    }
}

//Creacion de la carpeta
private crearCarpetaYo(nombre:string ){

const pathYo =path.resolve(__dirname,'../uploads',nombre);
const  existe = fs.existsSync(pathYo);
if(!existe){
    fs.mkdirSync(pathYo);

}
return pathYo;

}

//Mostrar imagen por URL 
getImgUrl(img:string){
    const pathImagen=path.resolve(__dirname,'../uploads','Federica',img);
    return pathImagen;
}


}

