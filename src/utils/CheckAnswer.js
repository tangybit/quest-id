let answersBySliderId = {};
let scoresBySliderId = {};


export function checkAnswer(sliderId, userInput, correctAnswer, slideIndex) {
    console.log('Received correctAnswer:', correctAnswer, 'of type:', typeof correctAnswer);

    if (!answersBySliderId[sliderId]) {
        answersBySliderId[sliderId] = [];
    }
    if (!scoresBySliderId[sliderId]) {
        scoresBySliderId[sliderId] = 0;
    }

    const correctAnswerStr = String(correctAnswer).trim();
    const isCorrect = userInput.trim() === correctAnswerStr;


    if (slideIndex >= answersBySliderId[sliderId].length) {
        answersBySliderId[sliderId].length = slideIndex + 1;
    }

    answersBySliderId[sliderId][slideIndex] = {
        userInput: userInput.trim(),
        correctAnswer: correctAnswerStr,
        isCorrect: isCorrect,
        answered: true,
    };

    scoresBySliderId[sliderId] = answersBySliderId[sliderId].filter(answer => answer && answer.isCorrect).length;

    document.dispatchEvent(new CustomEvent('answersUpdated', { detail: { sliderId } }));
}

export function getScore(sliderId) {
    return scoresBySliderId[sliderId] || 0;
}

export function getAnswers(sliderId) {
    return answersBySliderId[sliderId] ? answersBySliderId[sliderId].filter(answer => answer !== undefined) : [];
}

