import { Injectable } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuizGame } from 'src/models/gameQuiz.model';
import { User } from 'src/models/user.model';

import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { UserService } from './user.service';


@Injectable({
    providedIn: 'root'
})
export class PlayService {

    constructor(private http: HttpClient, private userService: UserService) {
        this.setUser();
    }

    private currentUser: User;

    private gameQuizzesUrl = serverUrl + '/quiz-game';

    currentQuestion$: Subject<Question> = new Subject<Question>();

    ///////////////// QUIZ GAMES ////////////////////////

    quizGames: QuizGame[];
    quizGames$: BehaviorSubject<QuizGame[]> = new BehaviorSubject<QuizGame[]>(this.quizGames);
    currentQuizGame: QuizGame;

    ///////////////////// QUIZ ///////////////////////////

    currentQuiz: Quiz;

    private async setUser() {
        await this.userService.setLastUserFromLogs();
        this.userService.currentUser$.subscribe((user: User) => this.currentUser = user);
    }

    ///////////////////// USERS //////////////////////////

    quizgamesObservable(): Observable<QuizGame[]> {
        return this.http.get<QuizGame[]>(this.gameQuizzesUrl);
    }

    setGameQuizzesFromUrl() {
        this.http.get<QuizGame[]>(this.gameQuizzesUrl)
            .subscribe((quizgames: QuizGame[]) => {
                this.quizGames = quizgames;
                this.quizGames$.next(this.quizGames);
                const currentQuizGame = quizgames[quizgames.length - 1];
                const currentQuestion = currentQuizGame.quiz.questions[currentQuizGame.usersAnswers.length];
                this.currentQuestion$.next(currentQuestion);
                this.currentQuiz = currentQuizGame.quiz;
                this.currentQuizGame = currentQuizGame;
            });
    }

    async createNewGameQuiz() {
        const currentUser = await this.userService.setLastUserFromLogs();
        const newGameJson = {
            userId: currentUser.id,
            quizId: this.currentQuiz.id,
            usersAnswers: []
        };
        this.http.post(this.gameQuizzesUrl, newGameJson, httpOptionsBase).subscribe(() => this.setGameQuizzesFromUrl());
    }

    async updateUsersAnswers(usersChoice: number) {
        this.currentQuizGame.usersAnswers.push(usersChoice);
        const currentUser = await this.userService.setLastUserFromLogs();
        const quizGameJson = {
            userId: currentUser.id,
            quizId: this.currentQuiz.id,
            usersAnswers: this.currentQuizGame.usersAnswers
        };
        this.http.put(this.gameQuizzesUrl + '/' + this.currentQuizGame.quizGameId, quizGameJson, httpOptionsBase).subscribe(() => this.setGameQuizzesFromUrl());
    }

    nextQuestion(): boolean {
        const indexOfCurrentQuestion = this.currentQuizGame.usersAnswers.length;
        if (indexOfCurrentQuestion < this.currentQuizGame.quiz.questions.length) {
            const currentQuestion = this.currentQuizGame.quiz.questions[indexOfCurrentQuestion];
            this.currentQuestion$.next(currentQuestion);
            return true;
        }
        return false;
    }

    setCurrentQuiz(quiz: Quiz) {
        this.currentQuiz = quiz;
    }


    /////////////////// UTILS /////////////////////////////

    calculateScore(): number {
        return this.calculateScoreOfGame(this.currentQuizGame);
    }

    calculateScoreOfGame(quizGame: QuizGame): number {
        const usersAnswers = quizGame.usersAnswers;
        const questions = quizGame.quiz.questions;
        let score = 0;
        for (let i = 0; i < usersAnswers.length; i++) {
            if (questions[i].answers[usersAnswers[i]].isCorrect) { score++; }
        }
        return +((score / usersAnswers.length) * 100).toFixed(0);
    }
}
