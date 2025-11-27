const choices = ['Rock', 'Paper', 'Scissors'];
const userChoiceSpan = document.getElementById('user-choice');
const computerChoiceSpan = document.getElementById('computer-choice');
const winnerSpan = document.getElementById('winner');
const userScoreSpan = document.getElementById('user-score');
const computerScoreSpan = document.getElementById('computer-score');
const modal = document.getElementById('myModal');
const modalMessage = document.getElementById('modal-message');
const finalScore = document.getElementById('final-score');
const playAgainBtn = document.getElementById('play-again');
const confettiContainer = document.getElementById('confetti-container');

const choiceButtons = document.querySelectorAll('.choice');

let userScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "It's a tie!";
    }

    if (
        (userChoice === 'Rock' && computerChoice === 'Scissors') ||
        (userChoice === 'Paper' && computerChoice === 'Rock') ||
        (userChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
        userScore++;
        return 'You win!';
    } else {
        computerScore++;
        return 'Computer wins!';
    }
}

function updateScore() {
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
}

function checkForWinner() {
    if (userScore === 3 || computerScore === 3) {
        modal.style.display = 'block';
        if (userScore === 3) {
            modalMessage.textContent = 'Congratulations! You won!';
            launchConfetti();
        } else {
            modalMessage.textContent = 'Game Over! Computer won!';
        }
        finalScore.textContent = `Final Score: You ${userScore} - ${computerScore} Computer`;
    }
}

function launchConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiContainer.appendChild(confetti);
    }
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    updateScore();
    userChoiceSpan.textContent = '';
    computerChoiceSpan.textContent = '';
    winnerSpan.textContent = '';
    modal.style.display = 'none';
    confettiContainer.innerHTML = '';
}

function handleClick(userChoice) {
    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);

    userChoiceSpan.textContent = userChoice;
    computerChoiceSpan.textContent = computerChoice;
    winnerSpan.textContent = winner;
    updateScore();
    checkForWinner();
}

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (userScore < 3 && computerScore < 3) {
            const userChoice = button.id.charAt(0).toUpperCase() + button.id.slice(1);
            handleClick(userChoice);
        }
    });
});

playAgainBtn.addEventListener('click', resetGame);

