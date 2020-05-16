const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizGame', {
    userId: Joi.number().required(),
    quizId: Joi.number().required(),
    gameDate: Joi.date().required(),
    usersAnswers: Joi.array(),
})