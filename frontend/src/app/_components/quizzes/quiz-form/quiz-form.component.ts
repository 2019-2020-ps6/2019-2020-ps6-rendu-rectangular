import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { QuizService } from '../../../../services/quiz.service';
import { Quiz } from '../../../../models/quiz.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  public quizForm: FormGroup;
  public QUIZ_THEMES = ['Sport', 'TV', 'Nature', 'Culture', 'Musique', 'Autre'];

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)
      ]),
      theme: ['']
    });

  }

  ngOnInit() {
  }

  addQuiz() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    if (this.quizForm.valid) {
      const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
      console.log('Add quiz: ', quizToCreate);
      this.quizService.addQuiz(quizToCreate);
    }
  }

}
