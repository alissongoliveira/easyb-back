const express = require("express");
const router = express.Router();
const controller = require("../controllers/complementos.controller");

router.get("/", controller.listar);
router.post("/", controller.criar);
router.put("/:id/aceitar", controller.aceitar);
router.put("/:id/rejeitar", controller.rejeitar);
router.put("/:id/finalizar", controller.finalizar);

module.exports = router;
