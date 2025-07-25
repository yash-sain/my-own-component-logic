import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const months = [
  { name: "January", id: 1 },
  { name: "February", id: 2 },
  { name: "March", id: 3 },
  { name: "April", id: 4 },
  { name: "May", id: 5 },
  { name: "June", id: 6 },
  { name: "July", id: 7 },
  { name: "August", id: 8 },
  { name: "September", id: 9 },
  { name: "October", id: 10 },
  { name: "November", id: 11 },
  { name: "December", id: 12 },
];

export default function ExpenseTrackerUI() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [transactions, setTransactions] = useState(() => {
    const storedValue = JSON?.parse(localStorage?.getItem("transactions"));
    return storedValue ? storedValue : [];
  });
  const [getMonth, setGetMonth] = useState("");
  const [findMonth, setFindMonth] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (!title || !amount || !type || !getMonth) return;

    const numAmount = Number(amount);

    if (type === "expense") {
      if (totalBalance < numAmount) {
        alert("Insufficient Balance");
        return;
      }
    }

    const data = {
      id: crypto?.randomUUID(),
      title,
      amount: numAmount,
      type,
      month: getMonth,
    };

    setTransactions((prev) => [...prev, data]);
    setTitle("");
    setAmount("");
    setType("");
    setGetMonth("");
  };

  const { totalIncome, totalExpense } = transactions.reduce(
    (acc, curr) => {
      if (curr.type === "income") {
        acc.totalIncome += curr.amount;
      } else if (curr.type === "expense") {
        acc.totalExpense += curr.amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpense: 0 }
  );

  const totalBalance = transactions.reduce((acc, curr) => {
    return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
  }, 0);

  const selectFilterData = (e) => {
    setFindMonth(e?.target?.value);
  };

  // Filter transactions based on selected month
  const filteredTransactions = transactions.filter((transaction) =>
    findMonth ? transaction?.month === findMonth : true
  );

  // Prepare chart data - group by transaction type
  const prepareChartData = () => {
    const chartData = [];

    // Calculate totals for the filtered data
    const incomeTotal = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenseTotal = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    if (incomeTotal > 0) {
      chartData.push({
        name: "Income",
        amount: incomeTotal,
        fill: "#10b981",
      });
    }

    if (expenseTotal > 0) {
      chartData.push({
        name: "Expense",
        amount: expenseTotal,
        fill: "#ef4444",
      });
    }

    return chartData;
  };

  const chartData = prepareChartData();

  useEffect(() => {
    localStorage?.setItem("transactions", JSON?.stringify(transactions));
  }, [transactions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-blue-100 p-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          💰 Expense Tracker
        </h1>

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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e?.target?.value)}
            placeholder="Title"
            className="p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e?.target?.value)}
            placeholder="Amount"
            className="p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e?.target?.value)}
            className="p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            name="month"
            id="month"
            className="p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={getMonth}
            onChange={(e) => setGetMonth(e?.target?.value)}
          >
            <option value="">Select Month</option>
            {months?.map((month) => (
              <option key={month?.id} value={month?.name}>
                {month?.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-indigo-600 text-white rounded-xl p-2 hover:bg-indigo-700 transition-colors"
          >
            Add Transaction
          </button>
        </div>

        {/* Transactions List */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-indigo-600">
            Recent Transactions {findMonth && `- ${findMonth}`}
          </h3>
          <select
            name="filterMonth"
            id="filterMonth"
            className="p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={findMonth}
            onChange={selectFilterData}
          >
            <option value="">All Months</option>
            {months?.map((month) => (
              <option key={month?.id} value={month?.name}>
                {month?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          {filteredTransactions.length === 0 ? (
            <div className="text-center text-xl py-8">
              <h1 className="text-gray-500">No Transactions Found!</h1>
            </div>
          ) : (
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {filteredTransactions.map((transaction) => (
                <li
                  key={transaction?.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-xl shadow-sm"
                >
                  <div>
                    <span className="font-medium">{transaction?.title}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({transaction?.month})
                    </span>
                  </div>
                  <span
                    className={`font-bold ${
                      transaction?.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction?.type === "income"
                      ? `$${transaction?.amount}`
                      : `$${Math?.abs(`-${transaction?.amount}`)}`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chart */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4 text-center">
            {findMonth ? `${findMonth} ` : ""}Income vs Expenses Chart
          </h3>
          {chartData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-400">
              <p>No data to display</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <BarChart
                width={400}
                height={300}
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
