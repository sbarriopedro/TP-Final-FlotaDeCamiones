import {MongoClient} from 'mongodb'

class ConectarMongoDB{
      
   // Connection URL
    //para base de datos en la nube
    private url = process.env.CNX_STR;

    private client = new MongoClient(this.url);

    // Database Name
    private dbName = 'FlotaCamiones';

    async conectar(){
        // utiliza el metodo 'connect' para conectarse al servidor.
        await this.client.connect();
        console.log('Conectado a mongo db');
        //devuelve el manejador de db
        const db = this.client.db(this.dbName);
    
        return db
    }
    
    async desconectar(){
        //cierra la coneccion a db.
        await this.client.close()
        console.log ('deconectado')
    }

}
   
export {ConectarMongoDB}
 
