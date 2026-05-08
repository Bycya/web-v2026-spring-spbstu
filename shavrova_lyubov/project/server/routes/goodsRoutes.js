const express = require("express");
const router = express.Router();

const { getGoods } = require("../controllers/goodsController");

router.get("/goods", getGoods);

module.exports = router;