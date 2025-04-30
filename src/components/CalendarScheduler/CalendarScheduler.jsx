import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from "date-fns";

export default function CalendarScheduler() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState({});

    const header = () => {
        return (
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                    className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                >
                    ◀ Prev
                </button>
                <h2 className="text-xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>
                <button
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                    className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                >
                    Next ▶
                </button>
            </div>
        );
    };

    const daysOfWeek = () => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return (
            <div className="grid grid-cols-7 text-center font-medium mb-2">
                {days.map((day, idx) => (
                    <div key={idx}>{day}</div>
                ))}
            </div>
        );
    };

    const cells = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const formattedDate = format(day, "d");
                const cloneDay = day;
                const dayKey = format(day, "yyyy-MM-dd");

                days.push(
                    <div
                        key={day}
                        onClick={() => setSelectedDate(cloneDay)}
                        className={`border p-2 h-24 cursor-pointer flex flex-col justify-between rounded-xl transition
              ${!isSameMonth(day, monthStart) ? "text-gray-400" : ""}
              ${isSameDay(day, selectedDate) ? "bg-blue-100 border-blue-500" : "hover:bg-blue-50"}`}
                    >
                        <span className="text-sm font-semibold">{formattedDate}</span>
                        <div className="text-xs truncate text-blue-600">
                            {events[dayKey]?.[0]?.title || ""}
                        </div>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(<div key={day} className="grid grid-cols-7 gap-1">{days}</div>);
            days = [];
        }
        return <div className="space-y-1">{rows}</div>;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-300 to-blue-200 flex items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-4xl">
                {header()}
                {daysOfWeek()}
                {cells()}
            </div>
        </div>
    );
}
