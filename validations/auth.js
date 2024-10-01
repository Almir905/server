import { body } from 'express-validator';

export const registerValidator = [
  body('email', 'Некорректный email').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('fullname', 'Имя должно содержать минимум 3 символа').isLength({ min: 3 }),
];
