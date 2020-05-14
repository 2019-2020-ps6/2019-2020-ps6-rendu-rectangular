import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
let QuizService = class QuizService {
    constructor(http) {
        this.http = http;
        this.quizUrl = serverUrl + '/quizzes';
        this.quizGameUrl = serverUrl + '/quiz-game';
        this.questionsPath = 'questions';
        this.httpOptions = httpOptionsBase;
        this.quizzes$ = new BehaviorSubject(this.quizzes);
        this.selectedQuiz$ = new Subject();
    }
    setSelectedQuiz(quizId) {
        const urlWithId = this.quizUrl + '/' + quizId;
        this.http.get(urlWithId).subscribe((quiz) => {
            this.selectedQuiz$.next(quiz);
        });
    }
    addQuiz(quiz) {
        this.http.post(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
    }
    deleteQuiz(quiz) {
        const urlWithId = this.quizUrl + '/' + quiz.id;
        const quizGameUrlWithId = this.quizGameUrl + '/' + quiz.id;
        this.http.delete(quizGameUrlWithId, httpOptionsBase).subscribe(() => { });
        this.http.delete(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
    }
    setQuizzesFromUrl() {
        this.http.get(this.quizUrl).subscribe((quizList) => {
            this.quizzes = quizList;
            this.quizzes$.next(this.quizzes);
        });
    }
    getQuiz(id) {
        return this.quizzes$.asObservable().pipe(map((quizzes) => quizzes.find((quiz) => quiz.id === id)));
    }
    addQuestion(question, quiz) {
        const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
        this.http.post(questionUrl, question, this.httpOptions).subscribe(() => {
            this.setSelectedQuiz(quiz.id);
        });
    }
    deleteQuestion(question, quiz) {
        const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
        this.http.delete(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
    }
};
QuizService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], QuizService);
export { QuizService };
//# sourceMappingURL=quiz.service.js.map