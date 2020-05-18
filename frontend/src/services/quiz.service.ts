import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Theme } from 'src/models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(public http: HttpClient) {

  }

  private quizzes: Quiz[];
  private quizUrl = serverUrl + '/quizzes';
  private quizGameUrl = serverUrl + '/quiz-game';
  private themeUrl = this.quizUrl + '/themes';

  private questionsPath = 'questions';
  private httpOptions = httpOptionsBase;

  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public selectedQuiz$: Subject <Quiz> = new Subject();

  themes$: Subject<Theme[]> = new Subject<Theme[]>();

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
    const quizGameUrlWithId = this.quizGameUrl + '/' + quiz.id;
    this.http.delete(quizGameUrlWithId, httpOptionsBase).subscribe(() => {});
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

  setThemesFromUrl() {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themes: Theme[]) => {
      this.themes$.next(themes);
    });
  }

  addThemeToServer(newTheme: string) {
    const themeJSON = {
      theme: newTheme
    };
    this.http.post(this.themeUrl, themeJSON, this.httpOptions).subscribe(() => this.setThemesFromUrl());
  }

  removeThemeFromServer(theme: Theme) {
    const themeToDelUrl = this.themeUrl + '/' + theme.id;
    this.http.delete(themeToDelUrl, this.httpOptions).subscribe(() => this.setThemesFromUrl());
  }

}
