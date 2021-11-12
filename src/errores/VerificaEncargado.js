import { EncargadoDao } from '../dao/EncargadoDao.js';
import { EncargadoError } from './encargadoError.js';
class VerificaEncargado {
    encargadoDao = new EncargadoDao();
    async verificarUserID(userId) {
        try {
            const encargado = await this.encargadoDao.buscarPorUserID(userId);
            if (encargado) {
                throw new EncargadoError("El UserID ya existe", "DATO_EXISTENTE");
            }
        }
        catch (e) {
            throw (e);
        }
    }
    /*   async verificarDni (dni:number){
          try {
              const encargado = await this.encargadoDao.buscarPorUserID (userId)
              if (encargado){
                  throw new EncargadoError ("El UserID ya existe","DATO_EXISTENTE")
              }
          } catch (e) {
              throw (e)
          }
      }
   */
    verificarIntegridad(obj) {
        if (!obj.dni) {
            throw new EncargadoError("No existe campo dni", "DATO_INVALIDO");
        }
        if (!obj.nombre) {
            throw new EncargadoError("No existe campo nombre", "DATO_INVALIDO");
        }
        if (!obj.apellido) {
            throw new EncargadoError("No existe campo apellido", "DATO_INVALIDO");
        }
        if (!obj.userID) {
            throw new EncargadoError("No existe campo UserID", "DATO_INVALIDO");
        }
        if (!obj.password) {
            throw new EncargadoError("No existe campo password", "DATO_INVALIDO");
        }
        if (!obj.perfil) {
            throw new EncargadoError("No existe campo perfil", "DATO_INVALIDO");
        }
    }
}
export { VerificaEncargado };
// dni:number,
// nombre:string,
// apellido:string,
// userID:string,
// password:string,
//perfil:string,
