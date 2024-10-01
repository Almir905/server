import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { registerValidator } from './validations/auth.js';

import UserModel from './models/User.js';

mongoose.connect('mongodb+srv://arsenkerezbekov7:ZpoftNz9jpGHT7IW@cluster0.a8thr.mongodb.net/mydatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log("DB OK Arsen");
  })
  .catch((err) => console.log("DB connection error: ", err));

const app = express();

app.use(express.json()); 

app.use(cors({
  origin: 'http://127.0.0.1:5500' // Изменить на нужный адрес фронтенда
}));

app.post('/register', registerValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const doc = new UserModel({
    email: req.body.email,
    fullname: req.body.fullname,
    password: req.body.password,
  });

  try {
    const user = await doc.save(); // Сохранение с `await`
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при сохранении пользователя', error: err });
  }
});

app.get('/', (req, res) => {
  res.send('Arsen Kerezbelov');
});

app.listen(3000, '0.0.0.0', (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
