import {IUsuario} from './usuario.js'

interface IEncargado extends IUsuario{
    perfil:string,
}

export{IEncargado}