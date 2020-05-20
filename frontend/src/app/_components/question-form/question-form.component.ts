import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Question } from 'src/models/question.model';
import { QuestionListComponent } from '../question-list/question-list.component';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, private quizService: QuizService) {
    this.initializeQuestionForm();
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  public questionForm: FormGroup;
  private nbAnswers = 0;
  private control = 0;


  @Input()
  quiz: Quiz;

  isValid = false;

  private initializeQuestionForm() {
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

  private createAnswer() {
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

  deleteAnswer(i: number) {
    if(this.answers.value[i].isCorrect){
      this.control -= 1;
    }
    this.answers.removeAt(i);
    this.nbAnswers--;
  }

  addQuestion() {
    if (this.questionForm.valid) {
      const questionToCreate = this.questionForm.getRawValue() as Question;
      this.quizService.addQuestion(questionToCreate, this.quiz);
      this.initializeQuestionForm();
    }
  }

  getErrorMessageLabel() {
    if (this.questionForm.get('label').hasError('required')) {
      return 'Entrer une valeur';
    }
    if (this.questionForm.get('label').hasError('minlength')) {
      return '(minimum 4 caractères)';
    }
    if (this.questionForm.get('label').hasError('maxlength')) {
      return '(maximum 35 caractères)';
    }
    return '';
  }

  getErrorMessageAnswer(i: number) {
    console.log(this.questionForm.get("answers").get(i.toString()));
    if (this.questionForm.get("answers").get(i.toString()).get("value").hasError('required')) {
      return 'Entrer une valeur';
    }
    if (this.questionForm.get("answers").get(i.toString()).get("value").hasError('minlength')) {
      return '(minimum 4 caractères)';
    }
    if (this.questionForm.get("answers").get(i.toString()).get("value").hasError('maxlength')) {
      return '(maximum 15 caractères)';
    }
    return '';
  }

  onNativeChange(e) {
    if (e.target.checked) {
      this.control += 1;
    }
    if (!e.target.checked) {
      this.control -= 1;
    }
  }

  ngOnInit() {
  }
}

