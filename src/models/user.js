import mongoose from 'mongoose';
import { Profile } from './index.js';
import uniqueValidator from '../utils/uniqueValidator.js';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => uniqueValidator.bind(this, 'email', v),

      message: 'Email {VALUE} already taken',
    },
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'user', 'god'],
    default: 'user',
    require: true,
  },
  avatar: {
    src: {
      type: String,
      default:
        'https://res.cloudinary.com/webstatics/image/upload/v1633301657/ecommerce/profile02_wjfggv.png',
    },
    alt: { type: String, default: `default avatar` },
  },
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
});

userSchema.pre('save', async function () {
  try {
    const profile = new Profile({ user: this.id });
    const doc = await profile.save();
    this.set('profile', doc.id);
  } catch (e) {
    throw { message: 'Failing to create profile and save new User', err: e };
  }
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

export default userSchema;
