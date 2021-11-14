import { nextTick } from 'process';
import { CamionDao } from '../dao/CamionDao.js';
import { CamionError } from './camionError.js';

class VerificaCamion {
    
    private camionDao:CamionDao = new CamionDao();

    async verificarPatente (patente:string){
        try {
            const camion = await this.camionDao.buscarPorPatente (patente)
            if (camion){
                throw new CamionError ("El camion ya existe","DATO_EXISTENTE")
            }
        } catch (e) {
            throw (e)
        }
    }

    verificarIntegridad(obj:any) {
        if (!obj.patente) {
            throw new CamionError("No existe campo patente", "DATO_INVALIDO");
        }
        if (!obj.kilometraje) {
            throw new CamionError("No existe campo kilometraje", "DATO_INVALIDO");
        }
        if (!obj.ultimoServiceAceite) {
            throw new CamionError("No existe campo ultimoServiceAceite", "DATO_INVALIDO");
        }
        if (!obj.ultimoServiceNeumatico) {
            throw new CamionError("No existe campo ultimoServiceNeumatico", "DATO_INVALIDO");
        }
        if (!obj.ultimoServiceFiltro) {
            throw new CamionError("No existe campo ultimoServiceFiltro", "DATO_INVALIDO");
        }
        if (obj.enTaller == null) {
            throw new CamionError("No existe campo enTaller", "DATO_INVALIDO");
        }
    }

    async verificarKM (patente:string,km:number){
        try {
            const camion = await this.camionDao.buscarPorPatente (patente)
            if (camion){
                if (camion.kilometraje > km)
                throw new CamionError ("El kilometraje ingresado es menor al kilometraje actual","DATO_ERRONEO")
            }
        } catch (e) {
            throw (e)
        }
    }
    

}
export { VerificaCamion };

// {
//     "_id": "618464cd7219f372ff790769",
//     "patente": "xyz123",
//     "kilometraje": 10000,
//     "ultimoServiceAceite": 5000,
//     "ultimoServiceNeumatico": 3000,
//     "ultimoServiceFiltro": 7000,
//     "enServicio": false
// }