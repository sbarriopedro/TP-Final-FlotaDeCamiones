// configurar variables de entorno:
import * as dotenv from 'dotenv';
dotenv.config();
//console.log(process.env.CNX_STR);

import { ConectarMongoDB } from "./dao/ConectarMongoDB.js";


const conexion =  new ConectarMongoDB()

await conexion.conectar()//prueba de conexion.

await conexion.desconectar()//prueba de desconexion