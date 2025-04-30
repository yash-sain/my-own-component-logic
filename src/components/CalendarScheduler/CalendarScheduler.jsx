import { useEffect, useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from "date-fns";

export default function CalendarScheduler() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState(() => {
        const storedVal = JSON?.parse(localStorage?.getItem("events"));
        return storedVal ? storedVal : {}
    });
    const [showEventPopup, setShowEventPopup] = useState(false);

    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
    }, [events]);

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
                        onClick={() => { setSelectedDate(cloneDay); setShowEventPopup(true) }}
                        className={`border p-2 h-24 cursor-pointer flex flex-col justify-between rounded-xl transition
              ${!isSameMonth(day, monthStart) ? "text-gray-400" : ""}
              ${isSameDay(day, selectedDate) ? "bg-blue-100 border-blue-500" : "hover:bg-blue-50"}`}
                    >
                        <span className="text-sm font-semibold">{formattedDate}</span>
                        <ul className="text-xs mt-1 overflow-y-auto h-14">
                            {(events[dayKey] || []).map((event, idx) => (
                                <li key={idx} className="truncate">• {event}</li>
                            ))}
                        </ul>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(<div key={day} className="grid grid-cols-7 gap-1">{days}</div>);
            days = [];
        }
        return <div className="space-y-1">{rows}</div>;
    };

    const EventsPopup = () => {
        const [eventName, setEventName] = useState("");
        const handleSubmit = (e) => {
            e?.preventDefault();
            if (!eventName || !selectedDate) return;
            const dateKey = format(selectedDate, "yyyy-MM-dd");
            setEvents(prev => {
                return {
                    ...prev,
                    [dateKey]: [...(prev[dateKey] || []), eventName]
                }
            });
            setEventName("");
            setShowEventPopup(false);
        }
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
                    <form onSubmit={handleSubmit} className="mb-4">
                        <label htmlFor="eventname" className="block text-sm font-medium text-gray-700 mb-1">
                            Event Name
                        </label>
                        <input
                            type="text"
                            id="eventname"
                            name="eventname"
                            value={eventName}
                            onChange={(e) => setEventName(e?.target?.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter event name"
                        />
                        <div className="flex justify-end mt-4 gap-2">
                            <button onClick={() => setShowEventPopup(false)} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm">
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-300 to-blue-200 flex items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-4xl">
                {header()}
                {daysOfWeek()}
                {cells()}
                {showEventPopup && <EventsPopup />}
            </div>
        </div>
    );
}
