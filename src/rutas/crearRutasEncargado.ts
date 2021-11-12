import express from "express";
import { EncargadoDao } from '../dao/EncargadoDao.js';
import { EncargadoError } from '../errores/encargadoError.js';
import { VerificaEncargado } from '../errores/VerificaEncargado.js';
//import {upload} from '../compartido/uploadNotas.js'
function crearRutasEncargado() {
    const verificaEncargado = new VerificaEncargado();
    const rutasEncargado = express.Router();
    const encargadoDao = new EncargadoDao();
    //trae todos:
    rutasEncargado.get('/getall', async (req, res, next) => {
        console.log('request recibido');
        try {
            const aEncargados = await encargadoDao.getAll();
            res.json(aEncargados);
        }
        catch (e) {
            next(e);
        }
    });
    //trae uno:
   rutasEncargado.get('/:userid', async (req, res) => {
        console.log('GET request recibido');
        try {
            const encargado = await encargadoDao.buscarPorUserID(req.params.userid);
            res.json(encargado);
        }
        catch (e) {
            throw e;
        }
    });
    //agrega un encargado:
   rutasEncargado.post('/agregar', async (req, res, next) => {
        console.log(req.body);
        try {
            verificaEncargado.verificarIntegridad(req.body);
            await verificaEncargado.verificarUserID(req.body.userId);
            await encargadoDao.agregar(req.body);
            res.status(201).json(req.body);
        }
        catch (e) {
            next(e);
        }
    });
    //borra un usuario:
  rutasEncargado.delete('/:userId', async (req, res) => {
        console.log('DELETE request recibido');
        try {
            await encargadoDao.borrar(req.params.userId);
            res.json({
                result: 'ok',
                userID: req.params.userId
            });
        }
        catch (e) {
            throw e;
        }
    });
/*     //reemplaza un camion, buscandolo por patente:
    rutasCamion.put('/:patente', async (req, res) => {
        console.log('PUT request recibido');
        try {
            const camion = await camionDao.buscarPorPatente(req.params.patente);
            if (camion) {
                await camionDao.modificar(req.params.patente, req.body);
                res.json({
                    result: 'ok',
                    patente: req.params.patente,
                    nuevoCamion: req.body
                });
            }
            else {
                res.json({
                    result: 'Camion Inexistente',
                    patente: req.params.patente
                });
            }
        }
        catch (e) {
            throw e;
        }
    }); */
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


    rutasEncargado.use((error:any, req:any, res:any, next:any) => {
        if (error instanceof EncargadoError) {
            res.status(400);
            res.json({ mensaje: error.getMensaje() });
        }
        else {
            res.status(500);
            res.json({ mensaje: 'Error en base de datos' });
        }
    });
    return rutasEncargado;
}
export { crearRutasEncargado };
