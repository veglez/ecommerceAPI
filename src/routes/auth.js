import express from 'express';
import config from '../config/index.js';
import UserService from '../services/auth.js';
import jwtHelper from '../utils/jwtHelper.js';

const authRouter = express.Router();

authRouter.get('/', async (req, res, next) => {
  try {
    const users = await UserService.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/register', async (req, res, next) => {
  try {
    const user = await UserService.createUser(req.body);
    const { accessToken: token, refreshToken } = jwtHelper.getTokens(user.id);
    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: !config.dev,
    });
    res.json({ token });
  } catch (e) {
    next(e);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const user = await UserService.checkCredentials(req.body);
    const { accessToken: token, refreshToken } = jwtHelper.getTokens(user.id);
    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: !config.dev,
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

authRouter.get('/bobjwt', (req, res, next) => {
  try {
    const requestTokens = jwtHelper.refreshTokens(req.signedCookies['refresh']);
    if (!requestTokens) return next({ message: 'Token inválido' });
    const { accessToken: token, refreshToken } = requestTokens();
    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: !config.dev,
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
