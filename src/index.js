// configurar variables de entorno:
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import { crearRutasCamion } from './rutas/crearRutasCamion.js';
import { crearRutasChofer } from './rutas/crearRutasChofer.js';
const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/camion', crearRutasCamion());
app.use('/api/chofer', crearRutasChofer());
const port = 3000;
app.get('/test', (req, res) => {
    res.send('ok');
});
app.listen(port, () => {
    console.log('Sistema escuchando en ' + port);
});
//Prueba de conexion:
//const conexion =  new ConectarMongoDB()
//await conexion.conectar()//si funciona escribe por consola "conectado a mongo".
//await conexion.desconectar()//si funciona escribe por consola "desconectado".
//prueba de CRUD de camion
// import { CamionDao } from './dao/CamionDao.js'
// import { ICamion } from './modelo/camion.js';
// import {GestionCamion} from '../src/servicios/gestionCamion.js';
// // const gestionCamion = new GestionCamion();
// const camion1:ICamion = {
//     patente: 'z123',
//     kilometraje: 10000,
//     ultimoServiceAceite: 5000,
//     ultimoServiceNeumatico: 3000,
//     ulitmoServiceFiltro: 7000,
//     enTaller: false,   
// }
//await gestionCamion.actualizarKilometraje("z123",342341)
