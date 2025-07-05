// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css"; // Make sure this path is correct for your App.css location

// Import core game logic functions based on your specified paths
import { createNewPlayer } from "./logic/player/playerStats";
import { initializeRelationships } from "./logic/RelationshipLogic/relationshipIndex"; // Corrected path
import { advanceTurn, processChoice } from "./logic/game/gameLoop";
import {
  getGameState,
  setGameState,
  updateGameStateProperty,
  resetGameState,
} from "./logic/game/gameState";
import { saveGame, loadGame, clearSave } from "./logic/saves/saveLoad";
import { on, off, emit, GAME_EVENTS } from "./logic/game/gameEvents";

function App() {
  // Local state to trigger re-renders when game state changes
  const [gameData, setGameData] = useState(getGameState());
  const [message, setMessage] = useState(""); // For displaying game messages

  // Effect to initialize game or load save on component mount
  useEffect(() => {
    // Register event listener for messages
    const messageListener = (msg) => {
      setMessage(msg);
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    };
    on(GAME_EVENTS.MESSAGE_DISPLAYED, messageListener);

    // Register event listener for game over
    const gameOverListener = (reason) => {
      updateGameStateProperty("gameOver", true);
      updateGameStateProperty("gameOverReason", reason);
      setGameData(getGameState()); // Force re-render
      setMessage(`Game Over! ${reason}`);
    };
    on(GAME_EVENTS.GAME_OVER, gameOverListener);

    // Try to load a saved game
    const loadedState = loadGame();
    if (loadedState) {
      setGameState(loadedState);
      setGameData(getGameState());
      setMessage("Game loaded successfully!");
    } else {
      // If no save, prompt to start a new game
      setMessage("Welcome! Start a New Game.");
    }

    // Cleanup event listeners on unmount
    return () => {
      off(GAME_EVENTS.MESSAGE_DISPLAYED, messageListener);
      off(GAME_EVENTS.GAME_OVER, gameOverListener);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Function to start a new game
  const handleNewGame = () => {
    resetGameState(); // Clear any existing state
    const player = createNewPlayer();
    const relationships = initializeRelationships(player); // Initialize relationships

    // Advance turn once to get the first scenario
    const {
      player: initialPlayer,
      scenario: firstScenario,
      gameOver,
      gameOverReason,
    } = advanceTurn(player);

    setGameState({
      player: initialPlayer,
      relationships: relationships,
      currentScenario: firstScenario,
      gameOver: gameOver,
      gameOverReason: gameOverReason,
    });
    setGameData(getGameState()); // Update local state to trigger re-render
    clearSave(); // Clear previous save
    setMessage("New game started! Good luck, Shinobi!");
    emit(GAME_EVENTS.NEW_GAME_STARTED);
  };

  // Function to handle "Age Up" button click
  const handleAgeUp = () => {
    if (gameData.gameOver) return;

    const { player, scenario, gameOver, gameOverReason } = advanceTurn(
      gameData.player
    );

    updateGameStateProperty("player", player);
    updateGameStateProperty("currentScenario", scenario);
    updateGameStateProperty("gameOver", gameOver);
    updateGameStateProperty("gameOverReason", gameOverReason);
    setGameData(getGameState()); // Force re-render

    if (gameOver) {
      emit(GAME_EVENTS.GAME_OVER, gameOverReason);
    } else {
      emit(GAME_EVENTS.PLAYER_AGED, player.age);
      emit(GAME_EVENTS.SCENARIO_PRESENTED, scenario);
    }
  };

  // Function to handle choice selection
  const handleChoice = (choiceIndex) => {
    if (gameData.gameOver || !gameData.currentScenario) return;

    const { player: updatedPlayer, relationships: updatedRelationships } =
      processChoice(
        gameData.player,
        gameData.relationships, // Pass relationships to processChoice
        gameData.currentScenario,
        choiceIndex
      );

    updateGameStateProperty("player", updatedPlayer);
    updateGameStateProperty("relationships", updatedRelationships); // Update relationships in state
    setGameData(getGameState()); // Force re-render

    emit(
      GAME_EVENTS.CHOICE_MADE,
      choiceIndex,
      gameData.currentScenario.choices[choiceIndex]
    );

    // After making a choice, we immediately advance to the next turn/scenario
    handleAgeUp();
  };

  // Function to save the game
  const handleSaveGame = () => {
    saveGame(getGameState());
  };

  // Function to load the game
  const handleLoadGame = () => {
    const loadedState = loadGame();
    if (loadedState) {
      setGameState(loadedState);
      setGameData(getGameState());
      setMessage("Game loaded successfully!");
    } else {
      setMessage("No game found to load.");
    }
  };

  const player = gameData.player;
  const currentScenario = gameData.currentScenario;

  return (
    <div className="game-container">
      <div className="game-card">
        <h1 className="game-title">Naruto Life</h1>

        {/* Game Control Buttons */}
        <div className="button-group">
          <button
            onClick={handleNewGame}
            className="button-game-control button-new-game"
          >
            New Game
          </button>
          <button
            onClick={handleSaveGame}
            className="button-game-control button-save-game"
          >
            Save Game
          </button>
          <button
            onClick={handleLoadGame}
            className="button-game-control button-load-game"
          >
            Load Game
          </button>
        </div>

        {/* Global Message Display */}
        {message && <div className="game-message">{message}</div>}

        {gameData.gameOver ? (
          <div className="game-over-screen">
            <p className="game-over-title">
              {gameData.gameOverReason || "Game Over!"}
            </p>
            <p className="game-over-text">Your journey has ended.</p>
            {/* You'll add the recap here later */}
          </div>
        ) : player ? (
          <>
            {/* Player Stats */}
            <div className="player-stats-card">
              <h2 className="section-title">Your Shinobi Life</h2>
              {player.firstName && player.lastName && (
                <p className="player-name">
                  <strong>Name:</strong> {player.firstName} {player.lastName} (
                  {player.clan} Clan)
                </p>
              )}
              <div className="player-stats-grid">
                <p>
                  <strong>Age:</strong> {player.age}
                </p>
                <p>
                  <strong>Health:</strong> {player.health}
                </p>
                <p>
                  <strong>Happiness:</strong> {player.happiness}
                </p>
                <p>
                  <strong>Smarts:</strong> {player.smarts}
                </p>
                <p>
                  <strong>Looks:</strong> {player.looks}
                </p>
                <p>
                  <strong>Karma:</strong> {player.karma}
                </p>
                <p>
                  <strong>Chakra:</strong> {player.chakra}
                </p>
                <p>
                  <strong>Ninjutsu:</strong> {player.ninjutsuSkill}
                </p>
                <p>
                  <strong>Taijutsu:</strong> {player.taijutsuSkill}
                </p>
                <p>
                  <strong>Money:</strong> 💰{player.money}
                </p>
              </div>
            </div>

            {/* Current Scenario */}
            {currentScenario ? (
              <div className="scenario-card">
                <div className="scenario-prompt">
                  <h2 className="section-title">What will you do?</h2>
                  <p className="scenario-text">{currentScenario.text}</p>
                  <div className="scenario-choices-grid">
                    {currentScenario.choices.map((choice, index) => (
                      <button
                        key={index}
                        onClick={() => handleChoice(index)}
                        className="choice-button"
                      >
                        {choice.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="no-scenario-message">
                No scenario currently active. Age up to continue!
              </p>
            )}

            {/* Age Up Button - Only show if not game over and a scenario has been processed */}
            {player && !gameData.gameOver && (
              <div className="age-up-button-container">
                <button onClick={handleAgeUp} className="age-up-button">
                  Age Up ({player.age + 1} Years Old)
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="start-game-message">
            Click "New Game" to begin your shinobi journey!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
