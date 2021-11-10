import { Db } from 'mongodb';
import { json } from 'stream/consumers';
import { ICamion } from '../modelo/camion.js';
import { ConectarMongoDB } from './ConectarMongoDB.js';

class CamionDao {
    conexion = new ConectarMongoDB();
    
    //funcion agregar: agregar un camion.
    async agregar(camion: ICamion) {
        try{
            const db = await this.conexion.conectar();
            const collection = db.collection('Camiones');
            const insertOneResult = await collection.insertOne(camion);
            await this.conexion.desconectar();
        }catch (e){
            throw e
        }
    }
    
    // funcion buscarPorPatente: busca un camion segun patente.
    async buscarPorPatente(pat:string){
        try{
            const db = await this.conexion.conectar();
            const collection = db.collection('Camiones');
            const camionEncontrado = await collection.findOne({patente: pat})
            await this.conexion.desconectar();
            return (camionEncontrado);
        }catch (e){
            throw e
        }
    }

    //funcion modificar: recibe un camion y lo reemplaza en la bd.
    async modificar(camion:ICamion){
        try{
            const db = await this.conexion.conectar();
            const collection = db.collection('Camiones');
            const pat = camion.patente;
            await collection.findOneAndReplace({patente:pat},camion)
            await this.conexion.desconectar();
        }catch(e){
            throw e
        }
    }

    // funcion borrar: borra un camion segun la patente.
    async borrar (patente:string){
        try{
            const db = await this.conexion.conectar();
            const collection = db.collection('Camiones');
            await collection.deleteMany({ patente: patente });
            await this.conexion.desconectar();
        }catch(e){
            throw e
        }
    }

    //funcion getAll: trae todos los camiones
    async getAll() {
        try {
            const db = await this.conexion.conectar();
            const collection = db.collection('Camiones');
            const findResult = await collection.find({}).toArray();
            await this.conexion.desconectar();
            return (findResult);            
        } catch (e) {
            throw e
        }
    }
}
export { CamionDao };