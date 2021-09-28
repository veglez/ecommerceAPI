import dotenv from 'dotenv';
// require('dotenv').config();

dotenv.config();

const config0 = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8000,
};

// module.exports = { config };

export default config0;
