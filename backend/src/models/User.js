import bcrypt from 'bcryptjs';
import getDb from '../config/db.js';
import { ObjectId } from 'mongodb';

class User {
  constructor({ username, email, password, firstName, lastName, profilePhoto }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profilePhoto = profilePhoto;
    this.createdAt = new Date();
  }

  // Hash the password before saving the user
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Save the user to the database
  async save() {
    const db = getDb();
    const usersCollection = db.collection('users');
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: this.email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password before saving
    await this.hashPassword();

    // Insert the new user into the collection
    const result = await usersCollection.insertOne(this);
    return result.ops[0]; // Return the inserted document
  }

  // Static method to find a user by email
  static async findByEmail(email) {
    const db = getDb();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });
    return user;
  }

  // Static method to find a user by ID
  static async findById(id) {
    const db = getDb();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    return user;
  }

  // static method to update user
  static async updateUser(id, updateData) {
    const db = getDb();
    const usersCollection = db.collection('users');

    // Find the user to update
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      throw new Error('User not found');
    }

    // Update user fields
    if (updateData.username) user.username = updateData.username;
    if (updateData.email) user.email = updateData.email;
    if (updateData.password) {
      user.password = updateData.password;
      // Hash the new password if provided
      await user.hashPassword();
    }
    if (updateData.firstName) user.firstName = updateData.firstName;
    if (updateData.lastName) user.lastName = updateData.lastName;
    if (updateData.profilePhoto) user.profilePhoto = updateData.profilePhoto;
    // Save updated user to the database
    await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: user });

    return user;
  }

  // Static method to delete a user by ID and remove all associated records
  static async deleteAccount(id) {
    const db = getDb();
    const usersCollection = db.collection('users');

    // Find the user to delete
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    await usersCollection.deleteOne({ _id: new ObjectId(id) });

    const playlistsCollection = db.collection('playlists');
    await playlistsCollection.deleteMany({ userId: new ObjectId(id) });

    return { message: 'User and all associated records deleted successfully' };
  }

}

export default User;