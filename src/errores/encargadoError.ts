class EncargadoError extends Error{
    private mensaje:string
    private type:string

    constructor(mensaje:string, type:string) {
        super(mensaje)
        this.mensaje=mensaje
        this.type=type
    }

    getMensaje() :string {
        return this.mensaje
    }

    getType() :string {
        return this.type
    }

}

export {EncargadoError}