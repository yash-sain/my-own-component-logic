import { useEffect, useState } from "react";

export default function ExpenseTrackerUI() {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(null);
    const [type, setType] = useState("");
    const [transactions, setTransactions] = useState(() => {
        const getTransactions = JSON?.parse(localStorage?.getItem("transactions"));
        return getTransactions ? getTransactions : []
    });

    useEffect(() => {
        localStorage?.setItem("transactions", JSON?.stringify(transactions))
    }, [transactions]);

    const handleSubmit = (e) => {
        e?.preventDefault();

        if (!title || !amount || !type) return

        if (type === "expense") {
            if (totalBalance < amount) {
                alert("Insufficient Balance")
                return
            }
        }

        const data = {
            id: crypto?.randomUUID(),
            title,
            amount,
            type
        }

        setTransactions(prev => [...prev, data]);
        setTitle("")
        setAmount("");
        setType("");

    }

    const { totalIncome, totalExpense } = transactions.reduce((acc, curr) => {
        if (curr.type === 'income') {
            acc.totalIncome += curr.amount;
        } else if (curr.type === 'expense') {
            acc.totalExpense += curr.amount;
        }
        return acc;
    }, { totalIncome: 0, totalExpense: 0 });


    const totalBalance = transactions.reduce((acc, curr) => {
        return curr.type === 'income'
            ? acc + curr.amount
            : acc - curr.amount;
    }, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-blue-100 p-4 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">💰 Expense Tracker</h1>

                {/* Balance Summary */}
                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div className="bg-green-100 p-4 rounded-xl">
                        <p className="text-sm text-green-700">Income</p>
                        <h2 className="text-xl font-bold text-green-900">${totalIncome}</h2>
                    </div>
                    <div className="bg-red-100 p-4 rounded-xl">
                        <p className="text-sm text-red-700">Expense</p>
                        <h2 className="text-xl font-bold text-red-900">${totalExpense}</h2>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl">
                        <p className="text-sm text-gray-700">Balance</p>
                        <h2 className="text-xl font-bold text-gray-900">${totalBalance}</h2>
                    </div>
                </div>

                {/* Add Transaction */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                    <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e?.target?.value)} placeholder="Title" className="p-2 border rounded-xl" />
                    <input type="number" id="amount" name="amount" value={amount} onChange={(e) => setAmount(Number(e?.target?.value))} placeholder="Amount" className="p-2 border rounded-xl" />
                    <select id="type" name="type" value={type} onChange={(e) => setType(e?.target?.value)} className="p-2 border rounded-xl">
                        <option value="">Select Type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <button type="submit" className="bg-indigo-600 text-white rounded-xl p-2 hover:bg-indigo-700">Add</button>
                </form>

                {/* Transactions List */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-indigo-600 mb-3">Recent Transactions</h3>
                    <ul className="space-y-2">
                        {transactions?.length > 0 ? transactions?.map(transaction => {
                            return (
                                <li key={transaction?.id} className="flex justify-between p-3 bg-gray-50 rounded-xl shadow-sm">
                                    <span>{transaction?.title}</span>
                                    <span className={`${transaction?.type === "income" ? "text-green-500" : "text-red-500"}`}>{transaction?.type === "income" ? transaction?.amount : -transaction?.amount}</span>
                                </li>
                            )
                        }) : <div className="text-center text-xl"><h1>No Expense Found!</h1></div>}
                    </ul>
                </div>

                {/* Chart Placeholder */}
                <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                    Pie Chart Here
                </div>
            </div>
        </div>
    );
}
