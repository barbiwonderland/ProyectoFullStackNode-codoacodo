//const productos = require('../data/products.json');
require("dotenv").config()
const db = require("../models/connection.js")
const nodemailer = require("nodemailer")

const indexGet = function (req, res) {
  let sql = "SELECT * FROM productos WHERE destacado = 1"
  db.query(sql, (err, data) => {
    if (err) throw err
    console.log(data)
    res.render("index", {
      titulo: "Mi página web",
      productos: data,
    })
  })
}

const comoComprarGet = function (req, res) {
  res.render("como-comprar", {
    titulo: "Como comprar",
  })
}
const contactoGet = function (req, res) {
  res.render("contacto", {
    titulo: "Contacto",
  })
}
const contactoPost = function (req, res) {
  const info = req.body

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: info.email,
    to: "baarbarabottazzi@gmail.com",
    subject: info.asunto,
    html: `
           <h1>${info.nombre}</h1>
           <p>${info.mensaje}</p>
       `,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).render("contacto", {
        mensaje: `Ha ocurrido el siguiente error ${error.message}`,
        mostrar: true,
        clase: "danger",
      })
    } else {
      res.status(200).render("contacto", {
        mensaje: "Mail enviado correctamente",
        mostrar: true,
        clase: "success",
      })
    }
  })
  /* 
       SMTP_HOST=smtp.gmail.com
       SMTP_PORT=465
       SMTP_USERNAME=hello@example.com
       SMTP_PASSWORD=generatedPassword
   */
}
const productoDetalleGet = function (req, res) {
  res.render("producto-detalle", {
    titulo: "Detalle del producto",
  })
}
const sobreNosotrosGet = function (req, res) {
  res.render("sobre-nosotros", {
    titulo: "Sobre nosotros",
  })
}

module.exports = {
  sobreNosotrosGet,
  productoDetalleGet,
  indexGet,
  contactoGet,
  comoComprarGet,
  contactoPost,
}
