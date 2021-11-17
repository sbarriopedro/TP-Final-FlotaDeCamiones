import { resolve } from "path/posix";
import nodemailer from 'nodemailer'

const asunto='Reporte de flota'
const cuerpoMensaje='Se le informa que se generó el reporte de flota. Verifique su casilla de correo'

class email {
  
    enviar() :Promise<any>{


        return new Promise((resolve,reject)=> {

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    
                    user : process.env.EMAILUSUARIO,
                    pass: process.env.EMAILPASSWORD
                }
            });

            const mailOptions = {
                from: process.env.EMAILUSUARIO,
                to: process.env.EMAILUSUARIO,
                subject: asunto,
                text: cuerpoMensaje,               
            }

            transporter.sendMail(mailOptions,function (err,info){
                if(err){
                    throw err
                }else{
                    console.log(info)
                }

            })

        })
    }


}
export {email}