"use client";

import { useState, memo } from "react";

interface CalendarPickerProps {
    selectedDate: Date | null;
    onDateSelect: (date: Date) => void;
}

export const CalendarPicker = memo(function CalendarPicker({
    selectedDate,
    onDateSelect
}: CalendarPickerProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    const handleDateClick = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        if (date >= today) {
            onDateSelect(date);
            setIsOpen(false);
        }
    };

    const formatDate = (date: Date) => {
        return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-muted/30 border border-border rounded-sm px-4 py-3 text-left hover:border-foreground/30 transition-colors flex items-center justify-between"
            >
                <span className={selectedDate ? "text-foreground" : "text-muted-foreground"}>
                    {selectedDate ? formatDate(selectedDate) : "Select a date"}
                </span>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-background border border-border rounded-lg shadow-2xl z-50">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <button
                            type="button"
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                            className="p-1 hover:bg-muted rounded"
                        >
                            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <span className="font-medium">
                            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                        <button
                            type="button"
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                            className="p-1 hover:bg-muted rounded"
                        >
                            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 p-2">
                        {dayNames.map(day => (
                            <div key={day} className="text-center text-xs text-muted-foreground py-1">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 p-2 pt-0">
                        {days.map((day, index) => {
                            if (day === null) return <div key={`empty-${index}`} className="w-8 h-8" />;

                            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                            const isPast = date < today;
                            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => handleDateClick(day)}
                                    disabled={isPast}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full text-xs transition-colors ${isSelected
                                            ? "bg-accent text-white"
                                            : isPast
                                                ? "text-muted-foreground/30 cursor-not-allowed"
                                                : "hover:bg-muted"
                                        }`}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
});
