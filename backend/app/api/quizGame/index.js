const { Router } = require('express')
const manageAllErrors = require('../../utils/routes/error-management')
const { QuizGame } = require('../../models')

const router = new Router()

module.exports = router

router.get('/', (req, res) => {
    try {
      res.status(200).json(QuizGame.get())
    } catch (err) {
      manageAllErrors(res, err)
    }
})

router.get('/:quizGameId', (req, res) => {
    try {
      res.status(200).json(QuizGame.getById(req.params.quizGameId))
    } catch (err) {
      manageAllErrors(res, err)
    }
})
