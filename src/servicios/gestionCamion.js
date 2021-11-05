import { CamionDao } from '../dao/CamionDao.js';
class GestionCamion {
    camionDao = new CamionDao();
    async crear(camion) {
        const resultado = await this.camionDao.agregar(camion);
    }
    async buscarPorPatente(patente) {
        return this.camionDao.buscarPorPatente(patente)
            .then(camion => {
            if (camion) {
                return (camion);
            }
            else {
                console.log('camion no encontrado');
            }
        })
            .catch(error => console.error(error));
    }
    async borrarPorPatente(patente) {
        return this.camionDao.buscarPorPatente(patente)
            .then(camion => {
            if (camion) {
                this.camionDao.borrar(patente);
            }
            else {
                console.log('camion no encontrado');
            }
        })
            .catch(error => console.error(error));
    }
    async servicio(patente, servicio) {
        this.camionDao.buscarPorPatente(patente)
            .then(camion => {
            if (camion) {
                switch (servicio) {
                    case "aceite":
                        camion.ultimoServiceAceite = camion.kilometraje;
                        break;
                    case "neumatico":
                        camion.ultimoServiceNeumatico = camion.kilometraje;
                        break;
                    case "aire":
                        camion.ulitmoServiceFiltro = camion.kilometraje;
                        break;
                    default:
                        console.log("Servicio inexistente");
                }
                const camionAux = {
                    patente: camion.patente,
                    kilometraje: camion.kilometraje,
                    ultimoServiceAceite: camion.ultimoServiceAceite,
                    ultimoServiceNeumatico: camion.ultimoServiceNeumatico,
                    ulitmoServiceFiltro: camion.ulitmoServiceFiltro,
                    enTaller: false
                };
                console.log(camion);
                this.camionDao.modificar(camionAux)
                    .then(() => console.log('el camion fue modificado'))
                    .catch(error => console.error(error));
            }
        });
    }
    async ingresoTaller(patente) {
        this.camionDao.buscarPorPatente(patente)
            .then(camion => {
            if (camion) {
                const camionAux = {
                    patente: camion.patente,
                    kilometraje: camion.kilometraje,
                    ultimoServiceAceite: camion.ultimoServiceAceite,
                    ultimoServiceNeumatico: camion.ultimoServiceNeumatico,
                    ulitmoServiceFiltro: camion.ulitmoServiceFiltro,
                    enTaller: true
                };
                console.log(camion);
                this.camionDao.modificar(camionAux)
                    .then(() => console.log('el camion fue modificado'))
                    .catch(error => console.error(error));
            }
        });
    }
    async actualizarKilometraje(patente, km) {
        this.camionDao.buscarPorPatente(patente)
            .then(camion => {
            if (camion) {
                const camionAux = {
                    patente: camion.patente,
                    kilometraje: camion.kilometraje + km,
                    ultimoServiceAceite: camion.ultimoServiceAceite,
                    ultimoServiceNeumatico: camion.ultimoServiceNeumatico,
                    ulitmoServiceFiltro: camion.ulitmoServiceFiltro,
                    enTaller: false
                };
                console.log(camion);
                this.camionDao.modificar(camionAux)
                    .then(() => console.log('el camion fue modificado'))
                    .catch(error => console.error(error));
            }
        });
    }
}
export { GestionCamion };
