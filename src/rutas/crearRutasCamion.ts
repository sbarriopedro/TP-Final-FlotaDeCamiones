import express from "express";
import {CamionDao} from '../dao/CamionDao.js'
import { CamionError } from '../errores/camionError.js'
import {VerificaCamion} from '../errores/VerificaCamion.js'
import {GestionCamion} from '../servicios/gestionCamion.js'

//import {upload} from '../compartido/uploadNotas.js'

function crearRutasCamion() {

    const gestionCamion = new GestionCamion();
    const verificaCamion:VerificaCamion=new VerificaCamion();
    const rutasCamion = express.Router();
    const camionDao:CamionDao = new CamionDao();
    
    //trae todos:
    rutasCamion.get('/getall', async (req, res, next) => {
        console.log('request recibido')
        try {
            const aCamiones = await camionDao.getAll()
            res.json(aCamiones)
        } catch (e) {
            next(e)
        }
    })

    //trae uno:
    rutasCamion.get('/:patente', async (req,res)=>{
        console.log ('GET request recibido')
        try {
            const camion = await camionDao.buscarPorPatente (req.params.patente)
            res.json(camion)
        } catch (e) {
            throw e
        }
    } )

    //agrega un camion:
    rutasCamion.post('/agregar', async (req, res, next) => {
        console.log(req.body)
        try {
            verificaCamion.verificarIntegridad(req.body)
            await verificaCamion.verificarPatente(req.body.patente)
            await camionDao.agregar(req.body)
            res.status(201).json(req.body)
        } catch(e) {
            next(e)
        }
    })

    //borra un camion:
    rutasCamion.delete('/:patente', async (req,res)=>{
        console.log ('DELETE request recibido')
        try {
            await camionDao.borrar (req.params.patente)
            res.json({
                result:'ok',
                patente: req.params.patente
            })
        } catch (e) {
            throw e
        }        
    })

    //reemplaza un camion, buscandolo por patente:
    rutasCamion.put('/:patente', async (req,res)=>{
        console.log ('PUT request recibido')

        const patente = req.params.patente;
        const nuevocamion = req.body;

        try {
            const camion = await camionDao.buscarPorPatente(patente)
            if (camion){
                await camionDao.modificar(patente,nuevocamion)
                res.json({
                    result:'ok',
                    patente: patente,
                    nuevoCamion: nuevocamion
                })
            }else{
                res.json({
                    result:'Camion Inexistente',
                    patente: patente
                })
            }
        } catch (e) {
            throw e
        }
    })

    //actualiza el kilometraje del camion:
    rutasCamion.put ('/actualizarkm/',async (req,res)=>{
        console.log ('PUT request recibido')

        const nuevoKM = req.body.km;
        const patente = req.body.patente;

        try {
            const camion = await camionDao.buscarPorPatente (patente)
            if (camion){
                verificaCamion.verificarKM (patente, nuevoKM);
                gestionCamion.actualizarKilometraje (patente, nuevoKM);
                res.json ({
                    result: 'ok',
                    patente: patente,
                    nuevoKM: nuevoKM
                })
            }else{
                res.json({
                    result: 'camion inexistente',
                    patente: patente
                })
            }
        } catch (e) {
            throw e
        }
    })

    //actualiza el kilometraje del ultimo service
    rutasCamion.put ('actualizarservice', async (req,res)=>{
        console.log ('PUT request recibido')

        const service = req.body.service;
        const patente = req.body.patente;

        try {
            const camion = await camionDao.buscarPorPatente(patente);
            if (camion){
                gestionCamion.actualizarService (patente,service);
                res.json ({
                    result:'ok',
                    serviceActualizado: service
                })
            }else{
                res.json({
                    result: 'camion inexistente',
                    patente: patente
                })
            }
        } catch (e) {
            throw e;
        }
    })

    rutasCamion.use( (error: any, req: any, res: any, next: any) => {
        if (error instanceof CamionError) {
            res.status(400)
            res.json({mensaje: error.getMensaje()})
        } else {
            res.status(500)
            res.json({mensaje: 'Error en base de datos'})
        }
    })
    return rutasCamion
}

export {crearRutasCamion}