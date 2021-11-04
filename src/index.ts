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

const camionDao = new CamionDao();

const camion1:ICamion = {
    patente: 'xyz123',
    kilometraje: 10000,
    ultimoServiceAceite: 5000,
    ultimoServiceNeumatico: 2000,
    ulitmoServiceFiltro: 7000,
    enServicio: false,   

}

// //ejemplo de agregar un camion:
// camionDao.agregar(camion1)
//     .then (()=> console.log('camion agregado'),)
//     .catch((error)=> console.error(error))

// //ejemplo de traer un camion de la BD.
// camionDao.buscarPorPatente('xyz123')
//     .then(camion=> {
//         if (camion){
//             console.log(camion)
//         }else{
//             console.log('camion no encontrado')
//         }
//         })
//     .catch(error=> console.error (error))


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

// //ejemplo de borrar un camion
// camionDao.borrar('ijk123')
//     .then(()=>console.log ('el camion fue borrado'))
//     .catch((error)=>console.error(error))


// camionDao.modificar(camion1)
//     .then(()=>console.log ('el camion fue modificado'))
//     .catch((error)=>console.error(error))
