import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
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

  @Input()
  quiz: Quiz;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService) { 
    this.initializeQuestionForm();
  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      answers: this.formBuilder.array([])
    });
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer() {
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }

  addAnswer() {
    console.log('Answer added');
    this.answers.push(this.createAnswer());
  }

  addQuestion() { 
    const questionToCreate = this.questionForm.getRawValue() as Question;
    console.log(questionToCreate);
    this.quizService.addQuestion(questionToCreate, this.quiz);
    this.initializeQuestionForm();
  }

  ngOnInit() {
  }


}
