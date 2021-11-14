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
        console.log('request recibido: camion-getall')
        try {
            const aCamiones = await camionDao.getAll()
            res.json(aCamiones)
        } catch (e) {
            next(e)
        }
    })

    //trae uno:
    rutasCamion.get('/buscar/:patente', async (req,res)=>{
        console.log ('GET request recibido: camion- trae uno')
        try {
            const camion = await camionDao.buscarPorPatente (req.params.patente)
            res.json(camion)
        } catch (e) {
            throw e
        }
    } )

    //agrega un camion:
    rutasCamion.post('/agregar', async (req, res, next) => {
        console.log('POST request recibido: agregar un camion')
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
    rutasCamion.delete('/borrar/:patente', async (req,res)=>{
        console.log ('DELETE request recibido: borra un camion')
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
    rutasCamion.put('/modificar/:patente', async (req,res)=>{
        console.log ('PUT request recibido: modifica-reemplaza un camion')

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
    rutasCamion.put ('/actualizarkm',async (req,res)=>{
        console.log ('PUT request recibido- actualizar km')

        const nuevoKM = req.body.km;
        const patente = req.body.patente;

        try {
            const camion = await camionDao.buscarPorPatente (patente)
            if (camion){
                if (verificaCamion.verificarKM (camion.kilometraje, nuevoKM)){
                    gestionCamion.actualizarKilometraje (patente, nuevoKM);
                    res.json ({
                        result: 'ok',
                        patente: patente,
                        nuevoKM: nuevoKM
                    })
                }else{
                    res.json ({
                        result: 'El kilometraje es menor al actual',
                        patente: patente,
                        nuevoKM: nuevoKM
                    })
                }
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
    rutasCamion.put ('/actualizarservice', async (req,res)=>{
        console.log ('PUT request recibido - actualiza service')

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

    //ingreso de un camion a taller (camion.enTaller = true):
    rutasCamion.put ('/ingresotaller', async (req,res)=>{
        console.log ('Put request recibido - ingreso a taller')
        const patente = req.body.patente;
        console.log (patente)

        try {
            const camion = await camionDao.buscarPorPatente(patente);
            if (camion){
                gestionCamion.ingresoTaller (patente);
                res.json ({
                    result:'ok',
                    ingresadoATaller: patente
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

    //salida de un camion de taller (camion.enTaller = false):
    rutasCamion.put ('/salidataller', async (req,res)=>{
    console.log ('Put request recibido - salida de taller')
        const patente = req.body.patente;
        try {
            const camion = await camionDao.buscarPorPatente(patente);
            if (camion){
                gestionCamion.salidaTaller (patente);
                res.json ({
                    result:'ok',
                    salidaTaller: patente
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

    rutasCamion.get ('/camionesentaller', async (req,res)=>{
        console.log ('GET request recibido: trae los camiones en taller')
        try {
            const camiones = await camionDao.getCamionesEnTaller();
            console.log('camiones en taller:',camiones)
            res.json(camiones);
        } catch (e) {
            throw e
        }
    })

    rutasCamion.get ('/proxavencer', async (req,res)=>{
        console.log ('GET request recibido: services proximos a vencer')
        try {
            const aCamiones = await gestionCamion.getServicesAVencer();
            console.log('camiones',aCamiones)
            res.json(aCamiones);
        } catch (e) {
            throw e
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