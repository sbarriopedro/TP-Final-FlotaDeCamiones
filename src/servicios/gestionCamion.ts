import { ICamion } from "../modelo/camion"
import {CamionDao} from '../dao/CamionDao.js'

class GestionCamion {
    private camionDao : CamionDao = new CamionDao()

    async ingresoTaller(patente:string){
        
        const camion = await this.camionDao.buscarPorPatente(patente)
        
        if (camion){
            const camionAux:ICamion = {
                patente: camion.patente,
                kilometraje: camion.kilometraje,
                ultimoServiceAceite: camion.ultimoServiceAceite,
                ultimoServiceNeumatico: camion.ultimoServiceNeumatico,
                ultimoServiceFiltro: camion.ultimoServiceFiltro,
                enTaller: true
            } 
            await this.camionDao.modificar(patente, camionAux)
        }
    }
    

    async actualizarKilometraje (patente:string, km:number){
        
        const camion = await this.camionDao.buscarPorPatente(patente)

        if (camion){
             const camionAux : ICamion = {
                patente: camion.patente,
                kilometraje: km,
                ultimoServiceAceite: camion.ultimoServiceAceite,
                ultimoServiceNeumatico: camion.ultimoServiceNeumatico,
                ultimoServiceFiltro: camion.ultimoServiceFiltro,
                enTaller: camion.enTaller 
            }
            this.camionDao.modificar (patente,camionAux)
        }
    }
 
    async actualizarService (patente: string,service:string){
        const camion = await this.camionDao.buscarPorPatente(patente)

        if (camion){
            const camionAux : ICamion = {
                patente: camion.patente,
                kilometraje: camion.kilometraje,
                ultimoServiceAceite: camion.ultimoServiceAceite,
                ultimoServiceNeumatico: camion.ultimoServiceNeumatico,
                ultimoServiceFiltro: camion.ultimoServiceFiltro,
                enTaller: camion.enTaller 
            }
        
            switch (service) {
                case "aceite":
                    camionAux.ultimoServiceAceite=camion.kilometraje
                    break;
                case "neumatico":
                    camionAux.ultimoServiceNeumatico=camion.kilometraje
                    break;
                case "aire":
                    camionAux.ultimoServiceFiltro=camion.kilometraje
                    break;
                default:
                    console.log("Servicio inexistente")  
            }
        
            await this.camionDao.modificar (patente,camionAux)
        }

    }

}

export {GestionCamion}


// patente: string,
// kilometraje: number,
// ultimoServiceAceite: number,
// ultimoServiceNeumatico: number,
// ultimoServiceFiltro: number,
// enTaller: boolean, 