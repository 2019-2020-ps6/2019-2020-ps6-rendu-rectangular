const { Quiz, User, QuizGame } = require('../../models')
const { buildQuizz } = require('../quizzes/manager')

const buildOneQuizGame = (quizGameId) => {
    const quizGame = QuizGame.getById(quizGameId)
    const user = User.getById(quizGame.userId)
    const quiz = buildQuizz(quizGame.quizId)
    const usersAnswers = quizGame.usersAnswers
    const gameDate = quizGame.gameDate

    return {user, quiz, gameDate, usersAnswers, quizGameId}
}

const buildQuizGames = () => {
    const quizGames = QuizGame.get()
    return quizGames.map((quizGame) => buildOneQuizGame(quizGame.id))
}

module.exports = {
    buildOneQuizGame,
    buildQuizGames
}