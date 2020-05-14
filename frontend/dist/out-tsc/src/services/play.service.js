import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
let PlayService = class PlayService {
    constructor(http, userService) {
        this.http = http;
        this.userService = userService;
        this.gameQuizzesUrl = serverUrl + '/quiz-game';
        this.currentQuestion$ = new Subject();
        this.quizGames$ = new BehaviorSubject(this.quizGames);
        this.setUser();
    }
    setUser() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.userService.setLastUserFromLogs();
            this.userService.currentUser$.subscribe((user) => this.currentUser = user);
        });
    }
    ///////////////////// USERS //////////////////////////
    quizgamesObservable() {
        return this.http.get(this.gameQuizzesUrl);
    }
    setGameQuizzesFromUrl() {
        this.http.get(this.gameQuizzesUrl)
            .subscribe((quizgames) => {
            this.quizGames = quizgames;
            this.quizGames$.next(this.quizGames);
            const currentQuizGame = quizgames[quizgames.length - 1];
            const currentQuestion = currentQuizGame.quiz.questions[currentQuizGame.usersAnswers.length];
            this.currentQuestion$.next(currentQuestion);
            this.currentQuiz = currentQuizGame.quiz;
            this.currentQuizGame = currentQuizGame;
        });
    }
    createNewGameQuiz() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currentUser = yield this.userService.setLastUserFromLogs();
            const newGameJson = {
                userId: currentUser.id,
                quizId: this.currentQuiz.id,
                usersAnswers: []
            };
            this.http.post(this.gameQuizzesUrl, newGameJson, httpOptionsBase).subscribe(() => this.setGameQuizzesFromUrl());
        });
    }
    updateUsersAnswers(usersChoice) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.currentQuizGame.usersAnswers.push(usersChoice);
            const currentUser = yield this.userService.setLastUserFromLogs();
            const quizGameJson = {
                userId: currentUser.id,
                quizId: this.currentQuiz.id,
                usersAnswers: this.currentQuizGame.usersAnswers
            };
            this.http.put(this.gameQuizzesUrl + '/' + this.currentQuizGame.quizGameId, quizGameJson, httpOptionsBase).subscribe(() => this.setGameQuizzesFromUrl());
        });
    }
    nextQuestion() {
        const indexOfCurrentQuestion = this.currentQuizGame.usersAnswers.length;
        if (indexOfCurrentQuestion < this.currentQuizGame.quiz.questions.length) {
            const currentQuestion = this.currentQuizGame.quiz.questions[indexOfCurrentQuestion];
            this.currentQuestion$.next(currentQuestion);
            return true;
        }
        return false;
    }
    setCurrentQuiz(quiz) {
        this.currentQuiz = quiz;
    }
    /////////////////// UTILS /////////////////////////////
    calculateScore() {
        return this.calculateScoreOfGame(this.currentQuizGame);
    }
    calculateScoreOfGame(quizGame) {
        const usersAnswers = quizGame.usersAnswers;
        const questions = quizGame.quiz.questions;
        let score = 0;
        for (let i = 0; i < usersAnswers.length; i++) {
            if (questions[i].answers[usersAnswers[i]].isCorrect) {
                score++;
            }
        }
        return +((score / usersAnswers.length) * 100).toFixed(0);
    }
};
PlayService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PlayService);
export { PlayService };
//# sourceMappingURL=play.service.js.map