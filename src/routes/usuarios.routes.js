const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarios.controller");

router.get("/", usuarioController.listar);
router.get("/:id", usuarioController.buscarPorId);
router.post("/", usuarioController.criar);
router.delete("/:id", usuarioController.deletar);
router.post("/login", usuarioController.login);
router.put("/:id", usuarioController.atualizar);

module.exports = router;
