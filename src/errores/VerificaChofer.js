import { ChoferDao } from '../dao/ChoferDao.js';
import { ChoferError } from './choferError.js';
class VerificaChofer {
    choferDao = new ChoferDao();
    async verificarUserId(userId) {
        try {
            const chofer = await this.choferDao.buscarPorUserID(userId);
            if (chofer) {
                throw new ChoferError("El UserID ya existe", "DATO_EXISTENTE");
            }
        }
        catch (e) {
            throw (e);
        }
    }
    // async verificarDni (dni:number){
    //     try {
    //         const chofer = await this.choferDao.buscarPordni (dni)
    //         if (chofer){
    //             throw new ChoferError ("El UserID ya existe","DATO_EXISTENTE")
    //         }
    //     } catch (e) {
    //         throw (e)
    //     }
    // }
    verificarIntegridad(obj) {
        if (!obj.dni) {
            throw new ChoferError("No existe campo dni", "DATO_INVALIDO");
        }
        if (!obj.nombre) {
            throw new ChoferError("No existe campo nombre", "DATO_INVALIDO");
        }
        if (!obj.apellido) {
            throw new ChoferError("No existe campo apellido", "DATO_INVALIDO");
        }
        if (!obj.userId) {
            throw new ChoferError("No existe campo userId", "DATO_INVALIDO");
        }
        if (!obj.password) {
            throw new ChoferError("No existe campo password", "DATO_INVALIDO");
        }
        if (!obj.perfil) {
            throw new ChoferError("No existe campo perfil", "DATO_INVALIDO");
        }
    }
}
export { VerificaChofer };
// dni:number,
// nombre:string,
// apellido:string,
// userID:string,
// password:string,
//perfil:string,
