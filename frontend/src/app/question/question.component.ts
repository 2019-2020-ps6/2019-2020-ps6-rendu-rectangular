import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  questionDelete: EventEmitter<Question> = new EventEmitter<Question>();

  constructor() { }

  ngOnInit() {
  }

  deleteQuestion() {
    this.questionDelete.emit(this.question);
  }

}
