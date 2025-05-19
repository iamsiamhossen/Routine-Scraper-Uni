// components/NotificationDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  // Sample department notices - replace with actual data from your backend
  const departmentNotices = [
    {
      id: 1,
      title: "CSE Department: Exam Schedule Update",
      message: "Spring 2023 final exams have been rescheduled",
      date: "2023-04-15",
      isRead: false,
      link: "/notices/1"
    },
    {
      id: 2,
      title: "University Holiday Notice",
      message: "University will remain closed on May 1st for Labor Day",
      date: "2023-04-10",
      isRead: false,
      link: "/notices/2"
    },
    {
      id: 3,
      title: "Registration Deadline Extended",
      message: "Course registration deadline extended to April 20th",
      date: "2023-04-05",
      isRead: true,
      link: "/notices/3"
    }
  ];

  useEffect(() => {
    // Load notifications from backend (sample implementation)
    setNotifications(departmentNotices);
    setUnreadCount(departmentNotices.filter(n => !n.isRead).length);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    );
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter(n => !n.isRead).length);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => 
      ({ ...notification, isRead: true })
    );
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition relative"
        aria-label="Notifications"
      >
        <BellIcon className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        )}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Notifications
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Mark all as read
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                  No new notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <Link
                    key={notification.id}
                    to={notification.link}
                    onClick={() => markAsRead(notification.id)}
                    className={`block px-4 py-3 text-sm ${!notification.isRead ? 'bg-blue-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'} transition`}
                  >
                    <div className="flex justify-between">
                      <span className={`font-medium ${!notification.isRead ? 'text-blue-800 dark:text-blue-200' : 'text-gray-700 dark:text-gray-200'}`}>
                        {notification.title}
                      </span>
                      {!notification.isRead && (
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-1 truncate">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {notification.date}
                    </p>
                  </Link>
                ))
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-center">
              <Link
                to="/notices"
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all notifications
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}