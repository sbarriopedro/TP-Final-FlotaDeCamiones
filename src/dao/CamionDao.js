import { ConectarMongoDB } from './ConectarMongoDB.js';
class CamionDao {
    conexion = new ConectarMongoDB();
    //funcion agregar: agregar un camion.
    async agregar(camion) {
        try {
            const db = await this.conexion.conectar();
            const collection = db.collection('Camiones');
            const insertOneResult = await collection.insertOne(camion);
            await this.conexion.desconectar();
        }
        catch (e) {
            throw e;
        }
    }
    // funcion buscarPorPatente: busca un camion segun patente.
    async buscarPorPatente(pat) {
        try {
            const db = await this.conexion.conectar();
            const collection = db.collection('Camiones');
            const camionEncontrado = await collection.findOne({ patente: pat });
            await this.conexion.desconectar();
            return (camionEncontrado);
        }
        catch (e) {
            throw e;
        }
    }
    //funcion modificar: recibe un camion y lo reemplaza en la bd.
    async modificar(patente, camion) {
        try {
            const db = await this.conexion.conectar();
            const collection = db.collection('Camiones');
            await collection.findOneAndReplace({ patente }, camion);
            await this.conexion.desconectar();
        }
        catch (e) {
            throw e;
        }
    }
    // funcion borrar: borra un camion segun la patente.
    async borrar(patente) {
        try {
            const db = await this.conexion.conectar();
            const collection = db.collection('Camiones');
            await collection.deleteMany({ patente: patente });
            await this.conexion.desconectar();
        }
        catch (e) {
            throw e;
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
        }
        catch (e) {
            throw e;
        }
    }
    //funcion traerCamionesEnTaller: trae todos los camiones en taller
    async getCamionesEnTaller() {
        try {
            const db = await this.conexion.conectar();
            const collection = db.collection('Camiones');
            const findResult = await collection.find({ enTaller: true }).toArray();
            await this.conexion.desconectar();
            return (findResult);
        }
        catch (e) {
            throw e;
        }
    }
}
export { CamionDao };
