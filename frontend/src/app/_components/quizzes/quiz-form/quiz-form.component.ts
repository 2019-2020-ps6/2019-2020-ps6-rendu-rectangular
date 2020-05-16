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

  private themeToRemove: string = null;
  public quizForm: FormGroup;
  public themeForm: FormGroup;
  public QUIZ_THEMES = ['Sport', 'TV', 'Nature', 'Culture', 'Musique', 'Autre'];

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizService.themes$.subscribe((themes: string[]) => {
      this.QUIZ_THEMES = themes;
      this.themeToRemove = themes[0];
    });
    this.initializeThemeForm();
    this.initializeQuizForm();
    this.quizService.setThemesFromUrl();
  }

  initializeThemeForm() {
    this.themeForm = this.formBuilder.group({
      new_theme: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ])
    });
  }

  initializeQuizForm() {
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
      this.initializeThemeForm();
    }
  }

  removeTheme() {
    console.log(this.themeToRemove);
  }

  getErrorMessage() {
    if (this.quizForm.get('name').hasError('required')) {
      return 'Entrez une valeur';
    }
    if (this.quizForm.get('name').hasError('minlength')) {
      return '(minimum 4 caractères)';
    }
    if (this.quizForm.get('name').hasError('maxlength')) {
      return '(maximum 25 caractères)';
    }
    return "";
  }

}
