const express = require('express');
const passport = require('passport');

const { recoverySchema, changePasswordSchema } = require('../schemas/authSchema');
const validationHandler = require('../middlewares/validationHandler');

const AuthService = require('../services/authService');
const service = new AuthService();
const router = express.Router();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async(req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
)
router.post('/recovery',
  validationHandler(recoverySchema, 'body'),
  async(req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/change-password',
  validationHandler(changePasswordSchema, 'body'),
  async(req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router;
