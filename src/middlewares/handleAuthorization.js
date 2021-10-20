import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const handleAuth = (roles = ['god']) => {
  return (req, res, next) => {
    const auth = req.headers['authorization'].split(' ');
    const authType = auth[0];
    const token = auth[1];
    let payload;
    if (authType.toLowerCase() !== 'bearer')
      return next('authorization type invalid');

    payload = jwt.verify(token, config.jwtAccess);

    if (!payload) return next('invalid token');

    if (roles.includes(payload.role)) {
      req.user = payload;
      next();
    } else {
      next('Unhautorized. Role not allowed');
    }
  };
};

export default handleAuth;
