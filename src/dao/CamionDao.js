import { ConectarMongoDB } from './ConectarMongoDB.js';
class CamionDao {
    conexion = new ConectarMongoDB();
    //funcion agregar: agregar un camion.
    async agregar(camion) {
        const db = await this.conexion.conectar();
        const collection = db.collection('camiones');
        //codigo para insertar un documento:
        const insertOneResult = await collection.insertOne(camion);
        await this.conexion.desconectar();
        //return (insertOneResult)
    }
    // funcion buscarPorPatente: busca un camion segun patente.
    async buscarPorPatente(pat) {
        const db = await this.conexion.conectar();
        const collection = db.collection('camiones');
        const camionEncontrado = await collection.find({ patente: pat }).toArray();
        await this.conexion.desconectar();
        return (camionEncontrado[0]);
    }
    //funcion modificar: recibe un camion y lo reemplaza en la bd.
    async modificar(camion) {
        const db = await this.conexion.conectar();
        const collection = db.collection('camiones');
        const patente = camion.patente;
        //const updateResult = await collection.updateOne({ patente: patente }, { $set: { codigo: 5 } });
        const modificarResultado = collection.replaceOne({ patente: patente }, camion);
        await this.conexion.desconectar();
    }
    // funcion borrar: borra un camion segun la patente.
    async borrar(patente) {
        const db = await this.conexion.conectar();
        const collection = db.collection('camiones');
        const deleteResult = await collection.deleteMany({ patente: patente });
        await this.conexion.desconectar();
    }
    //funcion getAll: trae todos los camiones
    async getAll() {
        const db = await this.conexion.conectar();
        const collection = db.collection('camiones');
        //codigo para traerse todos los documentos:
        const findResult = await collection.find({}).toArray();
        await this.conexion.desconectar();
        return (findResult);
    }
}
export { CamionDao };
