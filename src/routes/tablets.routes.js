const express = require("express");
const router = express.Router();
const controller = require("../controllers/tablets.controller");

router.get("/", controller.listar);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);

module.exports = router;
