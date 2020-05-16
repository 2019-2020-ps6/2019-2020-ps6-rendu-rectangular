import { Quiz } from './quiz.model';
import { User } from './user.model';

export interface QuizGame {
    quizGameId: number;
    usersAnswers: number[];
    quiz: Quiz;
    user: User;
    gameDate: Date;
}
