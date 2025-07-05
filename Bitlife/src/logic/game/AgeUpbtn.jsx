/**
 * AgeUpBtn component.
 * @param {Object} props - The component props.
 * @param {Function} props.onAgeUp - Callback function to be called when the button is clicked.
 * @param {number} props.currentAge - The current age of the player, used for display.
 * @param {boolean} props.isGameOver - Indicates if the game is currently in a game over state.
 */
function AgeUpBtn({ onAgeUp, currentAge, isGameOver }) {
    // The button should be disabled if the game is over.
    if (isGameOver) {
        return null; // Or render a disabled button/message
    }

    return (
        <div className="age-up-button-container">
            <button
                onClick={onAgeUp}
                className="age-up-button"
                disabled={isGameOver} // Disable button if game is over
            >
                Age Up ({currentAge + 1} Years Old)
            </button>
        </div>
    );
}

export default AgeUpBtn;
