const express = require("express")
const router = express.Router()
const {
  agregarProductoGet,
  editarProductoGet,
  loginGet,
  adminGet,
  agregarProductoPost,
  editarProductoPost,
  borrarProductoGet,
} = require("../contollers/back.js")
router.get("/admin", adminGet)
router.get("/agregar-producto", agregarProductoGet)
router.post("/agregar-producto", agregarProductoPost)
router.get("/editar-producto/:id", editarProductoGet)
router.post("/editar-producto/:id", editarProductoPost)
router.get("/login", loginGet)
router.get("/borrar/:id", borrarProductoGet)
module.exports = router
