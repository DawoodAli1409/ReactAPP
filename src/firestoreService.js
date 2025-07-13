import { getUserdata, addUserdata, updateUserdata, deleteUserdata } from './firebaseDawood';

// Add user
export const addUser = async (userData) => {
  return await addUserdata(userData);
};

// Update user
export const updateUser = async (id, userData) => {
  return await updateUserdata(id, userData);
};

// Delete user
export const deleteUser = async (id) => {
  return await deleteUserdata(id);
};

// Listen to users in real time - Not supported with REST API, so fallback to polling or manual refresh needed
export const subscribeToUsers = (callback, errorCallback) => {
  console.warn('Real-time subscription not supported with REST API. Please implement polling or manual refresh.');
  // Optionally implement polling here if needed
  return () => {};
};
