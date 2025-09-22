const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Папка для фото
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Статика (главная и форма)
app.use(express.static(path.join(__dirname, "public")));

// Настройка загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Маршрут загрузки фото
app.post("/upload", upload.single("photo"), (req, res) => {
  if (!req.file) return res.send("Файл не загружен");
  res.send(`<h2>Спасибо! Фото загружено.</h2><a href="/">Вернуться на главную</a>`);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
