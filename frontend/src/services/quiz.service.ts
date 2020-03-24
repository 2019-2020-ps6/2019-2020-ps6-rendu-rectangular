import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[]; // = QUIZ_LIST;
  //private url = 'https://api.myjson.com/bins/13ajhy';
  private quizUrl = serverUrl + '/quizzes';
  private questionsPath = 'questions';
  private httpOptions = httpOptionsBase;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public selectedQuiz$: Subject <Quiz> = new Subject();

  constructor(public http: HttpClient) {
    //this.setQuizzesFromUrl();
  }

  setSelectedQuiz(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.selectedQuiz$.next(quiz);
    });
  }
  /*
  addQuiz(quiz: Quiz) {
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }
  */
  addQuiz(quiz: Quiz) {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }
  /*
  deleteQuiz(quiz: Quiz) {
    this.quizzes.splice(this.quizzes.indexOf(quiz), 1);
    this.quizzes$.next(this.quizzes);
  }
  */
  deleteQuiz(quiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }
  /*
  Ici, on récupère les quiz depuis l'url. On recupère un objet de la forme {Quiz[]} (appelé ici quizzesObj) et non Quiz[]
  */
 /*
  setQuizzesFromUrl() {
    this.http.get<{quizzes: Quiz[]}>(this.quizUrl).subscribe((quizzesObj: {quizzes: Quiz[]}) => {
      this.quizzes = quizzesObj.quizzes;
      this.quizzes$.next(this.quizzes);
    });
  }
  */
  setQuizzesFromUrl() {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
      console.log('Quizzes retrieved from server', this.quizzes);
    });
  }

  getQuiz(id: string): Observable <Quiz> {
    return this.quizzes$.asObservable().pipe(
      map((quizzes) => quizzes.find((quiz) => quiz.id === id))
    );
  }
  /*
  getNumberOfQuizzes(): number {
    return this.quizzes.length;
  }
  */
  /*
  addQuestion(question: Question, quiz: Quiz) {
    const found = this.quizzes.find((elt) => elt == quiz);
    found.questions.push(question);
    this.quizzes$.next(this.quizzes);
  }

  deleteQuestion(question: Question, quiz: Quiz) {
    const found = this.quizzes.find((elt) => elt == quiz);
    found.questions.splice(found.questions.indexOf(question), 1);
    this.quizzes$.next(this.quizzes);
  }
  */
 addQuestion(question: Question, quiz: Quiz) {
  const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
  this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => {
    this.setSelectedQuiz(quiz.id);
    //this.setQuizzesFromUrl();
    });
}

deleteQuestion(question: Question, quiz: Quiz){
  const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
  this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
}
  
}
