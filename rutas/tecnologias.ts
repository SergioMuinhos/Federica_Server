import { Router, Request, Response, response } from "express";
import { verificarToken } from "../middelwares/autentificacion";
import { Tecnologias } from "../modelos/tecnologias";


const tecnologiasRutas=Router();


//Crear tecnologias

tecnologiasRutas.post('/',verificarToken,(req:any,res:Response)=>{
    const body=req.body;

    Tecnologias.create(body).then((tecnologiaDB: any)=>{
        res.json({
            ok:true,
            tecnologiaDB:tecnologiaDB
        });
    }).catch((err: any)=>{
        res.json(err)
    });


});





//Obtener tecnologia
tecnologiasRutas.get('/',async(req:any,res:Response)=>{
    const tecnologias=await Tecnologias.find().exec();
    res.json({
        ok:true,
        tecnologias
    });
});

//Actualizar Tecnologia
tecnologiasRutas.post('/update/:id',verificarToken,(req:any,res:Response)=>{
    const id =req.params.id;
    const tecnologia ={
        icono:req.body.icono,
        tecnologia:req.body.tecnologia,
        experiencia:req.body.experiencia
    }

 Tecnologias.findByIdAndUpdate(id,tecnologia,{new:true},(err,tecnologiaDB)=>{

    if(err)throw err;
    if(!tecnologiaDB){
        return res.json({
            ok:false,
            mensaje:'Invalid Data'
        })
    }
    res.json({
        ok:true,
        tecnologia
    });
 });

});


export default tecnologiasRutas;
