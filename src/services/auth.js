import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwtHelper from '../utils/jwtHelper.js';
import config from '../config/index.js';

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

  static async sendMail(emailOptions) {
    const { to, subject, html } = emailOptions;
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPassword,
      },
    });

    //it also return an object with info but i dont use it
    await transporter.sendMail({
      from: '"Ing. Eduardo Gonzalez" <valentin.eduardo.g94@gmail.com>',
      to,
      subject,
      html,
    });
  }

  static async sendRecoveryEmail(email, emailOptions = {}) {
    const user = await User.findOne({ email });
    if (!user) throw { message: 'email no registrado' };
    const token = jwtHelper.createRecoveryToken(user.id);
    emailOptions.to = email;
    emailOptions.subject = 'Recover your password';
    emailOptions.html = `<h3>You can recovery your password clicking the next link: </h3> <br/> <a href="http:localhost:3000/reset-password?token=${token}">Recovery password</a>`;
    await this.sendMail(emailOptions);
    return { message: 'Recovery email sent.' };
  }

  static async changePassword(recoveryToken, newPassword) {
    const payload = jwtHelper.verifyRefreshToken(recoveryToken);
    const hash = await bcrypt.hash(newPassword, 14);
    const updatedUser = await User.findByIdAndUpdate(
      payload.sub,
      {
        password: hash,
      },
      { new: true }
    );
    return updatedUser;
  }

  //i will erase this, it is not necessary
  static async getAll() {
    const users = await User.find({});
    return users;
  }

  static async getOne(id) {
    return await User.findById(id);
  }
}

export default UserService;
