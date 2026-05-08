const fs = require("fs/promises");
const path = require("path");

const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ message: "Заполните все поля" });
    }

    const usersPath = path.join(__dirname, "../data/users.json");
    const usersData = await fs.readFile(usersPath, "utf-8");
    const users = JSON.parse(usersData);

    const user = users.find(
      (u) => u.login === login && u.password === password
    );

    if (!user) {
      return res.status(401).json({
        message: "Неверный логин или пароль — проверьте данные",
      });
    }

    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } catch (e) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const logout = (req, res) => {
  res.json({ success: true });
};

module.exports = { login, logout };
