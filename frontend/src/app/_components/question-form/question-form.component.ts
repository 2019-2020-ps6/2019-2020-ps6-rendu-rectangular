import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
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

  public questionForm: FormGroup;
  private nbAnswers = 0;

  @Input()
  quiz: Quiz;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService) {
    this.initializeQuestionForm();
  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(35)
      ]),
      answers: this.formBuilder.array([])
    });
    this.nbAnswers = 0;
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
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

  addQuestion() {
    if(this.questionForm.valid) {
      const questionToCreate = this.questionForm.getRawValue() as Question;
      console.log(questionToCreate);
      this.quizService.addQuestion(questionToCreate, this.quiz);
      this.initializeQuestionForm();
    }
  }

  ngOnInit() {
  }
}

function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}

function correctNbOfAnswersValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = this.answers !== 2 || this.answers !== 4;
    return forbidden ? {'nb of answers not correct': {value: control.value}} : null;
  };
}
