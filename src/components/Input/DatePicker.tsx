import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Icons, renderIcon } from '../../icons';

interface DatePickerProps {
  value?: string; // ISO format YYYY-MM-DD
  onChange: (date: string) => void;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: { top: number; left: number; width: number };
}

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, onClose, size = 'md', position }) => {
  const today = new Date();

  // Safely parse the initial date
  let initialDate = today;
  if (value && value.length > 0) {
    const parsedDate = new Date(value + 'T00:00:00');
    if (!isNaN(parsedDate.getTime())) {
      initialDate = parsedDate;
    }
  }

  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value && value.length > 0 ? initialDate : null);

  // Get days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);

    const days: Array<{ day: number; isCurrentMonth: boolean; date: Date }> = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(prevYear, prevMonth, day)
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(currentYear, currentMonth, day)
      });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(nextYear, nextMonth, day)
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    // Format as YYYY-MM-DD (ISO format)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    onChange(`${year}-${month}-${day}`);
    onClose();
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const calendarDays = generateCalendarDays();

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const dayCellSize = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
    xl: 'w-12 h-12 text-lg',
  };

  // Use fixed positioning if position prop is provided (Portal mode)
  const positioningStyles = position
    ? {
        position: 'fixed' as const,
        top: `${position.top}px`,
        left: `${position.left}px`,
        minWidth: `${Math.max(position.width, 280)}px`,
      }
    : {};

  return (
    <div
      data-datepicker
      style={positioningStyles}
      className={cn(
        position ? 'z-[9999]' : 'absolute z-50 mt-2 left-0',
        'bg-white dark:bg-slate-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-4',
        !position && 'min-w-[280px] w-max',
        sizeClasses[size]
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header - Month/Year navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          {renderIcon(Icons.ArrowLeft, 16)}
        </button>

        <span className="font-semibold text-gray-900 dark:text-white">
          {MONTHS[currentMonth]} {currentYear}
        </span>

        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          {renderIcon(Icons.ArrowRight, 16)}
        </button>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day, index) => (
          <div
            key={index}
            className={cn(
              'text-center font-medium text-gray-500 dark:text-gray-400',
              dayCellSize[size]
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayData, index) => {
          const isTodayDate = isToday(dayData.date);
          const isSelectedDate = isSelected(dayData.date);

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleDayClick(dayData.date)}
              className={cn(
                'flex items-center justify-center rounded-lg transition-all duration-200',
                dayCellSize[size],
                dayData.isCurrentMonth
                  ? 'text-gray-900 dark:text-white hover:bg-ai-primary-100 dark:hover:bg-ai-primary-900'
                  : 'text-gray-400 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700',
                isTodayDate && 'border-2 border-ai-primary-500',
                isSelectedDate && 'bg-ai-primary-600 text-white hover:bg-ai-primary-700 dark:hover:bg-ai-primary-700',
                'cursor-pointer focus:outline-none focus:ring-2 focus:ring-ai-primary-500 focus:ring-offset-1'
              )}
            >
              {dayData.day}
            </button>
          );
        })}
      </div>

      {/* Today button */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => {
            const now = new Date();
            handleDayClick(now);
          }}
          className="w-full px-3 py-2 text-sm font-medium text-ai-primary-600 dark:text-ai-primary-400 hover:bg-ai-primary-50 dark:hover:bg-ai-primary-900/30 rounded-lg transition-colors"
        >
          Hoje
        </button>
      </div>
    </div>
  );
};
