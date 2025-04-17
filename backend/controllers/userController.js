import { getUserById, updateUserProfile } from '../models/userModel.js';

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    await updateUserProfile(userId, req.body);
    const updatedUser = await getUserById(userId);
    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};
