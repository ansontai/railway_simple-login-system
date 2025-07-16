import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// 註冊
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  try {
    await user.save();
    res.status(201).json({ message: '註冊成功！' });
  } catch (err) {
    res.status(400).json({ error: '註冊失敗，帳號可能已存在' });
  }
});

// 登入
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: '帳號錯誤' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: '密碼錯誤' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ message: '登入成功！', token });
});

export default router;
