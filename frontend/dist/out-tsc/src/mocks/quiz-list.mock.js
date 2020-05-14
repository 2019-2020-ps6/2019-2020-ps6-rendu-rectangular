export const QUESTION_ACTOR = {
    label: 'Jean Gabin a joué dans...',
    answers: [
        {
            value: 'Les tuches II',
            isCorrect: false,
        },
        {
            value: 'La grande illusion',
            isCorrect: true,
        }
    ]
};
export const QUESTION_SPORT = {
    label: 'Le judo est un sport',
    answers: [
        {
            value: 'américain',
            isCorrect: false,
        },
        {
            value: 'japonais',
            isCorrect: true,
        }
    ]
};
export const QUIZ_LIST = [
    {
        id: 'oui',
        name: 'Les Acteurs',
        theme: 'Actor',
        questions: [QUESTION_ACTOR],
    },
    { id: 'non',
        name: 'Les Sports',
        theme: 'Sport',
        questions: [QUESTION_SPORT],
    }
];
//# sourceMappingURL=quiz-list.mock.js.map