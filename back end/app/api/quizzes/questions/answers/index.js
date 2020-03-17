const { Router } = require('express')
const { Answer } = require('../../../../models')

const routerA = new Router({ mergeParams: true})

routerA.get('/', (req, res) => {
    try {
        res.status(200).json(Answer.get())
    } catch (err) {
        res.status(500).json(err)
    }
})

routerA.get('/:answerId', (req, res) => {
    try{
        res.status(200).json(Answer.getById(req.params.answerId))
        console.log("req.params : ", req.params)
    } catch (err) {
        res.status(500).json(err)
    }
})

routerA.delete('/:answerId', (req, res) => {
    try {
        res.status(200).json(Answer.delete(req.params.answerId))
        console.log("req.params : ", req.params)
    } catch (err) {
        res.status(500).json(err)
    }
})

routerA.put('/:answerId', (req, res) => {
    try {
        res.status(200).json(Answer.update(req.params.answerId, req.body))
        console.log("req.param : ", req.params)
    } catch (err) {
        res.status(500).json(err)
    }
})

routerA.post('/', (req, res) => {
    try {
        const question = Question.create({ ...req.body})
        res.status(201).json(question)
    } catch (err) {
        if (err.name === 'Validation Error') {
            res.status(400).json(err.extra)
        } else {
            res.status(500).json(err)
        }
    }
})

module.exports = routerA