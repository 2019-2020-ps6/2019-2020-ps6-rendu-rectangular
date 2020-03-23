const { Router } = require('express')

const { Quiz } = require('../../models')
const { Question } = require('../../models')

const QuestionRouter = require('./questions')

const router = new Router()

router.use('/:quizId/questions', QuestionRouter)

router.get('/', (req, res) => {
  try {
    var result = []; 
    Quiz.get().forEach(element => {
      result.push([element].concat([Question.get().filter(a=>a.quizId==element.id)]))
    });
    console.log(result);
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    res.status(200).json([Quiz.getById(req.params.quizId)].concat([Question.get().filter(a=>a.quizId==req.params.quizId)]))
    console.log("req.params : ", req.params)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.delete(req.params.quizId))
    console.log("req.params : ", req.params)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
    console.log("req.params : ", req.params)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router
