class AltaCamion {
    patente;
    kilometraje;
    ultimoServiceAceite;
    ultimoServiceNeumatico;
    ulitmoServiceFiltro;
    enServicio;
    constructor(pat, km, ultimoAceite, ultimoFiltro, ultimoNeumatico, enServ) {
        this.patente = pat;
        this.kilometraje = km;
        this.ultimoServiceAceite = ultimoAceite;
        this.ulitmoServiceFiltro = ultimoFiltro;
        this.ultimoServiceNeumatico = ultimoNeumatico;
        this.enServicio = enServ;
    }
}
export {};
