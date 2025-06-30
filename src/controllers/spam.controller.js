import { prisma } from '../services/prisma.js';

export const markSpam = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: 'Phone number required' });

  try {
    await prisma.spamReport.create({ data: { phone, reporterId: req.user.userId } });
    res.json({ message: 'Number marked as spam' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark spam', error: err.message });
  }
};
