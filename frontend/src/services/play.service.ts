import { Injectable } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class PlayService {

    currentQuiz: Quiz;
    currentQuestion: Question;
    questionList: Question[];

    index: number = 0;
    public nbCorrectAnswers = 0;

    //currentQuiz$: BehaviorSubject<Quiz> = new BehaviorSubject<Quiz>(this.currentQuiz);
    currentQuestion$: BehaviorSubject<Question> = new BehaviorSubject<Question>(this.currentQuestion);

    constructor() {
        
    }

    setQuiz(quiz: Quiz) {
        console.log('Quiz in playService is', quiz);
        this.currentQuiz = quiz;
        this.questionList = quiz.questions;
        this.currentQuestion = this.questionList[this.index];
        this.currentQuestion$.next(this.currentQuestion);
    }

    nextQuestion() {
        if (this.index+1 < this.questionList.length) {
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




}