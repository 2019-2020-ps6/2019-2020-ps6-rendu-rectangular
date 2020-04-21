const { Router } = require('express')
const manageAllErrors = require('../../utils/routes/error-management')
const { Log } = require('../../models')
const { buildAllUsers } = require('./manager')

const router = new Router()

router.get('/', (req, res) => {
    try {
      const users = buildAllUsers()
      res.status(200).json(users)
    } catch (err) {
      manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
      const logs = Log.create({ ...req.body })
      res.status(201).json(logs)
    } catch (err) {
      manageAllErrors(res, err)
    }
})

router.delete('/:quizUserId', (req, res) => {
  try {
    Log.deleteUserId(req.params.quizUserId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router