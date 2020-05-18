const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  admin: Joi.boolean().required(),
  fontSizePreference: Joi.number().required(),
  fontContrastPreference: Joi.number().required(),
  isDaltonian: Joi.boolean().required()
})
