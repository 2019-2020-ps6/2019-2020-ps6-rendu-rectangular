const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
    type: Joi.string(), 
    value: Joi.string().required(), 
    idCorrect: Joi.boolean().required(),
    questionId: Joi.number().required(),
})