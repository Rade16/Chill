const { User } = require("./../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    console.log("Полученные данные:", req.body);

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Ошибка при регистрации",
          errors: errors.array().map((error) => error.msg),
        });
      }

      const { username, password, email } = req.body;

      const candidateByUsername = await User.findOne({ where: { username } });
      if (candidateByUsername) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }

      const candidateByEmail = await User.findOne({ where: { email } });
      if (candidateByEmail) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);

      const user = await User.create({
        username,
        password: hashPassword,
        email,
      });

      return res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Ошибка регистрации" });
    }
  }

  async login(req, res) {
    console.log("Полученные данные для входа:", req.body);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Ошибка при регистрации",
          errors: errors.array().map((error) => error.msg),
        });
      }
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${email} не найден` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }

      const token = generateAccessToken(user.id);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Ошибка при входе" });
    }
  }

  async auth(req, res) {
    try {
      console.log("Проверка authMiddleware:", req.user);

      const user = await User.findOne({ where: { id: req.user.id } });
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const token = generateAccessToken(user.id);

      return res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Server error" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Ошибка при получении пользователей" });
    }
  }


  async updateUser(req, res) {
    try {
      console.log("Получен запрос на обновление:", req.params.id, req.body);
      const { id } = req.params;
      const { username, email } = req.body;
      const avatar = req.file ? `/users/${req.file.filename}` : null;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      if (username && username.trim() !== "" && username !== user.username) {
        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
          return res.status(400).json({ message: "Имя пользователя занято" });
        }
        user.username = username;
      }

      if (email && email.trim() !== "" && email !== user.email) {
        user.email = email;
      }

      if (avatar) {
        user.avatar = avatar;
      }

      await user.save();

      return res.json({ message: "Пользователь успешно обновлен" });
    } catch (error) {
      console.error("Error in updateUser:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  async updatePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || currentPassword.trim() === "") {
        return res.status(400).json({ message: "Не указан текущий пароль" });
      }

      if (!newPassword || newPassword.trim() === "") {
        return res.status(400).json({ message: "Не указан новый пароль" });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const isPasswordValid = bcrypt.compareSync(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Текущий пароль неверен" });
      }

      const hashedNewPassword = bcrypt.hashSync(newPassword, 7);
      user.password = hashedNewPassword;

      await user.save();

      return res.json({ message: "Пароль успешно обновлен" });
    } catch (error) {
      console.error("Error in updatePassword:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
}

module.exports = new authController();
