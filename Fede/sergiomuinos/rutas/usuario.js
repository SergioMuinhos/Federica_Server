"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../modelos/usuarios");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = __importDefault(require("../clases/token"));
const usuarioRutas = express_1.Router();
//Crear Usuario
usuarioRutas.post("/crear", (req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        password: bcryptjs_1.default.hashSync(req.body.password, 10),
    };
    //Grabar usuario en la Base de Datos
    usuarios_1.Usuario.create(usuario)
        .then((usuarioDB) => {
        res.json({
            ok: true,
            usuario: usuarioDB,
        });
    })
        .catch((err) => {
        res.json({
            ok: false,
            err,
        });
    });
});
//Login
usuarioRutas.post("/entrar", (req, res) => {
    const body = req.body;
    usuarios_1.Usuario.findOne({ nombre: body.nombre }, (err, usuarioDB) => {
        if (err)
            throw err;
        if (!usuarioDB) {
            return res.json({
                ok: false,
                mensaje: "Invalida data",
            });
        }
        if (usuarioDB.compararContrasena(body.password)) {
            const miToken = token_1.default.getToken({
                _id: usuarioDB._id,
                nombre: usuarioDB.nombre,
                password: usuarioDB.password
            });
            res.json({
                ok: true,
                token: miToken,
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: "Invalida data",
            });
        }
    });
});
// Actualizar mi usuario
/*usuarioRutas.post('/update', verificarToken, (req: any, res: Response) => {

  const usuario = {
      nombre: req.body.nombre || req.usuario.nombre,
      password: req.body.password || req.usuario.password
  }

  Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, (err, userDB) => {

      if (err) throw err;
      if (!userDB) {
          return res.json({
              ok: false,
              mensaje: 'Invalid data'
          });
      }
      const miToken = Token.getToken({
          _id: userDB._id,
          nombre: userDB.nombre,
          password: userDB.password

      });
      res.json({
          ok: true,
          token: miToken
      });
  });
});*/
// Get usuario
/*usuarioRutas.get('/', async (req: any, res: Response) => {

  const user = await Usuario.find()
      .limit(1) // Limit es para el número de usuarios que queremos obtener
      .exec();

  res.json({
      ok: true,
      user
  });
});*/
exports.default = usuarioRutas;
