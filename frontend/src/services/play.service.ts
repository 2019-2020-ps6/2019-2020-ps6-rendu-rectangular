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

    quizGames: QuizGame[];
    currentQuestion$: Subject<Question> = new Subject<Question>();

    constructor(private http: HttpClient) {

    }

    ///////////////// QUIZ GAMES ////////////////////////

    setGameQuizzesFromUrl(){
        this.http.get<QuizGame[]>(this.gameQuizzesUrl)
            .subscribe((quizgames: QuizGame[]) => {
                this.quizGames = quizgames;
                const currentQuizGame = quizgames[quizgames.length - 1];
                const currentQuestion = currentQuizGame.quiz.questions[currentQuizGame.usersAnswers.length];
                this.currentQuestion$.next(currentQuestion);

                this.currentQuiz = currentQuizGame.quiz;
                this.currentUser = currentQuizGame.user;
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

    ///////////////////// QUIZ ///////////////////////////

    currentQuiz: Quiz;

    setCurrentQuiz(quiz: Quiz) {
        this.currentQuiz = quiz;
    }

    ///////////////////// USERS //////////////////////////

    currentUser: User;
    currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(this.currentUser);
    availableUsers$: Subject<User[]> = new Subject<User[]>();

    setUsersFromUrl() {
        this.http.get<User[]>(this.usersUrl).subscribe((users: User[]) => {
            this.availableUsers$.next(users);
        });
    }

    setCurrentUser(user: User) {
        this.currentUser = user;
        this.currentUser$.next(this.currentUser);
        console.log('Current user in playService is: ', this.currentUser);
    }

}
