const { Quiz, User, QuizGame } = require('../../models')
const { buildQuizz } = require('../quizzes/manager')

const buildOneQuizGame = (quizGameId) => {
    const quizGame = QuizGame.getById(quizGameId)
    const user = User.getById(quizGame.userId)
    const quiz = buildQuizz(quizGame.quizId)
    const usersAnswers = quizGame.usersAnswers

    return {...user, quiz, usersAnswers}
}

module.exports = {
    buildOneQuizGame
}