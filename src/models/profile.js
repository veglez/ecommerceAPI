import mg from 'mongoose';
import uniqueValidator from '../utils/uniqueValidator.js';

const { Schema, model } = mg;

const deliveryAddress = new Schema({
  street_name: {
    type: String,
    default: '',
    required: true,
    validate: {
      validator: uniqueValidator,
      message: '{VALUE} already exist in the database',
    },
  },
  house_number: {
    type: Number,
    required: true,
    default: 0,
  },
  zip_code: {
    type: Number,
    required: true,
    default: 0,
  },
  country: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  more_details: {
    type: String,
    default: '',
  },
});

const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  delivery_address: [
    {
      type: deliveryAddress,
    },
  ],
  gender: { type: String, enum: ['male', 'female', ''] },
  birthday: { type: Date, default: new Date() },
  phone: {
    type: String,
    validate: {
      validator: (v) => {
        const regex = /(\+\d{2}|\+\d{1}-?\d{3})?(?<payload>\d{10})/;
        return regex.test(v);
      },
      message:
        'number must be of with country code like: +52 or +1-268 plus 10 digits or just 10 digits but got {VALUE}',
    },
    trim: true,
  },
});

const Profile = model('Profile', profileSchema);

export default Profile;
