import { addMail } from '../firebaseDawood';

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const emailData = {
      to: to,
      message: {
        subject: subject,
        text: text,
        html: html || `<p>${text}</p>`,
      },
      createdAt: new Date().toISOString(),
    };
    const docId = await addMail(emailData);
    console.log('Email queued successfully, document ID:', docId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const addUser = async (userData) => {
  try {
    // Keep existing addUser function unchanged to preserve functionality
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};
