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

router.get('/:id',
  validationHandler(getUserSchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/',
  validationHandler(createUserSchema, 'body'),
  async (req, res, next) => {
  try{
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  }catch(error){
    next(error);
  }
})

router.patch('/:id',
  validationHandler(getUserSchema, 'params'),
  validationHandler(updateUserSchema, 'body'),
  async(req, res, next)=>{
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedUser = await service.update(id,body);
      res.status(201).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:id',
  validationHandler(getUserSchema,'params'),
  async(req, res, next)=>{
    try {
      const { id } = req.params;
      const deletedUser = await service.delete(id);
      res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
