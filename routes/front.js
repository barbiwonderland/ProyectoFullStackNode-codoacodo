const express = require("express");
const router = express.Router();
const {
  sobreNosotrosGet,
  productoDetalleGet,
  indexGet,
  contactoGet,
  comoComprarGet,
  contactoPost,
  productosGet,
} = require("../contollers/front.js");
router.get("/", indexGet);
router.get("/productos", productosGet);
router.get("/como-comprar", comoComprarGet);
router.get("/contacto", contactoGet);
router.get("/producto-detalle", productoDetalleGet);
router.get("/sobre-nosotros", sobreNosotrosGet);
router.post("/contacto", contactoPost);

module.exports = router;
