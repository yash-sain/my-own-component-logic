import { useEffect, useState } from "react";
import { Eye, EyeOff, X } from 'lucide-react';

export default function PasswordGenerator() {
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [history, setHistory] = useState(() => {
        const getHistory = JSON?.parse(localStorage?.getItem("history"));
        return getHistory ? getHistory : []
    });

    const handleGeneratePassword = () => {
        const UpperCaseLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerCaseLetter = "abcdefghijklmnopqrstuvwxyz";
        const number = "0123456789";
        const symbols = "!@#$%^&*()_+{}[]<>?";
        const passwordGen = `${includeUppercase ? UpperCaseLetter : ""}${includeLowercase ? lowerCaseLetter : ""}${includeNumbers ? number : ""}${includeSymbols ? symbols : ""}`;
        const len = passwordGen?.length


        if (passwordGen.length === 0) {
            alert("Please select at least one option.");
            return;
        }

        let newPassword = "";

        for (let i = 0; i < length; i += 1) {
            newPassword += passwordGen[Math?.floor(Math?.random() * len)]
        }

        setPassword(newPassword);
        setHistory(prev => [...prev, { id: crypto?.randomUUID(), pass: newPassword }]);
    }

    useEffect(() => {
        localStorage?.setItem("history", JSON?.stringify(history));
    }, [password, history]);

    const handleCopyPassword = () => {
        if (password?.length === 0) {
            alert("Password is not copied because the password not write above in password field.")
        } else {
            navigator?.clipboard?.writeText(password);
            alert("Password is copied")
        }
    }

    const handleDeletePassword = (id) => {
        setHistory(data => data?.filter(item => item?.id !== id));
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-indigo-200 to-purple-200 p-4">
            {/* Generator UI */}
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-6">
                <h1 className="text-2xl font-bold text-center">🔐 Password Generator</h1>

                <div>
                    <label className="block font-semibold mb-1">Password Length: {length}</label>
                    <input
                        type="range"
                        min={4}
                        max={32}
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
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
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            readOnly
                            value={password}
                            placeholder="Generated password"
                            className="w-full border border-gray-300 rounded-xl p-2 text-center"
                        />
                        <div
                            className="absolute top-2 right-4 cursor-pointer"
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <Eye /> : <EyeOff />}
                        </div>
                    </div>

                    <button
                        onClick={handleGeneratePassword}
                        className="w-full bg-blue-600 text-white rounded-xl py-2 hover:bg-blue-700 transition"
                    >
                        Generate Password
                    </button>
                    <button
                        onClick={handleCopyPassword}
                        className="w-full bg-gray-200 text-gray-800 rounded-xl py-2 hover:bg-gray-300 transition"
                    >
                        Copy to Clipboard
                    </button>
                </div>
            </div>

            {/* History Panel */}
            <div className="ml-6 w-80 bg-white p-4 rounded-2xl shadow-xl overflow-y-auto max-h-[36rem]">
                <h2 className="text-lg font-bold mb-4">History</h2>
                {history.length === 0 ? (
                    <p className="text-gray-500 text-sm">No passwords generated yet.</p>
                ) : (
                    <ul className="space-y-2 text-sm">
                        {history.map((item) => (
                            <li
                                key={item?.id}
                                className="bg-gray-100 p-2 rounded-lg break-all relative"
                            >
                                {item?.pass}
                                <div className="absolute top-2 right-2 cursor-pointer" onClick={() => handleDeletePassword(item?.id)}>
                                    <X size={16} />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
