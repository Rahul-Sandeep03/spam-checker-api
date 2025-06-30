import { prisma } from '../services/prisma.js';

export const addContact = async (req, res) => {
  const { name, phone } = req.body;
  try {
    const contact = await prisma.contact.create({
      data: { name, phone, userId: req.user.userId }
    });
    res.status(201).json({ message: 'Contact added', contact });
  } catch (err) {
    console.error('Add contact failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const markSpam = async (req, res) => {
  const { phone } = req.body;
  try {
    await prisma.spamReport.create({ data: { phone, reporterId: req.user.userId } });
    res.json({ message: 'Number marked as spam' });
  } catch (err) {
    console.error('Mark spam failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
export const searchByName = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Missing query param q' });

  try {
    const startsWith = await prisma.contact.findMany({
      where: { name: { startsWith: q, mode: 'insensitive' } }
    });
    const contains = await prisma.contact.findMany({
      where: { 
        name: { contains: q, mode: 'insensitive' },
        NOT: { name: { startsWith: q, mode: 'insensitive' } }
      }
    });
    res.json([...startsWith, ...contains]);
  } catch (err) {
    console.error('Search by name failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const searchByPhone = async (req, res) => {
  const { phone } = req.query;
  if (!phone) return res.status(400).json({ message: 'Missing phone query param' });

  try {
    const contacts = await prisma.contact.findMany({ where: { phone } });
    const spamCount = await prisma.spamReport.count({ where: { phone } });
    const totalUsers = await prisma.user.count();
    const spamLikelihood = totalUsers > 0 ? ((spamCount / totalUsers) * 100).toFixed(2) : "0.00";

    res.json({ contacts, spamLikelihood: `${spamLikelihood}%` });
  } catch (err) {
    console.error('Search by phone failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

