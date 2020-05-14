export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
}

export interface Question {
    id?: string;
    image?: string;
    label: string;
    answers: Answer[];
}
