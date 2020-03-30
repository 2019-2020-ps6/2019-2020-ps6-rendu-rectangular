import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../../models/quiz.model';
import { Question } from 'src/models/question.model';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  quizToDelete: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  editQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor() {
  }

  ngOnInit() {
  }

  selectQuiz() {
    this.quizSelected.emit(true);
    console.log('select event emitted');
  }

  deleteQuiz(){
    this.quizToDelete.emit(this.quiz);
    console.log('delete event emitted');
    console.log('deleted quiz is: ', this.quiz);
  }

  edit() {
    this.editQuiz.emit(this.quiz);
    console.log('emitted quiz is: ',  this.quiz);
  }
}
