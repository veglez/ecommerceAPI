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
    const { accessToken: token, refreshToken } = jwtHelper.getTokens(user.id, {
      role: user.role,
    });
    res.cookie(config.refreshCookieName, refreshToken, {
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
    const { accessToken: token, refreshToken } = jwtHelper.getTokens(user.id, {
      role: user.role,
      username: user.username,
    });
    res.cookie(config.refreshCookieName, refreshToken, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: !config.dev,
    });
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
});

authRouter.get('/bobjwt', async (req, res, next) => {
  try {
    const requestTokens = jwtHelper.refreshTokens(
      req.signedCookies[config.refreshCookieName]
    );
    if (!requestTokens) return next({ message: 'Token inválido' });
    const { accessToken: token, refreshToken, id } = requestTokens();
    res.cookie(config.refreshCookieName, refreshToken, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: !config.dev,
    });
    const user = await UserService.getOne(id);
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const response = await UserService.sendRecoveryEmail(email);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/reset-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const updatedUser = await UserService.changePassword(token, newPassword);
    res.send({
      message: `User: ${updatedUser.username} change password successfully`,
    });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
