import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { registerValidator } from '../validations/auth.js'; // Убедитесь, что путь корректен
import UserModel from '../models/User.js'; // Убедитесь, что путь корректен

mongoose.connect('mongodb+srv://arsenkerezbekov7:ZpoftNz9jpGHT7IW@cluster0.a8thr.mongodb.net/mydatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log("DB OK Arsen");
  })
  .catch((err) => console.log("DB connection error: ", err));

const app = express();

app.use(express.json()); 
app.use(cors());

app.post('/api/register', registerValidator, async (req, res) => {
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
    const user = await doc.save();
    res.status(201).json(user); // Возвращаем статус 201
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при сохранении пользователя', error: err.message });
  }
});


export default app;
