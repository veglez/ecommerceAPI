import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  opinion: { type: String, required: true },
  score: { type: Number, required: true, min: 0, max: 5 },
  published: { type: Schema.Types.Date, default: new Date() },
  images: [
    {
      src: { type: String, required: true },
      alt: { type: String, required: true },
    },
  ],
});

reviewSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default reviewSchema;
