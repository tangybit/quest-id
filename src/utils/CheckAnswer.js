let answersBySliderId = {};
let scoresBySliderId = {};
let flaggedQuestions = {};
let skippedQuestions = {};

function highlightDifferences(userInput, correctAnswer) {
    let highlightedText = '';
    const length = Math.max(userInput.length, correctAnswer.length);

    for (let i = 0; i < length; i++) {
        if (userInput[i] !== correctAnswer[i]) {
            highlightedText += `<span style="color: red;">${userInput[i] || ''}</span>`;
        } else {
            highlightedText += userInput[i] || '';
        }
    }

    return highlightedText;
}

export function checkAnswer(sliderId, userInput, correctAnswer, slideIndex) {
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

    const highlightedInput = highlightDifferences(userInput.trim(), correctAnswerStr);

    answersBySliderId[sliderId][slideIndex] = {
        userInput: highlightedInput,
        correctAnswer: correctAnswerStr,
        isCorrect: isCorrect,
        answered: true,
    };

    scoresBySliderId[sliderId] = answersBySliderId[sliderId].filter(answer => answer && answer.isCorrect).length;

    document.dispatchEvent(new CustomEvent('answersUpdated', { detail: { sliderId } }));
}


// export function checkAnswer(sliderId, userInput, correctAnswer, slideIndex) {
//     console.log('Received correctAnswer:', correctAnswer, 'of type:', typeof correctAnswer);

//     if (!answersBySliderId[sliderId]) {
//         answersBySliderId[sliderId] = [];
//     }
//     if (!scoresBySliderId[sliderId]) {
//         scoresBySliderId[sliderId] = 0;
//     }

//     const correctAnswerStr = String(correctAnswer).trim();
//     const isCorrect = userInput.trim() === correctAnswerStr;

//     if (slideIndex >= answersBySliderId[sliderId].length) {
//         answersBySliderId[sliderId].length = slideIndex + 1;
//     }

//     answersBySliderId[sliderId][slideIndex] = {
//         userInput: userInput.trim(),
//         correctAnswer: correctAnswerStr,
//         isCorrect: isCorrect,
//         answered: true,
//     };

//     scoresBySliderId[sliderId] = answersBySliderId[sliderId].filter(answer => answer && answer.isCorrect).length;

//     console.log(`Number of slides for sliderId ${sliderId}:`, answersBySliderId[sliderId].length);
//     console.log(`Processing answer for slideIndex: ${slideIndex}`);
//     document.dispatchEvent(new CustomEvent('answersUpdated', { detail: { sliderId } }));
// }


export function skipAnswer(sliderId, slideIndex, correctAnswer = null) {
    // Ensure the skippedQuestions object is initialized for this sliderId
    if (!skippedQuestions[sliderId]) {
        skippedQuestions[sliderId] = [];
    }

    // Ensure the answersBySliderId object is initialized for this sliderId
    if (!answersBySliderId[sliderId]) {
        answersBySliderId[sliderId] = [];
    }

    // If correctAnswer is not provided, try to get it from the existing answersBySliderId
    if (!correctAnswer && answersBySliderId[sliderId][slideIndex]) {
        correctAnswer = answersBySliderId[sliderId][slideIndex].correctAnswer;
    }

    // Log the correct answer to debug
    console.log(`Correct answer for slideIndex ${slideIndex}:`, correctAnswer);

    // Check if the question is already marked as skipped to avoid duplicates
    if (!skippedQuestions[sliderId].includes(slideIndex)) {
        // Mark the question as "skipped" and store its index
        skippedQuestions[sliderId].push(slideIndex);

        // Log that the question was skipped
        console.log(`Question skipped: SliderId ${sliderId}, SlideIndex ${slideIndex}`);

        // Store the skipped state in answersBySliderId for this question
        answersBySliderId[sliderId][slideIndex] = {
            userInput: 'Skipped', // Mark skipped with "Skipped"
            correctAnswer: correctAnswer || 'N/A', // Store correct answer or mark as N/A
            isCorrect: false, // Skipped questions are treated as incorrect
            answered: false, // Mark it as not answered
            status: 'skipped' // Status is 'skipped'
        };

        // Log the updated answer for this slide index
        console.log(`Updated answersBySliderId for SlideIndex ${slideIndex}:`, answersBySliderId[sliderId][slideIndex]);
    } else {
        console.log(`Question already skipped: SliderId ${sliderId}, SlideIndex ${slideIndex}`);
    }

    // Log the final state of skippedQuestions and answersBySliderId after the function execution
    console.log(`Final skippedQuestions for SliderId ${sliderId}:`, skippedQuestions[sliderId]);
    console.log(`Final answersBySliderId for SliderId ${sliderId}:`, answersBySliderId[sliderId]);

    // Dispatch an event to notify the UI
    document.dispatchEvent(new CustomEvent('answersUpdated', { detail: { sliderId } }));
}


export function getScore(sliderId) {
    return scoresBySliderId[sliderId] || 0;
}

export function getAnswers(sliderId) {
    return answersBySliderId[sliderId] ? answersBySliderId[sliderId].filter(answer => answer !== undefined) : [];
}

export function getSkippedQuestions(sliderId) {
    return skippedQuestions[sliderId] || [];
}

export function getHighlightedInput(sliderId, slideIndex) {
    return answersBySliderId[sliderId] && answersBySliderId[sliderId][slideIndex]
        ? answersBySliderId[sliderId][slideIndex].userInput
        : '';
}