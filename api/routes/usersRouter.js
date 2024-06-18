const express = require('express');

const UserService = require('../services/userService')
const validationHandler = require('../middlewares/validationHandler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/userSchema');

const router = express.Router();

const service = new UserService();

router.get('/', async (req, res, next)=>{
  try{
    const users = await service.find();
    res.json(users);
  }catch(error){
    next(error);
  }
})

router.post('/',
  validationHandler(createUserSchema, 'body'),
  async (req, res, next) => {
  try{
    const { body } = req;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  }catch(error){
    next(error);
  }
})

module.exports = router;
