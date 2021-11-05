import pdf from 'html-pdf';
class Pdf {
    crear(html:string, archivo:string) {
        return new Promise((resolve, reject) => {
            pdf.create(html).toFile(`./output/${archivo}.pdf`, function (err, res) {
                if (err) {
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