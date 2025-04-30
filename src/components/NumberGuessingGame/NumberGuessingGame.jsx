import { useEffect, useState } from "react";

export default function NumberGuessingGame() {
    const [numberGuess, setNumberGuess] = useState("");
    const [correctNumber, setCorrectNumber] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const [message, setMessage] = useState("🔄 Waiting for your guess...");
    const [gameOver, setGameOver] = useState(false);

    // Generate the number on mount or reset
    const generateRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * 100) + 1; // 1-100
        setCorrectNumber(randomNumber);
        setGameOver(false);
        setMessage("🔄 Waiting for your guess...");
        setAttempts(0);
    };

    useEffect(() => {
        generateRandomNumber();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const guess = parseInt(numberGuess);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            setMessage("⚠️ Please enter a number between 1 and 100.");
            return;
        }
        setAttempts(attempts + 1);

        if (attempts !== 9) {
            if (guess > correctNumber) {
                setMessage("☝️ Your number is too high.");
            } else if (guess < correctNumber) {
                setMessage("👇 Your number is too low.");
            } else {
                setMessage("🎉 Correct! You guessed the number!");
                setGameOver(true);
            }
        } else {
            setMessage("You Lose the game! Please try again 😔");
            generateRandomNumber();
            setNumberGuess("");
            setGameOver(true)
            return;
        }
    }

    const handleReset = () => {
        setNumberGuess("");
        generateRandomNumber();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">🎯 Number Guessing Game</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Enter your guess (1-100):
                        </label>
                        <input
                            type="number"
                            value={numberGuess}
                            onChange={(e) => setNumberGuess(e.target.value)}
                            className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Your guess..."
                            disabled={gameOver}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={gameOver}
                        className={`w-full py-2 rounded-xl transition mb-4 ${gameOver
                            ? "bg-gray-300 text-black cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                    >
                        Submit Guess
                    </button>
                </form>

                <div className="text-center text-lg font-semibold text-gray-700 mb-4">
                    {message}
                </div>

                <div className="text-center pb-4">
                    Attempts {attempts} / 10
                </div>

                <button
                    onClick={handleReset}
                    className="w-full bg-gray-200 text-gray-800 py-2 rounded-xl hover:bg-gray-300 transition"
                >
                    Restart Game
                </button>
            </div>
        </div>
    );
}
