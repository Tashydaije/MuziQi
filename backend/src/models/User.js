import bcrypt from 'bcryptjs';
import getDb from '../config/db.js';

class User {
  constructor({ username, email, password }) {
    this.username = username;
    this.email = email;
    this.password = password;
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
    const user = await usersCollection.findOne({ _id: id });
    return user;
  }
}

export default User;