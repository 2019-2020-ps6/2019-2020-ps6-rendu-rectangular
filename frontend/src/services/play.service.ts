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

    gameQuizzes: QuizGame[];
    gameQuiz: QuizGame;
    currentQuestion: Question;
    currentUser: User;
    currentQuiz: Quiz;

    /*
    currentQuiz: Quiz;
    currentQuestion: Question;
    questionList: Question[];

    index = 0;
    public nbCorrectAnswers = 0;

    // currentQuiz$: BehaviorSubject<Quiz> = new BehaviorSubject<Quiz>(this.currentQuiz);
    currentQuestion$: BehaviorSubject<Question> = new BehaviorSubject<Question>(this.currentQuestion);
    */
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
            console.log('Game quizzes from url are', this.gameQuizzes);
            this.setGameQuiz();
            
        });
    }

    setGameQuiz() {
        //this.gameQuiz = 
        this.findLastGame(this.currentUser, this.currentQuiz);
    }

    findLastGame(user: User, quiz: Quiz) {
        //console.log(this.gameQuizzes.find((game) => game.user.id === user.id));
        console.log(this.gameQuizzes.filter((game) => game.id === user.id));
    }


    createNewGameQuiz() {
        const newGame = new QuizGame(this.currentQuiz, this.currentUser);
        this.http.post<QuizGame>(this.gameQuizzesUrl, newGame, httpOptionsBase).subscribe(() => this.setGameQuizzesFromUrl());
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
    /*

    setQuiz(quiz: Quiz) {
        console.log('Quiz in playService is', quiz);
        this.currentQuiz = quiz;
        this.questionList = quiz.questions;
        this.currentQuestion = this.questionList[this.index];
        this.currentQuestion$.next(this.currentQuestion);
    }

    nextQuestion() {
        if (this.index + 1 < this.questionList.length) {
            this.index++;
            this.currentQuestion = this.questionList[this.index];
            this.currentQuestion$.next(this.currentQuestion);
            return true;
        } else {
            console.log('In else of nextQuestion()');
            return false;
        }
    }

    addAPoint() {
        this.nbCorrectAnswers++;
    }

    clear() {
        this.currentQuiz = null;
        this.currentQuestion = null;
        this.questionList = null;
        this.index = 0;
        this.nbCorrectAnswers = 0;
        this.currentQuestion$.next(this.currentQuestion);
    }
    */


}
