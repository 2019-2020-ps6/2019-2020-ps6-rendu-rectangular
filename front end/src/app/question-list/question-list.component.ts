import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/models/question.model';
import { FormGroup } from '@angular/forms';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from '../../models/quiz.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
  }

  deleteQuestion(question: Question) {
    this.quizService.deleteQuestion(this.quiz, question);
  }

}
