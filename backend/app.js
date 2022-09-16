require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const helmet = require('helmet');

const cors = require('cors');

const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

app.use(cors(
  {
    origin: ['http://localhost:3001', 'https://localhost:3001', 'https://meremost.nomorepartiesxyz.ru', 'http://meremost.nomorepartiesxyz.ru'],
    credentials: true,
  },
));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

const main = async (next) => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
  } catch (err) {
    next(err);
  }
  try {
    await app.listen(PORT);
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  } catch (err) {
    next(err);
  }
};

main();

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
