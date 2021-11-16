import pdf from 'html-pdf';
import fs from 'fs';
class Pdf {
    crear() {
        return new Promise((resolve, reject) => {
            var num = Math.floor(Math.random() * (50000 - 0)) + 0;
            var html = fs.readFileSync('./src/compartido/html.html', 'utf8');
            const archivo = `./output/flotaCamiones_${num}.pdf`;
            pdf.create(html).toFile(archivo, function (err, res) {
                if (err) {
                    // lanzar una excepcion
                    reject("Error al crear archivo pdf");
                }
                else {
                    resolve("Archivo creado");
                }
            });
        });
    }
}
export { Pdf };
