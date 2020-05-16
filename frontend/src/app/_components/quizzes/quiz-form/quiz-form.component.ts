import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { QuizService } from '../../../../services/quiz.service';
import { Quiz } from '../../../../models/quiz.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  public quizForm: FormGroup;
  public themeForm: FormGroup;
  public QUIZ_THEMES = ['Sport', 'TV', 'Nature', 'Culture', 'Musique', 'Autre'];

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizService.themes$.subscribe((themes: string[]) => {
      this.QUIZ_THEMES = themes;
    });
    this.themeForm = this.formBuilder.group({
      new_theme: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ])
    });
    this.quizForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)
      ]),
      theme: ['']
    });
    this.quizService.setThemesFromUrl();
  }

  ngOnInit() {
  }

  addQuiz() {
    if (this.quizForm.valid) {
      const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
      this.quizService.addQuiz(quizToCreate);
    }
  }

  addTheme() {
    if (this.themeForm.valid) {
      const newTheme = this.themeForm.get('new_theme').value;
      console.log('on ajoute', newTheme);
      this.quizService.addThemeToServer(newTheme);
    }
  }

  getErrorMessage() {
    if (this.quizForm.get('name').hasError('required')) {
      return 'Entrer une valeur';
    }
    if (this.quizForm.get('name').hasError('minlength')) {
      return '(minimum 4 caractère)';
    }
    if (this.quizForm.get('name').hasError('maxlength')) {
      return '(maximum 25 caractère)';
    }
    return "";
  }

}
