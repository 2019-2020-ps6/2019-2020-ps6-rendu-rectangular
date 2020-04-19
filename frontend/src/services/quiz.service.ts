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
  
  private quizzes: Quiz[]; 
  private quizUrl = serverUrl + '/quizzes';
  private questionsPath = 'questions';
  private httpOptions = httpOptionsBase;

  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public selectedQuiz$: Subject <Quiz> = new Subject();

  constructor(public http: HttpClient) {
    
  }

  setSelectedQuiz(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.selectedQuiz$.next(quiz);
    });
  }
  
  addQuiz(quiz: Quiz) {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }
 
  deleteQuiz(quiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }
  
  setQuizzesFromUrl() {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  getQuiz(id: string): Observable <Quiz> {
    return this.quizzes$.asObservable().pipe(
      map((quizzes) => quizzes.find((quiz) => quiz.id === id))
    );
  }
  
 addQuestion(question: Question, quiz: Quiz) {
  const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
  this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => {
    this.setSelectedQuiz(quiz.id);
    });
}

deleteQuestion(question: Question, quiz: Quiz) {
  const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
  this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
}

}
