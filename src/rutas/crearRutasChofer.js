import express from "express";
import { ChoferDao } from '../dao/ChoferDao.js';
import { ChoferError } from '../errores/choferError.js';
import { VerificaChofer } from '../errores/VerificaChofer.js';
//import {upload} from '../compartido/uploadNotas.js'
function crearRutasChofer() {
    const verificaChofer = new VerificaChofer();
    const rutasChofer = express.Router();
    const choferDao = new ChoferDao();
    //trae todos:
    rutasChofer.get('/getall', async (req, res, next) => {
        console.log('request recibido');
        try {
            const aChoferes = await choferDao.getAll();
            res.json(aChoferes);
        }
        catch (e) {
            next(e);
        }
    });
    //trae uno:
    rutasChofer.get('/:userId', async (req, res) => {
        console.log('GET request recibido');
        try {
            const chofer = await choferDao.buscarPorUserID(req.params.userId);
            res.json(chofer);
        }
        catch (e) {
            throw e;
        }
    });
    //agrega un chofer:
    rutasChofer.post('/agregar', async (req, res, next) => {
        console.log(req.body);
        try {
            verificaChofer.verificarIntegridad(req.body);
            await verificaChofer.verificarUserId(req.body.userId);
            await choferDao.agregar(req.body);
            res.status(201).json(req.body);
        }
        catch (e) {
            next(e);
        }
    });
    //borra un chofer:
    rutasChofer.delete('/:userId', async (req, res) => {
        console.log('DELETE request recibido');
        try {
            await choferDao.borrar(req.params.userId);
            res.json({
                result: 'ok',
                userId: req.params.userId
            });
        }
        catch (e) {
            throw e;
        }
    });
    // //reemplaza un camion, buscandolo por patente:
    // rutasCamion.put('/:patente', async (req,res)=>{
    //     console.log ('PUT request recibido')
    //     try {
    //         const camion = await camionDao.buscarPorPatente(req.params.patente)
    //         if (camion){
    //             await camionDao.modificar(req.params.patente,req.body)
    //             res.json({
    //                 result:'ok',
    //                 patente: req.params.patente,
    //                 nuevoCamion: req.body
    //             })}
    //         else{
    //             res.json({
    //                 result:'Camion Inexistente',
    //                 patente: req.params.patente
    //         })}
    //     } catch (e) {
    //         throw e
    //     }
    // })
    rutasChofer.use((error, req, res, next) => {
        if (error instanceof ChoferError) {
            res.status(400);
            res.json({ mensaje: error.getMensaje() });
        }
        else {
            res.status(500);
            res.json({ mensaje: 'Error en base de datos' });
        }
    });
    return rutasChofer;
}
export { crearRutasChofer };
