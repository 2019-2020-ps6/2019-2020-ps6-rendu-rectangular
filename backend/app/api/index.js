const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const QuizGameRouter = require('./quizGame')
const LogRouter = require('./logs')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/quiz-game', QuizGameRouter)
router.use('/logs', LogRouter)

module.exports = router
