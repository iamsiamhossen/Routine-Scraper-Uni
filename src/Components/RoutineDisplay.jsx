import React from 'react';
import { motion } from 'framer-motion'; // Import framer-motion for animations

const RoutineDisplay = ({ results }) => {
  console.log("Results received in RoutineDisplay:", results); // Debug log

  if (!results || !results.classes || !Array.isArray(results.classes) || results.classes.length === 0) {
    console.log("No results to display"); // Debug log
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700"
      >
        <p className="text-gray-600 dark:text-gray-400">No classes found for this time slot</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        {results.batch} • {results.day} • {results.timeSlot}
      </h3>

      <div className="space-y-3">
        {results.classes.map((cls, i) => (
          <motion.div 
            key={`${cls.code}-${cls.start}-${i}`} // Ensure uniqueness with start time and index
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <p className="font-medium text-gray-800 dark:text-white">
              {cls.course} ({cls.code})
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {cls.teacher} • Room: {cls.room}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {cls.start} - {cls.end} • {cls.type}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Export the component as default
export default RoutineDisplay;
