require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const router = require('./routes/router');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors')
const { PORT = 3000 } = process.env; // Слушаем 3000 порт

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:3000', 'https://server.nomoreparties.co', 'http://server.nomoreparties.co', 'https://api.server.nomoreparties.co', 'http://api.server.nomoreparties.co'],
  credentials: true,
}));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
