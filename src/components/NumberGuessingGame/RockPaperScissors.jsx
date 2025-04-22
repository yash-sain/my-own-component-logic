import { useEffect, useState } from "react";

export default function RockPaperScissors() {

    const [randomRockPaperScissors, setrandomRockPaperScissors] = useState("✊ Rock");
    const [userStonePaperScissors, setUserStonePaperScissors] = useState("");

    const generateRandomRockPaperScissors = () => {
        const randomChoice = ["✋ Paper", "✊ Rock", "✌️ Scissors"]
        const randomNumber = Math?.round(Math?.random() * 2);
        setrandomRockPaperScissors(randomChoice[randomNumber]);
    }

    // useEffect(() => {})


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-300 to-blue-200 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-4">✊✋✌️ Rock Paper Scissors</h1>

                {/* Choices */}
                <div className="flex justify-around mb-6">
                    <button onClick={() => { setUserStonePaperScissors("✊ Rock"); generateRandomRockPaperScissors() }} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition">
                        ✊ Rock
                    </button>
                    <button onClick={() => { setUserStonePaperScissors("✋ Paper"); generateRandomRockPaperScissors() }} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition">
                        ✋ Paper
                    </button>
                    <button onClick={() => { setUserStonePaperScissors("✌️ Scissors"); generateRandomRockPaperScissors() }} className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-xl transition">
                        ✌️ Scissors
                    </button>
                </div>

                {/* Result */}
                <div className="text-lg font-medium text-gray-700 mb-4">
                    {/* Example result */}
                    🧠 Computer chose: <span className="font-bold">{randomRockPaperScissors}</span> <br />
                    🏆 Result: <span className="text-green-600 font-bold">You Win!</span>
                </div>

                {/* Scoreboard */}
                <div className="text-sm text-gray-600 mb-4">
                    👤 You: 2 | 🤖 Computer: 1
                </div>

                {/* Restart */}
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-xl transition">
                    Restart Game
                </button>
            </div>
        </div>
    );
}
