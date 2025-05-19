import React, { useState, useCallback } from 'react';
import { 
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ClockIcon,
  AcademicCapIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const RoutineSearch = () => {
  const batches = Array.from({length: 8}, (_, i) => `CSE-${12 + i}`);
  
  const timeSlots = [
    { id: 'slot1', label: '8:30 AM - 9:55 AM', start: '8:30 AM', end: '9:55 AM' },
    { id: 'slot2', label: '10:00 AM - 11:25 AM', start: '10:00 AM', end: '11:25 AM' },
    { id: 'slot3', label: '11:30 AM - 12:55 PM', start: '11:30 AM', end: '12:55 PM' },
    { id: 'slot4', label: '2:00 PM - 3:25 PM', start: '2:00 PM', end: '3:25 PM' },
    { id: 'slot5', label: '3:30 PM - 4:55 PM', start: '3:30 PM', end: '4:55 PM' }
  ];

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

  const [filters, setFilters] = useState({
    batch: 'CSE-12',
    timeSlot: 'slot1',
    day: 'Sunday'
  });

  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const timeToMinutes = useCallback((timeStr) => {
    if (!timeStr) return 0;
    
    const timeRegex = /^(\d{1,2}):(\d{2})\s?(AM|PM)?$/i;
    const match = timeStr.trim().match(timeRegex);
    
    if (!match) return 0;

    let [, hours, minutes, period = 'AM'] = match;
    hours = parseInt(hours);
    minutes = parseInt(minutes);
    period = period.toUpperCase();

    let totalMinutes = hours * 60 + minutes;

    if (period === 'PM' && hours !== 12) totalMinutes += 12 * 60;
    if (period === 'AM' && hours === 12) totalMinutes -= 12 * 60;

    return totalMinutes;
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setSearchResults(null);
    
    try {
      // Input validation
      if (!filters.batch || !filters.day) {
        throw new Error("Please select both batch and day");
      }

      const selectedTimeSlot = timeSlots.find(slot => slot.id === filters.timeSlot);
      if (!selectedTimeSlot) {
        throw new Error("Invalid time slot selected");
      }

      // Firestore query
      const docRef = doc(db, "routine", filters.batch);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error(`No routine found for batch ${filters.batch}`);
      }

      const routineData = docSnap.data();
      
      // Data structure validation
      if (!routineData?.schedule || typeof routineData.schedule !== 'object') {
        throw new Error("Invalid schedule data structure");
      }

      const daySchedule = routineData.schedule[filters.day] || [];
      if (!Array.isArray(daySchedule)) {
        throw new Error(`No valid schedule found for ${filters.day}`);
      }

      // Time calculations
      const slotStart = timeToMinutes(selectedTimeSlot.start);
      const slotEnd = timeToMinutes(selectedTimeSlot.end);

      // Filter classes with time overlap
      const filteredClasses = daySchedule.filter(cls => {
        if (!cls?.start || !cls?.end) return false;
        
        const classStart = timeToMinutes(cls.start);
        const classEnd = timeToMinutes(cls.end);

        return (
          (classStart < slotEnd && classEnd > slotStart) ||
          (classStart === slotStart && classEnd === slotEnd)
        );
      });

      // Set results to state
      setSearchResults({
        classes: filteredClasses,
        batch: filters.batch,
        day: filters.day,
        timeSlot: selectedTimeSlot.label,
        rawData: routineData
      });

    } catch (err) {
      console.error("Search failed:", err);
      setError(err.message || "An error occurred during search");
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setSearchResults(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto"
    >
      <div className="flex items-center mb-6">
        <AcademicCapIcon className="h-8 w-8 text-indigo-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Class Routine Search
        </h2>
      </div>

      <div className="space-y-4">
        {/* Search Form */}
        {!searchResults ? (
          <>
            {/* Batch Selection Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Batch
              </label>
              <div className="relative">
                <button 
                  onClick={() => setIsBatchOpen(!isBatchOpen)}
                  className="w-full flex justify-between items-center p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  aria-haspopup="listbox"
                  aria-expanded={isBatchOpen}
                >
                  <span>{filters.batch}</span>
                  <ChevronDownIcon className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform ${isBatchOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isBatchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto"
                    role="listbox"
                  >
                    {batches.map(batch => (
                      <button
                        key={batch}
                        onClick={() => {
                          setFilters(prev => ({...prev, batch}));
                          setIsBatchOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-600/30 ${
                          filters.batch === batch ? 'bg-indigo-100 dark:bg-indigo-600/50' : ''
                        }`}
                        role="option"
                        aria-selected={filters.batch === batch}
                      >
                        {batch}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Day Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Day
              </label>
              <select
                value={filters.day}
                onChange={(e) => setFilters(prev => ({...prev, day: e.target.value}))}
                className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200"
              >
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time Slot
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map(slot => (
                  <motion.button
                    key={slot.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilters(prev => ({...prev, timeSlot: slot.id}))}
                    className={`p-3 rounded-lg border transition-colors ${
                      filters.timeSlot === slot.id 
                        ? 'bg-indigo-100 dark:bg-indigo-600/50 border-indigo-300 dark:border-indigo-500 text-indigo-700 dark:text-white' 
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                    aria-pressed={filters.timeSlot === slot.id}
                  >
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      {slot.label}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearch}
              disabled={isLoading}
              className="mt-4 w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                <>
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  <span>Search Routine</span>
                </>
              )}
            </motion.button>
          </>
        ) : (
          /* Modern Digitalized Results Display */
<div className="mt-6">
  <div className="flex justify-between items-center mb-6">
    <div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
        {searchResults.batch} Schedule
      </h3>
      <p className="text-indigo-600 dark:text-indigo-400 font-medium">
        {searchResults.day} • {searchResults.timeSlot}
      </p>
    </div>
    <button
      onClick={clearResults}
      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
      aria-label="Clear results"
    >
      <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    </button>
  </div>

  {searchResults.classes.length > 0 ? (
    <div className="space-y-4">
      {searchResults.classes.map((cls, i) => (
        <motion.div
          key={`${cls.code}-${i}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group relative p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4 mt-1">
              <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                <ClockIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {cls.course}
                  </h4>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                    {cls.code}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">
                  {cls.type}
                </span>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Time</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {cls.start} - {cls.end}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Location</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {cls.room}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Instructor</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {cls.teacher}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-10"
    >
      <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500">
        <AcademicCapIcon className="w-full h-full" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
        No classes scheduled
      </h3>
      <p className="mt-1 text-gray-500 dark:text-gray-400">
        No classes found for {searchResults.day} at {searchResults.timeSlot}
      </p>
    </motion.div>
  )}

  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={clearResults}
    className="mt-8 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition-all"
  >
    Start New Search
  </motion.button>
</div>
        )}
        
        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800"
          >
            <p className="font-medium">Error:</p>
            <p>{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-700 dark:text-red-200 hover:underline"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RoutineSearch;