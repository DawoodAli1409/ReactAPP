import axios from 'axios';

const projectId = 'internship-2025-465209';
const databaseId = 'dawood'; // Firestore database name as per user info
const encodedDatabaseId = encodeURIComponent(databaseId);
const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${encodedDatabaseId}/documents`;

// Collection paths
const userdataCollection = 'userdata';
const mailCollection = 'mail';

// Helper to convert Firestore document fields to JS object
const parseFirestoreDoc = (doc) => {
  const data = {};
  for (const [key, value] of Object.entries(doc.fields)) {
    if (value.stringValue !== undefined) data[key] = value.stringValue;
    else if (value.integerValue !== undefined) data[key] = parseInt(value.integerValue, 10);
    else if (value.doubleValue !== undefined) data[key] = value.doubleValue;
    else if (value.booleanValue !== undefined) data[key] = value.booleanValue;
    else if (value.timestampValue !== undefined) data[key] = value.timestampValue;
    else data[key] = null;
  }
  return { id: doc.name.split('/').pop(), ...data };
};

// Userdata collection methods
export const getUserdata = async () => {
  try {
    const url = `${baseUrl}/${userdataCollection}`;
    const response = await axios.get(url);
    const documents = response.data.documents || [];
    return documents.map(parseFirestoreDoc);
  } catch (error) {
    console.error('Error fetching userdata:', error);
    throw error;
  }
};

export const addUserdata = async (data) => {
  try {
    const url = `${baseUrl}/${userdataCollection}`;
    const fields = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') fields[key] = { stringValue: value };
      else if (typeof value === 'number') fields[key] = { integerValue: value };
      else if (typeof value === 'boolean') fields[key] = { booleanValue: value };
      else fields[key] = { stringValue: JSON.stringify(value) };
    }
    const response = await axios.post(url, { fields });
    return response.data;
  } catch (error) {
    console.error('Error adding userdata:', error);
    throw error;
  }
};

export const updateUserdata = async (id, data) => {
  try {
    const url = `${baseUrl}/${userdataCollection}/${id}`;
    const fields = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') fields[key] = { stringValue: value };
      else if (typeof value === 'number') fields[key] = { integerValue: value };
      else if (typeof value === 'boolean') fields[key] = { booleanValue: value };
      else fields[key] = { stringValue: JSON.stringify(value) };
    }
    const response = await axios.patch(url, { fields });
    return response.data;
  } catch (error) {
    console.error('Error updating userdata:', error);
    throw error;
  }
};

export const deleteUserdata = async (id) => {
  try {
    const url = `${baseUrl}/${userdataCollection}/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.error('Error deleting userdata:', error);
    throw error;
  }
};

// Mail collection method
export const addMail = async (data) => {
  try {
    const url = `${baseUrl}/${mailCollection}`;
    const fields = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') fields[key] = { stringValue: value };
      else if (typeof value === 'number') fields[key] = { integerValue: value };
      else if (typeof value === 'boolean') fields[key] = { booleanValue: value };
      else fields[key] = { stringValue: JSON.stringify(value) };
    }
    const response = await axios.post(url, { fields });
    return response.data;
  } catch (error) {
    console.error('Error adding mail:', error);
    throw error;
  }
};
