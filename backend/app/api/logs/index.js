const { Router } = require('express')
const manageAllErrors = require('../../utils/routes/error-management')
const { Log } = require('../../models')

const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(Log.get())
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

module.exports = router