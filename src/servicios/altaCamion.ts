import {ICamion} from '../modelo/camion.js'

class AltaCamion    {
    patente: string;
    kilometraje: number;
    ultimoServiceAceite: number;
    ultimoServiceNeumatico: number;
    ulitmoServiceFiltro: number;
    enServicio: boolean;

    constructor(pat:string, km:number,ultimoAceite:number,ultimoFiltro:number,ultimoNeumatico:number,enServ:boolean){

        this.patente=pat;
        this.kilometraje=km;
        this.ultimoServiceAceite=ultimoAceite;
        this.ulitmoServiceFiltro=ultimoFiltro;
        this.ultimoServiceNeumatico=ultimoNeumatico;
        this.enServicio=enServ;



    }

 
    
    
 



}