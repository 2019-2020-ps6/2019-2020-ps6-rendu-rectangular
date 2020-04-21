const { Router } = require('express')
const manageAllErrors = require('../../utils/routes/error-management')
const { QuizGame } = require('../../models')
const { buildOneQuizGame, buildQuizGames } = require('./manager')

const router = new Router()

module.exports = router

router.get('/', (req, res) => {
  try {
    const quizGames = buildQuizGames()
    res.status(200).json(quizGames)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:quizGameId', (req, res) => {
  try {
    const quizGame = buildOneQuizGame(req.params.quizGameId)
    res.status(200).json(quizGame)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const quizGame = QuizGame.create({ ...req.body })
    res.status(201).json(quizGame)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:quizGameId', (req, res) => {
  try {
    res.status(200).json(QuizGame.update(req.params.quizGameId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:quizUserId', (req, res) => {
  try {
    QuizGame.deleteUserId(req.params.quizUserId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})