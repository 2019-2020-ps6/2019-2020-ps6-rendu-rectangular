import { Quiz } from './quiz.model';
import { User } from './user.model';

export class QuizGame {

    quizGameId: number;
    usersAnswers: number[] = [];

    constructor(public quiz: Quiz, public user: User) {

    }
}
