// configurar variables de entorno:
import * as dotenv from 'dotenv';
dotenv.config();
//Prueba de conexion:
//const conexion =  new ConectarMongoDB()
//await conexion.conectar()//si funciona escribe por consola "conectado a mongo".
//await conexion.desconectar()//si funciona escribe por consola "desconectado".
//prueba de CRUD de camion
import { CamionDao } from './dao/CamionDao.js';
const camionDao = new CamionDao();
const camion1 = {
    patente: 'xyz123',
    kilometraje: 10000,
    ultimoServiceAceite: 5000,
    ultimoServiceNeumatico: 2000,
    ulitmoServiceFiltro: 7000,
    enServicio: false,
};
//camionDao.agregar(camion1);
//console.log (await camionDao.buscarPorPatente('xyz123'))
//camionDao.borrar('ijk123')
//console.log (await camionDao.getAll())
camionDao.modificar(camion1);
