import { Db } from 'mongodb';
import { json } from 'stream/consumers';
import { ICamion } from '../modelo/camion.js';
import { ConectarMongoDB } from './ConectarMongoDB.js';

class CamionDao {
    conexion = new ConectarMongoDB();
    
    //funcion agregar: agregar un camion.
    async agregar(camion: ICamion) {
        const db = await this.conexion.conectar();
        const collection = db.collection('Camiones');
        //codigo para insertar un documento:
        const insertOneResult = await collection.insertOne(camion);
            
        await this.conexion.desconectar();
        return (insertOneResult)
    }
    
    // funcion buscarPorPatente: busca un camion segun patente.
    async buscarPorPatente(pat:string){
        const db = await this.conexion.conectar();
        const collection = db.collection('Camiones');
        
        //const camionEncontrado = await collection.find({ patente: pat }).toArray();
        
        const camionEncontrado = await collection.findOne({patente: pat})
        
        await this.conexion.desconectar();
        return (camionEncontrado);
    }

    //funcion modificar: recibe un camion y lo reemplaza en la bd.
    async modificar(camion:ICamion){
        const db = await this.conexion.conectar();
        const collection = db.collection('Camiones');
        const pat = camion.patente;

        //const updateResult = await collection.updateOne({ patente: patente }, { $set: { codigo: 5 } });
        
        //const modificarResultado = collection.replaceOne({patente:pat},camion);

        const modificarResultado = await collection.findOneAndReplace({patente:pat},camion)

        await this.conexion.desconectar();
        return (modificarResultado)
    }


    // funcion borrar: borra un camion segun la patente.
    async borrar (patente:string){
        const db = await this.conexion.conectar();
        const collection = db.collection('Camiones');

        const deleteResult = await collection.deleteMany({ patente: patente });
    
        await this.conexion.desconectar();
        return (deleteResult)
    }


    //funcion getAll: trae todos los camiones
    async getAll() {
        const db = await this.conexion.conectar();
        const collection = db.collection('Camiones');
        //codigo para traerse todos los documentos:
        const findResult = await collection.find({}).toArray();
        await this.conexion.desconectar();
        return (findResult);
    }
}
export { CamionDao };