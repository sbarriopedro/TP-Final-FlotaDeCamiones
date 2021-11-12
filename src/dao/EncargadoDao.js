import { ConectarMongoDB } from './ConectarMongoDB.js';
class EncargadoDao {
    conexion = new ConectarMongoDB();
    //funcion agregar: agregar un encargado.
    async agregar(encargado) {
        try {
            const db = await this.conexion.conectar();
            const collection = db.collection('Encargados');
            const insertOneResult = await collection.insertOne(encargado);
            await this.conexion.desconectar();
        }
        catch (e) {
            throw e;
        }
    }
    // funcion buscarPoruserID: busca un encargado segun userID
    async buscarPorUserID(userId) {
        try {
            const db = await this.conexion.conectar();
            const collection = db.collection('Encargados');
            const encargadoEncontrado = await collection.findOne({ userID: userId });
            await this.conexion.desconectar();
            return (encargadoEncontrado);
        }
        catch (e) {
            throw e;
        }
    }
    /*     //funcion modificar: recibe un camion y lo reemplaza en la bd.
        async modificar(userId:string,camion:ICamion){
            try{
                const db = await this.conexion.conectar();
                const collection = db.collection('Camiones');
                await collection.findOneAndReplace({patente},camion)
                await this.conexion.desconectar();
            }catch(e){
                throw e
            }
        } */
    // funcion borrar: borra un encargado por userID
    async borrar(userId) {
        try {
            const db = await this.conexion.conectar();
            const collection = db.collection('Encargados');
            await collection.deleteMany({ userID: userId });
            await this.conexion.desconectar();
        }
        catch (e) {
            throw e;
        }
    }
    //funcion getAll: trae todos los Encargados
    async getAll() {
        try {
            const db = await this.conexion.conectar();
            const collection = db.collection('Encargados');
            const findResult = await collection.find({}).toArray();
            await this.conexion.desconectar();
            return (findResult);
        }
        catch (e) {
            throw e;
        }
    }
}
export { EncargadoDao };
