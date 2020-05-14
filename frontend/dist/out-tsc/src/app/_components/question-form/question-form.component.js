import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
let QuestionFormComponent = class QuestionFormComponent {
    constructor(formBuilder, quizService) {
        this.formBuilder = formBuilder;
        this.quizService = quizService;
        this.nbAnswers = 0;
        this.initializeQuestionForm();
    }
    initializeQuestionForm() {
        this.questionForm = this.formBuilder.group({
            label: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(35)
            ]),
            answers: this.formBuilder.array([]),
            image: ['']
        });
        this.nbAnswers = 0;
    }
    get answers() {
        return this.questionForm.get('answers');
    }
    createAnswer() {
        return this.formBuilder.group({
            value: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(15)
            ]),
            isCorrect: false,
        });
    }
    addAnswer() {
        if (this.questionForm.valid && this.nbAnswers < 4) {
            this.answers.push(this.createAnswer());
            this.nbAnswers++;
        }
    }
    addQuestion() {
        if (this.questionForm.valid) {
            const questionToCreate = this.questionForm.getRawValue();
            console.log(questionToCreate);
            console.log(questionToCreate.image);
            this.quizService.addQuestion(questionToCreate, this.quiz);
            this.initializeQuestionForm();
        }
    }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    Input()
], QuestionFormComponent.prototype, "quiz", void 0);
QuestionFormComponent = tslib_1.__decorate([
    Component({
        selector: 'app-question-form',
        templateUrl: './question-form.component.html',
        styleUrls: ['./question-form.component.scss']
    })
], QuestionFormComponent);
export { QuestionFormComponent };
function forbiddenNameValidator(nameRe) {
    return (control) => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
}
function correctNbOfAnswersValidator() {
    return (control) => {
        const forbidden = this.answers !== 2 || this.answers !== 4;
        return forbidden ? { 'nb of answers not correct': { value: control.value } } : null;
    };
}
//# sourceMappingURL=question-form.component.js.map