import { ConectarMongoDB } from './ConectarMongoDB.js';
class ChoferDao {
    conexion = new ConectarMongoDB();
    //funcion agregar: agregar un camion.
    async agregar(chofer) {
        try {
            const db = await this.conexion.conectar();
            const collection = db.collection('Choferes');
            const insertOneResult = await collection.insertOne(chofer);
            await this.conexion.desconectar();
        }
        catch (e) {
            throw e;
        }
    }
    // funcion buscarPorUserID: busca un chofer segun UserId.
    async buscarPorUserID(userId) {
        try {
            const db = await this.conexion.conectar();
            const collection = db.collection('Choferes');
            const choferEncontrado = await collection.findOne({ userId: userId });
            await this.conexion.desconectar();
            return (choferEncontrado);
        }
        catch (e) {
            throw e;
        }
    }
    // //funcion modificar: recibe un camion y lo reemplaza en la bd.
    // async modificar(patente:string,camion:ICamion){
    //     try{
    //         const db = await this.conexion.conectar();
    //         const collection = db.collection('Camiones');
    //         await collection.findOneAndReplace({patente},camion)
    //         await this.conexion.desconectar();
    //     }catch(e){
    //         throw e 
    //     }
    // }
    // funcion borrar: borra un camion segun la patente.
    async borrar(userId) {
        try {
            const db = await this.conexion.conectar();
            const collection = db.collection('Choferes');
            await collection.deleteMany({ userId: userId });
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
            const collection = db.collection('Choferes');
            const findResult = await collection.find({}).toArray();
            await this.conexion.desconectar();
            return (findResult);
        }
        catch (e) {
            throw e;
        }
    }
}
export { ChoferDao };
