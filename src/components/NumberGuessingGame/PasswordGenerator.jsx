import { useState } from "react";

export default function PasswordGenerator() {
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [password, setPassword] = useState("");

    const handleGeneratePassword = () => {
        const UpperCaseLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerCaseLetter = "abcdefghijklmnopqrstuvwxyz";
        const number = "0123456789";
        const symbols = "!@#$%^&*()_+{}[]<>?";
        const passwordGen = `${includeUppercase ? UpperCaseLetter : ""}${includeLowercase ? lowerCaseLetter : ""}${includeNumbers ? number : ""}${includeSymbols ? symbols : ""}`;
        const len = passwordGen?.length


        if (passwordGen.length === 0) {
            setPassword("Please select at least one option.");
            return;
          }

        let str = "";

        for (let i = 0; i < length; i += 1) {
            const genpass = str += passwordGen[Math?.floor(Math?.random() * len)]
            setPassword(genpass);
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-200 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-6">
                <h1 className="text-2xl font-bold text-center">🔐 Password Generator</h1>

                <div>
                    <label className="block font-semibold mb-1">Password Length: {length}</label>
                    <input
                        type="range"
                        min={4}
                        max={32}
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="w-full"
                    />
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={includeUppercase}
                            onChange={() => setIncludeUppercase(!includeUppercase)}
                        />
                        Include Uppercase (A-Z)
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={includeLowercase}
                            onChange={() => setIncludeLowercase(!includeLowercase)}
                        />
                        Include Lowercase (a-z)
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={includeNumbers}
                            onChange={() => setIncludeNumbers(!includeNumbers)}
                        />
                        Include Numbers (0-9)
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={includeSymbols}
                            onChange={() => setIncludeSymbols(!includeSymbols)}
                        />
                        Include Symbols (!@#$%)
                    </label>
                </div>

                <div className="space-y-2">
                    <input
                        type="text"
                        readOnly
                        value={password}
                        placeholder="Generated password"
                        className="w-full border border-gray-300 rounded-xl p-2 text-center"
                    />
                    <button
                        onClick={handleGeneratePassword} // Add logic later
                        className="w-full bg-blue-600 text-white rounded-xl py-2 hover:bg-blue-700 transition"
                    >
                        Generate Password
                    </button>
                    <button
                        onClick={() => navigator.clipboard.writeText(password)}
                        className="w-full bg-gray-200 text-gray-800 rounded-xl py-2 hover:bg-gray-300 transition"
                    >
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        </div>
    );
}
