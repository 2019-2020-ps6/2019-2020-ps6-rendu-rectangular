import { Injectable } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
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

    
    currentQuestion$: Subject<Question> = new Subject<Question>();

    constructor(private http: HttpClient) {

    }

    ///////////////// QUIZ GAMES ////////////////////////

    quizGames: QuizGame[];
    quizGames$: BehaviorSubject<QuizGame[]> = new BehaviorSubject<QuizGame[]>(this.quizGames);
    currentQuizGame: QuizGame;

    quizgamesObservable(): Observable<QuizGame[]> {
        return this.http.get<QuizGame[]>(this.gameQuizzesUrl);
    }

    setGameQuizzesFromUrl(){
        this.http.get<QuizGame[]>(this.gameQuizzesUrl)
            .subscribe((quizgames: QuizGame[]) => {
                this.quizGames = quizgames;
                this.quizGames$.next(this.quizGames);
                const currentQuizGame = quizgames[quizgames.length - 1];
                const currentQuestion = currentQuizGame.quiz.questions[currentQuizGame.usersAnswers.length];
                const currentUser = currentQuizGame.user;
                this.currentQuestion$.next(currentQuestion);
                this.currentQuiz = currentQuizGame.quiz;
                this.currentUser = currentUser;
                this.currentUser$$.next(currentUser);
                this.currentQuizGame = currentQuizGame;
            });
    }

    createNewGameQuiz() {
        const newGameJson = {
            "userId": this.currentUser.id,
            "quizId": this.currentQuiz.id,
            "usersAnswers": []
        };
        this.http.post(this.gameQuizzesUrl, newGameJson, httpOptionsBase).subscribe(() => this.setGameQuizzesFromUrl());
    }

    updateUsersAnswers(usersChoice: number) {
        this.currentQuizGame.usersAnswers.push(usersChoice);
        const quizGameJson = {
            "userId": this.currentUser.id,
            "quizId": this.currentQuiz.id,
            "usersAnswers": this.currentQuizGame.usersAnswers
        };
        this.http.put(this.gameQuizzesUrl+'/'+this.currentQuizGame.quizGameId, quizGameJson, httpOptionsBase).subscribe(() => this.setGameQuizzesFromUrl());
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

    ///////////////////// QUIZ ///////////////////////////

    currentQuiz: Quiz;

    setCurrentQuiz(quiz: Quiz) {
        this.currentQuiz = quiz;
    }

    ///////////////////// USERS //////////////////////////

    currentUser: User;
    currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(this.currentUser);
    currentUser$$: Subject<User> = new Subject<User>();
    availableUsers$: Subject<User[]> = new Subject<User[]>();

    setUsersFromUrl() {
        this.http.get<User[]>(this.usersUrl).subscribe((users: User[]) => {
            this.availableUsers$.next(users);
        });
    }

    setCurrentUser(user: User) {
        this.currentUser = user;
        this.currentUser$.next(this.currentUser);
        this.currentUser$$.next(this.currentUser);
        console.log('Current user in playService is: ', this.currentUser);
    }

    changeUsersFontSize(sizeChange: number) {
        this.currentUser.fontSizePreference += sizeChange;
        const modifiedUserJSON = {
            "firstName": this.currentUser.firstName,
            "lastName": this.currentUser.lastName,
            "fontSizePreference": this.currentUser.fontSizePreference
        }
        this.http.put(this.usersUrl + '/' + this.currentUser.id, modifiedUserJSON, httpOptionsBase).subscribe(()=> {
            this.setCurrentUser(this.currentUser);
            this.setUsersFromUrl();
            console.log('new size is', this.currentUser.fontSizePreference);
        });
    }
    
    createNewUser(firstName: string, lastName: string) {
        const newUserJson = {
            "firstName": firstName,
            "lastName": lastName,
            "fontSizePreference": 40
        };
        this.http.post(this.usersUrl, newUserJson, httpOptionsBase).subscribe(() => this.setUsersFromUrl());
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
            if (questions[i].answers[usersAnswers[i]].isCorrect) score++;
        }
        return +((score/usersAnswers.length)*100).toFixed(0);
    }
}
