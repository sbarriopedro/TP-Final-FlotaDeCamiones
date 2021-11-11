import { ICamion } from "../modelo/camion"
import {CamionDao} from '../dao/CamionDao.js'

class GestionCamion {
    private camionDao : CamionDao = new CamionDao()

//     async crear(camion:ICamion){
//         const resultado = await this.camionDao.agregar(camion)
//     }

//     async  buscarPorPatente(patente:string)  {
//         return  this.camionDao.buscarPorPatente(patente)
//             .then(camion => {
//                 if (camion) {
//                     return  (camion)
//                 } else {
//                     console.log('camion no encontrado')
//                 }
//             })
//             .catch(error => console.error(error))

//     }

//     async borrarPorPatente(patente:string){
//         return  this.camionDao.buscarPorPatente(patente)
//             .then(camion => {
//                 if (camion) {
//                     this.camionDao.borrar(patente)
//                 } else {
//                     console.log('camion no encontrado')
//                 }
//             })
//             .catch(error => console.error(error))

        
//     }



   

// async servicio(patente:string,servicio:string){

//     this.camionDao.buscarPorPatente(patente)
// .then(camion=> {
//     if (camion){
            
//         switch (servicio) {
//             case "aceite":
//              camion.ultimoServiceAceite=camion.kilometraje
//             break;
//             case "neumatico":
//              camion.ultimoServiceNeumatico=camion.kilometraje
//               break;
           
//             case "aire":
//               camion.ulitmoServiceFiltro=camion.kilometraje
//               break;

//             default:
//                 console.log("Servicio inexistente")  
           
//           }


//         const camionAux:ICamion = {
//             patente: camion.patente,
//             kilometraje: camion.kilometraje,
//             ultimoServiceAceite: camion.ultimoServiceAceite,
//             ultimoServiceNeumatico: camion.ultimoServiceNeumatico,
//             ultimoServiceFiltro: camion.ulitmoServiceFiltro,
//             enTaller: false
//     } 
//     console.log(camion)
//     this.camionDao.modificar(camionAux)
//         .then (()=> console.log ('el camion fue modificado'))
//         .catch(error=>console.error(error))
// }
// })
// }


 
//     async ingresoTaller(patente:string){
//         this.camionDao.buscarPorPatente(patente)
//         .then(camion=> {
//             if (camion){
                 
//                 const camionAux:ICamion = {
//                     patente: camion.patente,
//                     kilometraje: camion.kilometraje,
//                     ultimoServiceAceite: camion.ultimoServiceAceite,
//                     ultimoServiceNeumatico: camion.ultimoServiceNeumatico,
//                     ultimoServiceFiltro: camion.ulitmoServiceFiltro,
//                     enTaller: true
//             } 
//             console.log(camion)
//             this.camionDao.modificar(camionAux)
//                 .then (()=> console.log ('el camion fue modificado'))
//                 .catch(error=>console.error(error))
//         }
//     })
//     }



//     async actualizarKilometraje (patente:string, km:number){
//         this.camionDao.buscarPorPatente(patente)
//         .then(camion=> {
//             if (camion){
                 
//                 const camionAux:ICamion = {
//                     patente: camion.patente,
//                     kilometraje: camion.kilometraje+km,
//                     ultimoServiceAceite: camion.ultimoServiceAceite,
//                     ultimoServiceNeumatico: camion.ultimoServiceNeumatico,
//                     ultimoServiceFiltro: camion.ulitmoServiceFiltro,
//                     enTaller: false
//             } 
//             console.log(camion)
//             this.camionDao.modificar(camionAux)
//                 .then (()=> console.log ('el camion fue modificado'))
//                 .catch(error=>console.error(error))
//         }
//     })


//     }
 }

export {GestionCamion}