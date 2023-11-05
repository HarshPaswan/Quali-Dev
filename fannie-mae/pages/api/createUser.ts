import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Extract user data from the request body
    const userData = req.body;

    try {
      // Create a new user with the provided user data
      const newUser = await prisma.user.create({
        data: userData,
      });
      // Send back the created user's ID (or any other necessary data)
      res.status(200).json({ id: newUser.id });
    } catch (error) {
      console.error('Failed to create user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}