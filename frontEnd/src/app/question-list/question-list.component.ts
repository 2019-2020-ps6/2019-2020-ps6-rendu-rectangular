import { Component, OnInit } from '@angular/core';
import { Question } from 'src/models/question.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  questions: Question[] = [];

  constructor() { }

  ngOnInit() {
  }

  addQuestion(formGroup: FormGroup) {
    this.questions.push(formGroup.getRawValue() as Question);
  }

}
