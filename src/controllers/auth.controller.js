import { prisma } from '../services/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) return res.status(400).json({ message: 'Phone number already exists.' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, phone, email, password: hashed }
    });

    res.status(201).json({ message: 'Registered successfully', userId: user.id });
  } catch (err) {
    console.error('Registration failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error('Login failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
