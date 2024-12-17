// API route for fetching and submitting packages/bookings
import { fetchPackages, submitBooking } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Handle GET requests for fetching packages
    try {
      const packages = await fetchPackages(); // Your fetch function to get packages
      res.status(200).json(packages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch packages' });
    }
  } else if (req.method === 'POST') {
    // Handle POST requests for submitting bookings
    try {
      const result = await submitBooking(req.body); // Your function to submit booking
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit booking' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
