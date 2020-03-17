import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Question } from 'src/models/question.model';
import { QuestionListComponent } from '../question-list/question-list.component';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  public questionForm: FormGroup;

  //@Output()
  //questionToAdd: EventEmitter <Question> = new EventEmitter<Question>();

  constructor(public formBuilder: FormBuilder) { 
    this.initializeQuestionForm();
  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      name: [''],
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

  onSubmitForm() {
    //this.questionList.addQuestion(this.questionForm);
  }

  ngOnInit() {
  }


}
