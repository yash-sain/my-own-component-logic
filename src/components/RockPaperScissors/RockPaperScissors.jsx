import { useState } from "react";

export default function RockPaperScissors() {

    const [randomRockPaperScissors, setrandomRockPaperScissors] = useState("-");
    const [userStonePaperScissors, setUserStonePaperScissors] = useState("-");
    const [userScore, setUserScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [message, setMessage] = useState("It's a draw");

    const generateRandomRockPaperScissors = (userChoose) => {
        const randomChoice = ["✋ Paper", "✊ Rock", "✌️ Scissors"]
        const computerChoice = randomChoice[Math?.floor(Math?.random() * 3)];

        setUserStonePaperScissors(userChoose)
        setrandomRockPaperScissors(computerChoice);

        if ((computerChoice === "✋ Paper" && userChoose === "✊ Rock") || (computerChoice === "✊ Rock" && userChoose === "✌️ Scissors") || (computerChoice === "✌️ Scissors" && userChoose === "✋ Paper")) {
            setComputerScore(prev => prev + 1);
            setMessage("You Loose!");
        } else if ((userChoose === "✋ Paper" && computerChoice === "✊ Rock") || (userChoose === "✊ Rock" && computerChoice === "✌️ Scissors") || (userChoose === "✌️ Scissors" && computerChoice === "✋ Paper")) {
            setUserScore(prev => prev + 1)
            setMessage("You Win!");
        } else {
            setMessage("It's a draw");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-300 to-blue-200 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-4">✊✋✌️ Rock Paper Scissors</h1>

                {/* Choices */}
                <div className="flex justify-around mb-6">
                    <button onClick={() => generateRandomRockPaperScissors("✊ Rock")} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition">
                        ✊ Rock
                    </button>
                    <button onClick={() => generateRandomRockPaperScissors("✋ Paper")} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition">
                        ✋ Paper
                    </button>
                    <button onClick={() => generateRandomRockPaperScissors("✌️ Scissors")} className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-xl transition">
                        ✌️ Scissors
                    </button>
                </div>

                {/* Result */}
                <div className="text-lg font-medium text-gray-700 mb-4">
                    {/* Example result */}
                    🙍 User chose: <span className="font-bold">{userStonePaperScissors}</span> <br />
                    🧠 Computer chose: <span className="font-bold">{randomRockPaperScissors}</span> <br />
                    🏆 Result: <span className={`font-bold text-gray-600`}>{message}</span>
                </div>

                {/* Scoreboard */}
                <div className="text-sm text-gray-600 mb-4">
                    👤 You: {userScore} | 🤖 Computer: {computerScore}
                </div>

                {/* Restart */}
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-xl transition">
                    Restart Game
                </button>
            </div>
        </div>
    );
}
