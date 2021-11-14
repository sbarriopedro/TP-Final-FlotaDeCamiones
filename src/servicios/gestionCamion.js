import { CamionDao } from '../dao/CamionDao.js';
class GestionCamion {
    ALARMA = 5000;
    camionDao = new CamionDao();
    services = {
        nombre: 'generico',
        KMSERVICEACEITE: 20000,
        KMSERVICEFILTRO: 30000,
        KMSERVICENEUMATICO: 70000
    };
    async ingresoTaller(patente) {
        const camion = await this.camionDao.buscarPorPatente(patente);
        if (camion) {
            const camionAux = {
                patente: camion.patente,
                kilometraje: camion.kilometraje,
                ultimoServiceAceite: camion.ultimoServiceAceite,
                ultimoServiceNeumatico: camion.ultimoServiceNeumatico,
                ultimoServiceFiltro: camion.ultimoServiceFiltro,
                enTaller: true
            };
            await this.camionDao.modificar(patente, camionAux);
        }
    }
    async salidaTaller(patente) {
        const camion = await this.camionDao.buscarPorPatente(patente);
        if (camion) {
            const camionAux = {
                patente: camion.patente,
                kilometraje: camion.kilometraje,
                ultimoServiceAceite: camion.ultimoServiceAceite,
                ultimoServiceNeumatico: camion.ultimoServiceNeumatico,
                ultimoServiceFiltro: camion.ultimoServiceFiltro,
                enTaller: false
            };
            await this.camionDao.modificar(patente, camionAux);
        }
    }
    async actualizarKilometraje(patente, kmNuevo) {
        const camion = await this.camionDao.buscarPorPatente(patente);
        if (camion) {
            const camionAux = {
                patente: camion.patente,
                kilometraje: kmNuevo,
                ultimoServiceAceite: camion.ultimoServiceAceite,
                ultimoServiceNeumatico: camion.ultimoServiceNeumatico,
                ultimoServiceFiltro: camion.ultimoServiceFiltro,
                enTaller: camion.enTaller
            };
            this.camionDao.modificar(patente, camionAux);
        }
    }
    async actualizarService(patente, service) {
        const camion = await this.camionDao.buscarPorPatente(patente);
        if (camion) {
            const camionAux = {
                patente: camion.patente,
                kilometraje: camion.kilometraje,
                ultimoServiceAceite: camion.ultimoServiceAceite,
                ultimoServiceNeumatico: camion.ultimoServiceNeumatico,
                ultimoServiceFiltro: camion.ultimoServiceFiltro,
                enTaller: camion.enTaller
            };
            switch (service) {
                case "aceite":
                    camionAux.ultimoServiceAceite = camion.kilometraje;
                    break;
                case "neumatico":
                    camionAux.ultimoServiceNeumatico = camion.kilometraje;
                    break;
                case "aire":
                    camionAux.ultimoServiceFiltro = camion.kilometraje;
                    break;
                default:
                    console.log("Servicio inexistente");
            }
            await this.camionDao.modificar(patente, camionAux);
        }
    }
    async getServicesAVencer() {
        let aServicesAVencer = [];
        try {
            const aCamiones = await this.camionDao.getAll();
            aServicesAVencer = aCamiones.map(camion => {
                const aServices = [];
                const faltanKmAceite = camion.ultimoServiceAceite + this.services.KMSERVICEACEITE - camion.kilometraje;
                const faltanKmFiltro = camion.ultimoServiceFiltro + this.services.KMSERVICEFILTRO - camion.kilometraje;
                const faltanKmNeumaticos = camion.ultimoServiceNeumatico + this.services.KMSERVICENEUMATICO - camion.kilometraje;
                if (faltanKmAceite <= 5000) {
                    aServices.push({ aceite: faltanKmAceite });
                }
                if (faltanKmFiltro <= 5000) {
                    aServices.push({ filtro: faltanKmFiltro });
                }
                if (faltanKmNeumaticos <= 5000) {
                    aServices.push({ neumaticos: faltanKmNeumaticos });
                }
                if (aServices.length > 0) {
                    return ({ patente: camion.patente, services: aServices });
                }
            });
            return (aServicesAVencer);
        }
        catch (e) {
            throw (e);
        }
    }
}
export { GestionCamion };
// patente: string,
// kilometraje: number,
// ultimoServiceAceite: number,
// ultimoServiceNeumatico: number,
// ultimoServiceFiltro: number,
// enTaller: boolean, 
