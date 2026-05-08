const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const createOrder = async (req, res) => {
  try {
    const order = {
      id: uuidv4(),
      date: new Date().toISOString(),
      ...req.body,
    };

    const ordersPath = path.join(__dirname, "../data/orders.json");
    const ordersData = await fs.readFile(ordersPath, "utf-8");
    const orders = JSON.parse(ordersData);
    orders.push(order);

    await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));
    res.json({ success: true, orderId: order.id });
  } catch (e) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const getOrders = async (req, res) => {
  try {
    const ordersPath = path.join(__dirname, "../data/orders.json");
    const ordersData = await fs.readFile(ordersPath, "utf-8");
    const orders = JSON.parse(ordersData);
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = { createOrder, getOrders };
