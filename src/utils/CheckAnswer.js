let answers = [];
let score = 0;

export function checkAnswer(userInput, correctAnswer, slideIndex) {
    const isCorrect = userInput.trim() === correctAnswer.trim();

    // Ensure the array can accommodate the given slideIndex
    if (slideIndex >= answers.length) {
        answers.length = slideIndex + 1; // Adjust the length of the array to fit the slideIndex
    }

    // Update the answer for the given slide
    answers[slideIndex] = {
        userInput: userInput.trim(),
        correctAnswer: correctAnswer.trim(),
        isCorrect: isCorrect,
        answered: true,
    };

    // Recalculate the score, filtering out any undefined or empty elements
    score = answers.filter(answer => answer && answer.isCorrect).length;

    console.log('Updated answers:', answers);
    console.log('Current score:', score);
}

// Function to get the current score
export function getScore() {
    return score;
}

export function getAnswers() {
    // Return only the answered elements
    return answers.filter(answer => answer !== undefined);
}
