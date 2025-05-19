// src/pages/FreeRoomChecker.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
const timeSlots = [
  { id: 'slot1', label: '8:30 AM - 9:55 AM', start: '08:30 AM', end: '09:55 AM' },
  { id: 'slot2', label: '10:00 AM - 11:25 AM', start: '10:00 AM', end: '11:25 AM' },
  { id: 'slot3', label: '11:30 AM - 12:55 PM', start: '11:30 AM', end: '12:55 PM' },
  { id: 'slot4', label: '2:00 PM - 3:25 PM', start: '02:00 PM', end: '03:25 PM' },
  { id: 'slot5', label: '3:30 PM - 4:55 PM', start: '03:30 PM', end: '04:55 PM' }
];
const allRooms = ['301', '302', '303', '304', '305', '306'];

export default function FreeRoomChecker() {
  const [day, setDay] = useState(days[0]);
  const [timeSlot, setTimeSlot] = useState(timeSlots[0]);
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOccupiedRooms = async () => {
      setLoading(true);
      try {
        const occupied = [];
        const querySnapshot = await getDocs(collection(db, 'routine'));
        
        querySnapshot.forEach((doc) => {
          const batchData = doc.data();
          const daySchedule = batchData.schedule[day];
          
          if (daySchedule) {
            daySchedule.forEach(classItem => {
              // Check if class is happening during selected time slot
              if (classItem.start === timeSlot.start && classItem.end === timeSlot.end) {
                if (classItem.room && allRooms.includes(classItem.room)) {
                  occupied.push(classItem.room);
                }
              }
            });
          }
        });
        
        setOccupiedRooms([...new Set(occupied)]); // Remove duplicates
      } catch (error) {
        console.error("Error fetching occupied rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOccupiedRooms();
  }, [day, timeSlot]);

  const freeRooms = allRooms.filter(room => !occupiedRooms.includes(room));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 overflow-x-auto pt-15">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Free Room Checker
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Day
            </label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Time Slot
            </label>
            <select
              value={timeSlot.id}
              onChange={(e) => {
                const selected = timeSlots.find(slot => slot.id === e.target.value);
                setTimeSlot(selected);
              }}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {timeSlots.map(slot => (
                <option key={slot.id} value={slot.id}>{slot.label}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Free Rooms ({freeRooms.length}/{allRooms.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {freeRooms.map(room => (
                  <div 
                    key={room} 
                    className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg text-center font-medium"
                  >
                    Room {room}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Occupied Rooms ({occupiedRooms.length}/{allRooms.length})
              </h2>
              {occupiedRooms.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {occupiedRooms.map(room => (
                    <div 
                      key={room} 
                      className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg text-center font-medium"
                    >
                      Room {room}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No rooms occupied during this time</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}