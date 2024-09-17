let answersBySliderId = {};
let scoresBySliderId = {};


export function checkAnswer(sliderId, userInput, correctAnswer, slideIndex) {
    console.log('Received correctAnswer:', correctAnswer, 'of type:', typeof correctAnswer);

    // Initialize storage for the given sliderId if it doesn't exist
    if (!answersBySliderId[sliderId]) {
        answersBySliderId[sliderId] = [];
    }
    if (!scoresBySliderId[sliderId]) {
        scoresBySliderId[sliderId] = 0;
    }

    // Convert correctAnswer to a string to handle any data type
    const correctAnswerStr = String(correctAnswer).trim();
    const isCorrect = userInput.trim() === correctAnswerStr;

    // Ensure the array can accommodate the given slideIndex
    if (slideIndex >= answersBySliderId[sliderId].length) {
        answersBySliderId[sliderId].length = slideIndex + 1;
    }

    // Update the answer for the given slide
    answersBySliderId[sliderId][slideIndex] = {
        userInput: userInput.trim(),
        correctAnswer: correctAnswerStr,
        isCorrect: isCorrect,
        answered: true,
    };

    // Recalculate the score for this sliderId
    scoresBySliderId[sliderId] = answersBySliderId[sliderId].filter(answer => answer && answer.isCorrect).length;

    console.log(`Updated answers for ${sliderId}:`, answersBySliderId[sliderId]);
    console.log(`Current score for ${sliderId}:`, scoresBySliderId[sliderId]);

    // Dispatch the 'answersUpdated' event with the sliderId
    document.dispatchEvent(new CustomEvent('answersUpdated', { detail: { sliderId } }));
}



export function getScore(sliderId) {
    return scoresBySliderId[sliderId] || 0;
}

export function getAnswers(sliderId) {
    return answersBySliderId[sliderId] ? answersBySliderId[sliderId].filter(answer => answer !== undefined) : [];
}

