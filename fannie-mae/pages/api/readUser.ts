import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the `id` from the URL query
  const { id } = req.body;

  try {
    // Convert the id to a number and fetch the user
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    // If no user is found, return a 404
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user as JSON
    res.status(200).json(user);
  } catch (error) {
    // For the sake of simplicity, we're just logging the error
    // In production, you'd want to hide sensitive error details from the client
    console.error('Request error', error);
    res.status(500).json({ error: 'Error fetching user' });
  } finally {
    // Ensure that the Prisma Client instance is disconnected after the response is sent
    await prisma.$disconnect();
  }
}