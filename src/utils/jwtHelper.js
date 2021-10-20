import jwt from 'jsonwebtoken';
import config from '../config/index.js';

class jwtHelper {
  /**
   * Create an access token to login
   * @param {String} id refers to the user
   * @param {Object} extra any aditional payload for the token
   * @returns the signed token
   */
  static createAccessToken(id, extra = {}) {
    const tokenPayload = {
      sub: id,
      ...extra,
    };
    const options = {
      expiresIn: '5min',
    };
    const token = jwt.sign(tokenPayload, config.jwtAccess, options);
    return token;
  }

  static createRefreshToken(id, extra = {}) {
    const tokenPayload = {
      sub: id,
      ...extra,
    };
    const options = {
      expiresIn: '2h',
    };
    const token = jwt.sign(tokenPayload, config.jwtRefresh, options);
    return token;
  }

  static createRecoveryToken(id, extra = {}) {
    const tokenPayload = {
      sub: id,
      ...extra,
    };
    const options = {
      expiresIn: '15min',
    };
    const token = jwt.sign(tokenPayload, config.jwtRecovery, options);
    return token;
  }

  static getTokens(id, extra = {}) {
    const accessToken = this.createAccessToken(id, extra);
    const refreshToken = this.createRefreshToken(id, extra);
    return { accessToken, refreshToken };
  }

  static refreshTokens(refreshToken) {
    const payload = jwt.verify(refreshToken, config.jwtRefresh);
    if (!payload) return null;
    return () => this.getTokens(payload.sub);
  }
}

export default jwtHelper;
