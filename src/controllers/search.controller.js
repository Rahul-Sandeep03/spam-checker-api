import { prisma } from '../services/prisma.js';


/**
 * Search users by name: results that start with query first, then those containing it.
 */
export const searchByName = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Missing query param q' });

  try {
    // Find users whose names start with q (case-insensitive)
    const startsWith = await prisma.user.findMany({
      where: { name: { startsWith: q, mode: 'insensitive' } },
      select: { name: true, phone: true, email: true }
    });

    // Find users whose names contain q but do NOT start with q
    const contains = await prisma.user.findMany({
      where: {
        name: { contains: q, mode: 'insensitive' },
        NOT: { name: { startsWith: q, mode: 'insensitive' } }
      },
      select: { name: true, phone: true, email: true }
    });

    // Combine results
    const results = [...startsWith, ...contains];

    res.json(results);
  } catch (err) {
    console.error('❌ Search by name failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Search by phone: look in users first; if not found, look in contacts.
 * Also return spam likelihood based on spam reports.
 */
export const searchByPhone = async (req, res) => {
  const { phone } = req.query;
  if (!phone) return res.status(400).json({ message: 'Missing phone query param' });

  try {
    // Count spam reports for this phone
    const spamCount = await prisma.spamReport.count({ where: { phone } });

    // Try to find the phone in registered users
    const user = await prisma.user.findUnique({ where: { phone } });

    if (user) {
      return res.json({
        name: user.name,
        phone: user.phone,
        email: user.email,
        spamLikelihood: `${spamCount}`
      });
    }

    // If not found in users, check contacts
    const contacts = await prisma.contact.findMany({ where: { phone } });
    const uniqueNames = [...new Set(contacts.map(c => c.name))];

    const results = uniqueNames.map(name => ({
      name,
      phone,
      spamLikelihood: `${spamCount}`
    }));

    res.json(results);
  } catch (err) {
    console.error('❌ Search by phone failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
