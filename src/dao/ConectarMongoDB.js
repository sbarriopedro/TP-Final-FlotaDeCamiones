import { MongoClient } from 'mongodb';
class ConectarMongoDB {
    // Connection URL
    //para base de datos en la nube
    url = process.env.CNX_STR;
    client = new MongoClient(this.url);
    // Database Name
    dbName = 'FlotaCamiones';
    async conectar() {
        // utiliza el metodo 'connect' para conectarse al servidor.
        await this.client.connect();
        console.log('Conectado al servidor');
        //devuelve el manejador de db
        const db = this.client.db(this.dbName);
        return db;
    }
    async desconectar() {
        //cierra la coneccion a db.
        await this.client.close();
        console.log('deconectado');
    }
}
export { ConectarMongoDB };
