class EncargadoError extends Error {
    mensaje;
    type;
    constructor(mensaje, type) {
        super(mensaje);
        this.mensaje = mensaje;
        this.type = type;
    }
    getMensaje() {
        return this.mensaje;
    }
    getType() {
        return this.type;
    }
}
export { EncargadoError };
