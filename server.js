const express = require("express")
const app = express()
const hbs = require("hbs")
require("./views/helpers/helpers.js")
//modulo nativo
const path = require("path")
const rutasBack = require("./routes/back.js")
const rutasFront = require("./routes/front.js")
const session = require("express-session")
const port = process.env.PORT || 3000
//sesiones mediante cookies
app.use(
  session({
    secret: "sarasa",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 300000 }, // 5 minutos
  })
)

//middleware para tomar datos form
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  })
)
// Fija una ruta estatica
app.use(express.static("public"))
app.set("view engine", "hbs")
app.set("views", [
  path.join("./views/front"),
  path.join("./views/back"),
  path.join("./views"),
])
hbs.registerPartials(__dirname + "/views/partials") // indicamos el directorio hacia los parciales

app.use("/", rutasFront)
app.use("/", rutasBack)
app.use((req, res, next) => {
  res.status(404).render("404")
})

app.listen(port)
