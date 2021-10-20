import User from '../models/user.js';
import bcrypt from 'bcrypt';

class UserService {
  static async createUser(payload) {
    const { password } = payload;
    const hashedPassword = await bcrypt.hash(password, 14);

    const user = new User({ ...payload, password: hashedPassword });
    const saved = await user.save();
    return saved;
  }

  static async checkCredentials(payload) {
    const { email, password } = payload;
    const user = await User.findOne({ email });
    if (!user) throw { message: 'User and/or password incorrect' };
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) return user;

    throw new Error('User and/or password incorrect');
  }

  static async getAll() {
    const users = await User.find({});
    return users;
  }
}

export default UserService;
