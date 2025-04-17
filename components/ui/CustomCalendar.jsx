"use client"
import { useState, useEffect, useRef } from "react"
import { Calendar as CalendarIcon } from "lucide-react"

export default function CustomCalendar({ onChange }) {
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const calendarRef = useRef(null)
  const inputRef = useRef(null)

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0]
  
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
    if (onChange) {
      onChange(e.target.value)
    }
  }

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  // Handle clicks outside the calendar to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && 
          !calendarRef.current.contains(event.target) && 
          !inputRef.current.contains(event.target)) {
        setShowCalendar(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative">
      <div 
        className="cursor-pointer"
        onClick={toggleCalendar}
        ref={inputRef}
      >
        <input
          type="text"
          value={selectedDate ? new Date(selectedDate).toLocaleDateString() : ""}
          className="w-full bg-white text-[#03435e] border-0 border-b-2 border-[#03435e] focus:outline-none focus:ring-0 focus:border-teal-500 placeholder:text-gray-300 italic py-2 text-xs sm:text-sm transition-all cursor-pointer"
          placeholder="Select travel date"
          readOnly
          required
        />
        
        {/* Hidden actual date input */}
        <input 
          type="date" 
          value={selectedDate}
          onChange={handleDateChange}
          min={today}
          className="sr-only"
        />
      </div>
      
      {showCalendar && (
        <div 
          ref={calendarRef}
          className="absolute z-20 mt-1 bg-white shadow-lg rounded-md border border-gray-200 p-2"
        >
          <input 
            type="date" 
            value={selectedDate}
            onChange={handleDateChange}
            min={today}
            className="p-2 border border-gray-200 rounded"
            onBlur={() => setShowCalendar(false)}
            autoFocus
          />
        </div>
      )}
    </div>
  )
}