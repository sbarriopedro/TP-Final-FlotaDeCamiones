// configurar variables de entorno:
import * as dotenv from 'dotenv';
dotenv.config();
//console.log(process.env.CNX_STR);

import { ConectarMongoDB } from "./dao/ConectarMongoDB.js";

//Prueba de conexion:
//const conexion =  new ConectarMongoDB()
//await conexion.conectar()//si funciona escribe por consola "conectado a mongo".
//await conexion.desconectar()//si funciona escribe por consola "desconectado".


//prueba de CRUD de camion
import { CamionDao } from './dao/CamionDao.js'
import { ICamion } from './modelo/camion.js';
import {GestionCamion} from '../src/servicios/gestionCamion.js';



const gestionCamion = new GestionCamion();

const camion1:ICamion = {
    patente: 'z123',
    kilometraje: 10000,
    ultimoServiceAceite: 5000,
    ultimoServiceNeumatico: 3000,
    ulitmoServiceFiltro: 7000,
    enServicio: false,   

}
await gestionCamion.crear(camion1)

//const buscado= await gestionCamion.buscarPorPatente("3")
//console.log(buscado)

const borrar = await gestionCamion.borrarPorPatente("xyz123")




// //ejemplo de modificar un camion:
// camionDao.buscarPorPatente('ijk123')
//     .then(camion=> {
//         if (camion){
//             camion.enServicio=true;  
//             const camionAux:ICamion = {
//                 patente: camion.patente,
//                 kilometraje: camion.kilometraje,
//                 ultimoServiceAceite: camion.ultimoServiceAceite,
//                 ultimoServiceNeumatico: camion.ultimoServiceNeumatico,
//                 ulitmoServiceFiltro: camion.ulitmoServiceFiltro,
//                 enServicio: true   
//             }
//             camionDao.modificar(camionAux)
//                 .then (()=> console.log ('el camion fue modificado'))
//                 .catch(error=>console.error(error))
//         }
//     })


//ejemplo de modificar un camion


// const camionAux = camionDao.buscarPorPatente('abc123')


//  camionDao.modificar(camionAux)
//     .then(()=>console.log ('el camion fue modificado'))
//     .catch((error)=>console.error(error))
