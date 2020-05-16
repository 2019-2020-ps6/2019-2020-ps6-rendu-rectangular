const { Router } = require('express')
const manageAllErrors = require('../../../utils/routes/error-management')
const { Theme } = require('../../../models')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
    try {
      res.status(200).json(Theme.get())
    } catch (err) {
      manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
  console.log({ ...req.body })
    try {
      const themes = Theme.create({ ...req.body })
      res.status(201).json(themes)
    } catch (err) {
      manageAllErrors(res, err)
    }
})

router.delete('/:themeId', (req, res) => {
    try {
      Theme.delete(req.params.themeId)
      res.status(204).end()
    } catch (err) {
      manageAllErrors(res, err)
    }
  })

module.exports = router