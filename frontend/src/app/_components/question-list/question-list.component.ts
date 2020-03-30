import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../../models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Input()
  question: Question;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
  }

  deleteQuestion(question: Question) {
    this.quizService.deleteQuestion(question, this.quiz);
  }



}
