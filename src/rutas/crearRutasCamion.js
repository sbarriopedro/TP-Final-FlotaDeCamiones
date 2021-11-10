import express from "express";
import { CamionDao } from '../dao/CamionDao.js';
import { CamionError } from '../errores/camionError.js';
import { VerificaCamion } from '../errores/VerificaCamion.js';
//import {upload} from '../compartido/uploadNotas.js'
function crearRutasCamion() {
    const verificaCamion = new VerificaCamion();
    const rutasCamion = express.Router();
    const camionDao = new CamionDao();
    rutasCamion.get('/', async (req, res, next) => {
        console.log('request recibido');
        try {
            const aCamiones = await camionDao.getAll();
            res.json(aCamiones);
        }
        catch (e) {
            next(e);
        }
    });
    rutasCamion.post('/', async (req, res, next) => {
        console.log(req.body);
        try {
            verificaCamion.verificarIntegridad(req.body);
            await camionDao.agregar(req.body);
            res.status(201).json(req.body);
        }
        catch (e) {
            next(e);
        }
    });
    // rutasCamion.post('/notas',upload.single('notas') , async (req, res, next) => {
    //     try {
    //         // console.log(req.file?.originalname)
    //         // 1- convertir a lista de notas
    //         // 2- llamar de la base de datos notas
    //         // 3- procesar
    //         // 4- crear pdf
    //         // 5- enviar el correo con el pdf
    //         res.status(201).json({mensaje:'ok'})
    //     } catch(e) {
    //         next(e)
    //     }
    // })
    rutasCamion.use((error, req, res, next) => {
        if (error instanceof CamionError) {
            res.status(400);
            res.json({ mensaje: error.getMensaje() });
        }
        else {
            res.status(500);
            res.json({ mensaje: 'Error en base de datos' });
        }
    });
    return rutasCamion;
}
export { crearRutasCamion };
