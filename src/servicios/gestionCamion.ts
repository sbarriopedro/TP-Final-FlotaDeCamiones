import { ICamion } from "../modelo/camion"
import {CamionDao} from '../dao/CamionDao.js'

class GestionCamion {
    private camionDao : CamionDao = new CamionDao()

    async crear(camion:ICamion){
        const resultado = await this.camionDao.agregar(camion)
    }

    async  buscarPorPatente(patente:string)  {
        return  this.camionDao.buscarPorPatente(patente)
            .then(camion => {
                if (camion) {
                    return  (camion)
                } else {
                    console.log('camion no encontrado')
                }
            })
            .catch(error => console.error(error))

    }

    async borrarPorPatente(patente:string){
        return  this.camionDao.buscarPorPatente(patente)
            .then(camion => {
                if (camion) {
                    this.camionDao.borrar(patente)
                } else {
                    console.log('camion no encontrado')
                }
            })
            .catch(error => console.error(error))

        
    }
 

}

export {GestionCamion}