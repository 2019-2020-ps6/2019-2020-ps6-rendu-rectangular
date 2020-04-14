import { Injectable } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuizGame } from 'src/models/gameQuiz.model';
import { User } from 'src/models/user.model';

import { serverUrl, httpOptionsBase } from '../configs/server.config';


@Injectable({
    providedIn: 'root'
})
export class PlayService {

    private gameQuizzesUrl = serverUrl + '/quiz-game';
    private usersUrl = serverUrl + '/users';
    private httpOptions = httpOptionsBase;


    gameQuizzes: QuizGame[];
    gameQuiz: QuizGame;
    currentQuestion: Question;
    currentUser: User;
    currentQuiz: Quiz;

    gameQuizzes$: BehaviorSubject<QuizGame[]> = new BehaviorSubject<QuizGame[]>(this.gameQuizzes);
    currentQuestion$: BehaviorSubject<Question> = new BehaviorSubject<Question>(this.currentQuestion);
    currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(this.currentUser);
    currentQuiz$: BehaviorSubject<Quiz> = new BehaviorSubject<Quiz>(this.currentQuiz);

    public availableUsers$:Subject<User[]> = new Subject<User[]>();

    constructor(private http: HttpClient) {

    }

    setGameQuizzesFromUrl() {
        this.http.get<QuizGame[]>(this.gameQuizzesUrl).subscribe((gameQuizzes: QuizGame[]) => {
            this.gameQuizzes = gameQuizzes;
            this.gameQuizzes$.next(this.gameQuizzes);
            this.setGameQuiz();
            this.nextQuestion();
            
        });
    }

    setGameQuiz() {
        this.gameQuiz = this.findLastGame(this.currentUser, this.currentQuiz);
        console.log('GameQuiz in playService is', this.gameQuiz);
    }

    findLastGame(user: User, quiz: Quiz): QuizGame {
        let quizGames: QuizGame[];
        quizGames = this.gameQuizzes.filter((game) => game.user.id === user.id && game.quiz.id === quiz.id);
        return quizGames[quizGames.length-1];
    }


    createNewGameQuiz() {
        //const newGame = new QuizGame(this.currentQuiz, this.currentUser);
        const newGameJson = {
            "userId": this.currentUser.id,
            "quizId": this.currentQuiz.id,
            "usersAnswers": []
        }
        this.http.post(this.gameQuizzesUrl, newGameJson, httpOptionsBase).subscribe(() => this.setGameQuizzesFromUrl());
    }

    addUser(user: User) {
        this.http.post<User>(this.usersUrl, user, this.httpOptions).subscribe(() => this.setUsersFromUrl());
    }

    setCurrentUser(user: User) {
        this.currentUser = user;
        this.currentUser$.next(this.currentUser);
        console.log('Current user in playService is: ', this.currentUser);
    }

    setCurrentQuiz(quiz: Quiz) {
        this.currentQuiz =  quiz;
        this.currentQuiz$.next(this.currentQuiz);
        console.log('Current quiz in playService is ', this.currentQuiz);
    }

    setUsersFromUrl() {
        this.http.get<User[]>(this.usersUrl).subscribe((users: User[]) => {
            this.availableUsers$.next(users);
        });
    }

    nextQuestion(): boolean {
        const indexOfCurrentQuestion = this.gameQuiz.usersAnswers.length;
        if (indexOfCurrentQuestion < this.gameQuiz.quiz.questions.length) {
            this.currentQuestion = this.gameQuiz.quiz.questions[indexOfCurrentQuestion];
            console.log('Current question in playService is', this.gameQuiz.quiz.questions[indexOfCurrentQuestion]);
            console.log('QuizGame id is', this.gameQuiz.quizGameId);
            this.currentQuestion$.next(this.currentQuestion);
            return true;
        }
        return false;
    }

    updateUsersAnswers(usersChoice: number) {
        this.gameQuiz.usersAnswers.push(usersChoice);
        const quizGameJson = {
            "userId": this.currentUser.id,
            "quizId": this.currentQuiz.id,
            "usersAnswers": this.gameQuiz.usersAnswers
        };
        this.http.put(this.gameQuizzesUrl+'/'+this.gameQuiz.quizGameId, quizGameJson, httpOptionsBase).subscribe(() => this.setGameQuizzesFromUrl());
    }

    calculateScore(): number {
        const usersAnswers = this.gameQuiz.usersAnswers;
        const questions = this.gameQuiz.quiz.questions;
        let score = 0;
        for (let i = 0; i < usersAnswers.length; i++) {
            if (questions[i].answers[usersAnswers[i]].isCorrect) score++;
        }
        return (score/usersAnswers.length)*100;
    }
}
