const fs = require("fs/promises");
const path = require("path");

const getGoods = async (req, res) => {
  try {
    const goodsPath = path.join(__dirname, "../data/goods.json");
    const goodsData = await fs.readFile(goodsPath, "utf-8");
    const goods = JSON.parse(goodsData);
    res.json(goods);
  } catch (e) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = { getGoods };
