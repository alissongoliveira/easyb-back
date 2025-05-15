const express = require("express");
const router = express.Router();
const pesagemController = require("../controllers/pesagens.controller");

router.get("/", pesagemController.listar);
router.get("/:id", pesagemController.buscarPorId);
router.post("/", pesagemController.criar);

module.exports = router;
