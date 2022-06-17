import { sendMail } from '../services/mail-notifications-service.js'

function contactUs(req) {
    let msg = `name: ${req.firstName} ${req.lastName} email: ${req.email} phone: ${req.phone} /n ${req.contant}`
    sendMail('razonir@gmail.com', req.firstName +' ' + req.lastName,msg)
}

export default { contactUs };