import mongoose from 'mongoose';
//plugins
import paginate from '../plugins/paginator.js';

//schemas
import productSchema from './product.js';
import reviewSchema from './review.js';
import userSchema from './user.js';
import profileSchema from './profile.js';

mongoose.plugin(paginate);

export const Product = mongoose.model('Product', productSchema);
export const Review = mongoose.model('Review', reviewSchema);
export const User = mongoose.model('User', userSchema);
export const Profile = mongoose.model('Profile', profileSchema);
