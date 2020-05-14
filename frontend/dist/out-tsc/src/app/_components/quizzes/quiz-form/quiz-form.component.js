import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
let QuizFormComponent = class QuizFormComponent {
    constructor(formBuilder, quizService) {
        this.formBuilder = formBuilder;
        this.quizService = quizService;
        this.QUIZ_THEMES = ['Sport', 'TV', 'Nature', 'Culture', 'Musique', 'Autre'];
        // Form creation
        this.quizForm = this.formBuilder.group({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(25)
            ]),
            theme: ['']
        });
        // You can also add validators to your inputs such as required, maxlength or even create your own validator!
        // More information: https://angular.io/guide/reactive-forms#simple-form-validation
        // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
    }
    ngOnInit() {
    }
    addQuiz() {
        // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
        if (this.quizForm.valid) {
            const quizToCreate = this.quizForm.getRawValue();
            console.log('Add quiz: ', quizToCreate);
            this.quizService.addQuiz(quizToCreate);
        }
    }
};
QuizFormComponent = tslib_1.__decorate([
    Component({
        selector: 'app-quiz-form',
        templateUrl: './quiz-form.component.html',
        styleUrls: ['./quiz-form.component.scss']
    })
], QuizFormComponent);
export { QuizFormComponent };
//# sourceMappingURL=quiz-form.component.js.map