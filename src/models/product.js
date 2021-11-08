import mongoose from 'mongoose';
import uniqueValidator from '../utils/uniqueValidator.js';
import { Review } from './index.js';

const Image = new mongoose.Schema({
  src: String,
  alt: String,
});

Image.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: (v) => uniqueValidator.bind(this, 'name', v),
        message: `{VALUE} already exists in database`,
      },
    },
    thumbnail: { type: Image, required: true },
    score: { type: Number, default: 0 },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    percentageOff: { type: Number, default: 0 },
    images: [{ type: Image, required: true }],
    specifications: [
      {
        key: { type: String, required: true, lowercase: true, trim: true },
        value: { type: String, required: true },
      },
    ],
    options: [
      {
        title: { type: String, required: true },
        values: [{ type: String, required: true }],
      },
    ],
    description: { type: String, default: '', trim: true },
    //reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  {
    timestamps: true,
  }
);

productSchema.set('toJSON', {
  transform: (document, ret) => {
    ret.id = ret._id;
    //price could be undefined depend of the query to filter
    if (ret.percentageOff !== 0 && ret.price !== undefined) {
      ret.previousPrice = ret.price / (1 - ret.percentageOff / 100);
    }
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

productSchema.post('remove', (doc) => {
  Review.deleteMany({ product: doc.id });
});

export default productSchema;
