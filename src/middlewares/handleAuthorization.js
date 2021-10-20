import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const handleAuth = (req, res, next) => {
  const auth = req.headers['authorization'].split(' ');
  const authType = auth[0];
  const token = auth[1];
  let payload;
  if (authType.lowercase() !== 'bearer')
    return next('authorization type invalid');

  payload = jwt.verify(token, config.jwtAccess);

  if (!payload) return next('invalid token');
  req.user = payload;
  next();
};

export default handleAuth;
