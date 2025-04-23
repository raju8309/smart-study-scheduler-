
import React, { useState } from "react";
import { addDays, format, getDay, startOfWeek, subDays, addMonths, subMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

type Event = {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  subject: string;
  color: string;
};

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Math Study",
      date: new Date(),
      startTime: "10:00",
      endTime: "11:30",
      subject: "Mathematics",
      color: "bg-study-blue",
    },
    {
      id: "2",
      title: "Physics Revision",
      date: addDays(new Date(), 1),
      startTime: "14:00",
      endTime: "16:00",
      subject: "Physics",
      color: "bg-study-purple",
    },
    {
      id: "3",
      title: "Literature Essay",
      date: new Date(),
      startTime: "16:30",
      endTime: "18:00",
      subject: "Literature",
      color: "bg-pink-400",
    },
  ]);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysArray = [];
    const startDate = startOfWeek(firstDay);
    
    // Include days from previous month to fill the first week
    for (let i = 0; i < getDay(firstDay); i++) {
      daysArray.push({
        date: subDays(firstDay, getDay(firstDay) - i),
        isCurrentMonth: false,
      });
    }
    
    // Add all days in the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    // Add days from next month to complete the last week
    const remainingDays = 7 - (daysArray.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        daysArray.push({
          date: addDays(lastDay, i),
          isCurrentMonth: false,
        });
      }
    }
    
    return daysArray;
  };
  
  const getDayEvents = (day: Date) => {
    return events.filter((event) => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  };
  
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const days = getDaysInMonth();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="h-6 w-6 text-study-purple" /> 
          Study Calendar
        </h2>
        <div className="flex items-center gap-2">
          <Button
            onClick={prevMonth}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-medium w-40 text-center">
            {format(currentDate, "MMMM yyyy")}
          </h3>
          <Button
            onClick={nextMonth}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button className="bg-study-purple hover:bg-study-purple/90">
          Add Study Session
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-7 border-b">
          {weekDays.map((day) => (
            <div 
              key={day} 
              className="p-4 text-center font-medium text-gray-500 border-r last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 divide-x divide-y">
          {days.map((day, index) => (
            <div 
              key={index}
              className={`min-h-[120px] p-2 ${!day.isCurrentMonth ? "bg-gray-50" : ""}`}
            >
              <div className="text-right mb-1">
                <span className={`inline-block w-7 h-7 rounded-full text-center leading-7
                  ${format(day.date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") 
                    ? "bg-study-purple text-white" 
                    : !day.isCurrentMonth ? "text-gray-400" : ""
                  }`}
                >
                  {format(day.date, "d")}
                </span>
              </div>
              
              <div className="space-y-1">
                {getDayEvents(day.date).map((event) => (
                  <div 
                    key={event.id}
                    className={`p-1 rounded text-xs cursor-pointer truncate ${event.color} text-white`}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div>{event.startTime} - {event.endTime}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
