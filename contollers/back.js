//const productos = require("../data/products.json");
require("dotenv").config()
const db = require("../models/connection.js")
const adminGet = function (req, res) {
  let sql = "SELECT * FROM productos"
  db.query(sql, (err, data) => {
    if (err) {
      throw err
    }
    console.log(data)
    res.render("admin", {
      titulo: "Administracion",
      productos: data,
    })
  })
}
const agregarProductoGet = function (req, res) {
  res.render("agregar-producto", {
    titulo: "agregar-producto",
  })
}
//no me funciiona  ver
const agregarProductoPost = (req, res) => {
  const info = req.body
  const sql = "INSERT INTO productos SET ?"
  db.query(sql, info, (err, data) => {
    if (err) throw err
    console.log("Producto agregado")
    res.render("agregar-producto", {
      mensaje: "Producto agregado",
      titulo: "Agregar producto",
    })
  })
}
const editarProductoGet = function (req, res) {
  const id = req.params.id
  const producto = req.body
  const sql = "SELECT * FROM productos WHERE id = ?"
  db.query(sql, id, (err, data) => {
    if (err) throw err
    console.log(data)
    if (!data.length > 0) {
      res.send(`
      <h1>No existe el producto con {{ id }}</h1>
      <a href="/admin">Ver listado de productos</a>
      `)
    } else {
      res.render("editar-producto", {
        titulo: "Editar producto",
        producto: data[0],
      })
    }
  })
}
//no me funciiona  ver
const editarProductoPost = function (req, res) {
  const id = req.params.id
  const producto = req.body
  const sql = "UPDATE productos SET ? WHERE id = ?"
  db.query(sql, [producto, id], (err, data) => {
    if (err) throw err
    console.log(data)
    console.log(data.affected_rows + "Registro actualizado")
    res.redirect("/admin")
  })
}
const borrarProductoGet = (req, res) => {
  const id = req.params.id
  const sql = "DELETE FROM productos WHERE id = ?"
  db.query(sql, id, (err, data) => {
    if (err) throw err
    console.log(data.affected_rows + "registro borrado")
    res.redirect("/admin")
  })
}
const loginGet = function (req, res) {
  res.render("login", {
    titulo: "login",
  })
}

module.exports = {
  adminGet,
  agregarProductoGet,
  editarProductoGet,
  loginGet,
  agregarProductoPost,
  editarProductoPost,
  borrarProductoGet,
}
