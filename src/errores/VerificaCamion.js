import { CamionError } from './camionError.js';
class VerificaCamion {
    estudiante = { codigo: 0, nombre: '', edad: 0 };
    verificarIntegridad(obj) {
        if (!obj.codigo) {
            throw new CamionError("No existe campo codigo", "DATO_INVALIDO");
        }
        if (!obj.nombre) {
            throw new CamionError("No existe campo nombre", "DATO_INVALIDO");
        }
        if (!obj.edad) {
            throw new CamionError("No existe campo edad", "DATO_INVALIDO");
        }
    }
}
export { VerificaCamion };
