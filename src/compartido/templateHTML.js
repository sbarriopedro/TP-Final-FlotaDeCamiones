import fs from 'fs';
const cabecera = '<p> FLOTA DE CAMIONES </p>\n';
const separador = '<p>******************************</p>\n';
let completo = '';
let pat = '';
let km = 0;
let aceite = 0;
let neumatico = 0;
let filtro = 0;
class html {
    crearTemplateFlotaCamiones(aCamiones) {
        fs.writeFileSync('./src/compartido/html.html', cabecera);
        fs.appendFileSync('./src/compartido/html.html', separador);
        aCamiones.forEach((element) => {
            pat = element.patente, km = element.kilometraje, aceite = element.ultimoServiceAceite, neumatico = element.ultimoServiceNeumatico, filtro = element.ultimoServiceFiltro;
            completo = '<p>Patente : ' + pat + '</p>\n' + '<p>Kilometraje : ' + km + '</p>\n' + '<p>Ultimo Service Aceite : ' + aceite + '</p>\n' + '<p>Ultimo Service Neumaticos : ' + neumatico + '</p>\n' + '<p>Ultimo Service Filtro : ' + filtro + '</p>\n';
            fs.appendFileSync('./src/compartido/html.html', completo);
            fs.appendFileSync('./src/compartido/html.html', separador);
        });
    }
}
export { html };
