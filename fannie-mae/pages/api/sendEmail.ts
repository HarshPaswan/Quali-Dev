import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  // Ensure method is POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Destructure the email data from the request body
  const { to, subject, text, html } = req.body;

  // Create a transporter using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'mail.rennyhoang.com', // Replace with your mail server settings
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'renny@rennyhoang.com',
      pass: 'PkgE3TVv5ooKKe',
    },
  });

  // Send mail with defined transport object
  let info;
  try {
    info = await transporter.sendMail({
      from: 'renny@rennyhoang.com', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html, // HTML body content
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Error sending email' });
  }

  res.status(200).json({ success: true, message: `Email sent: ${info.messageId}` });
}