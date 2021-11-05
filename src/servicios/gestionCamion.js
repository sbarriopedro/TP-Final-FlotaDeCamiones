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
}
export { GestionCamion };
