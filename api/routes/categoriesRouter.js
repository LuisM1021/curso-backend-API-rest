const express = require('express');
const validationHandler = require('../middlewares/validationHandler');
const { getCategorySchema, createCategorySchema, updateCategorySchema } = require('../schemas/categorySchema')
const CategoryService = require('../services/categoryService');
const { checkRoles } = require('../middlewares/authHandler');

const passport = require('passport');

const router = express.Router();
const service = new CategoryService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'seller', 'customer'),
  async (req, res, next) => {
    try {
      const categories = await service.find();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
)

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'customer'),
  validationHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'seller'),
  validationHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
)

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'seller'),
  validationHandler(getCategorySchema, 'params'),
  validationHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedCategory = await service.update(id,body);
      res.status(201).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'seller'),
  validationHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await service.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
