const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const goodsRoutes = require("./routes/goodsRoutes");
const ordersRoutes = require("./routes/ordersRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(goodsRoutes);
app.use(ordersRoutes);

app.listen(8080, () => {
  console.log("SERVER STARTED");
});