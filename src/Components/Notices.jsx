// pages/NoticesPage.jsx
import React, { useState, useEffect } from 'react';
import { BellIcon, CheckIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function NoticesPage() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    // Fetch notifications from your backend
    const fetchNotifications = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/notifications');
        // const data = await response.json();
        
        // Sample data with more detailed notices
        const data = [
          {
            id: 1,
            title: "CSE Department: Exam Schedule Update",
            message: "The Spring 2023 final exams have been rescheduled due to unexpected circumstances. All Computer Science department exams originally scheduled for May 15-20 will now take place May 22-27. Please check the updated timetable on the department notice board or the university portal.",
            fullContent: `
              <h2 class="text-xl font-bold mb-4">Exam Reschedule Notice</h2>
              <p class="mb-4">Dear Students,</p>
              <p class="mb-4">Due to the upcoming national conference being hosted by our university, the Spring 2023 final examination schedule for the Computer Science Department has been modified.</p>
              
              <h3 class="font-semibold mb-2">Key Changes:</h3>
              <ul class="list-disc pl-5 mb-4">
                <li>All exams originally scheduled for May 15-20 will now take place May 22-27</li>
                <li>Exam durations remain unchanged</li>
                <li>Exam venues remain unchanged</li>
              </ul>
              
              <p class="mb-4">The updated timetable is available:</p>
              <ul class="list-disc pl-5 mb-4">
                <li>Department notice board (Ground Floor, CS Building)</li>
                <li>University portal (exam.routine.edu)</li>
                <li>Department website (cse.university.edu/exams)</li>
              </ul>
              
              <p class="mb-4">For any queries, please contact the examination cell:</p>
              <p class="mb-2">Email: exams@cse.university.edu</p>
              <p>Phone: +880 1234 567890 (9AM-5PM)</p>
            `,
            date: "2023-04-15",
            isRead: false,
            department: "CSE",
            priority: "High"
          },
          {
            id: 2,
            title: "University Holiday Notice",
            message: "The university will remain closed on May 1st in observance of Labor Day. All classes and administrative offices will be closed.",
            fullContent: `
              <h2 class="text-xl font-bold mb-4">Labor Day Holiday Notice</h2>
              <p class="mb-4">Dear Students and Faculty,</p>
              <p class="mb-4">The university will remain closed on Monday, May 1st, 2023 in observance of Labor Day.</p>
              
              <h3 class="font-semibold mb-2">Important Information:</h3>
              <ul class="list-disc pl-5 mb-4">
                <li>All classes suspended</li>
                <li>Administrative offices closed</li>
                <li>Library services unavailable</li>
                <li>Cafeteria closed</li>
              </ul>
              
              <p class="mb-4">Regular operations will resume on Tuesday, May 2nd at 8:00 AM.</p>
              
              <p>Wishing everyone a safe and happy holiday!</p>
            `,
            date: "2023-04-10",
            isRead: false,
            department: "All",
            priority: "Medium"
          },
          {
            id: 3,
            title: "Registration Deadline Extended",
            message: "The deadline for course registration has been extended to April 20th. Late registration penalties will be waived during this period.",
            fullContent: `
              <h2 class="text-xl font-bold mb-4">Course Registration Extension</h2>
              <p class="mb-4">Attention All Students,</p>
              <p class="mb-4">The deadline for course registration has been extended to Thursday, April 20th, 2023 at 11:59 PM.</p>
              
              <h3 class="font-semibold mb-2">Important Notes:</h3>
              <ul class="list-disc pl-5 mb-4">
                <li>Late registration penalties waived during extension period</li>
                <li>All students must complete registration by new deadline</li>
                <li>Advisor approval still required for overload requests</li>
              </ul>
              
              <p class="mb-4">Please complete your registration through the student portal:</p>
              <p class="mb-4"><a href="https://portal.university.edu/registration" class="text-blue-600 hover:underline">portal.university.edu/registration</a></p>
              
              <p>For assistance, contact the registrar's office.</p>
            `,
            date: "2023-04-05",
            isRead: true,
            department: "All",
            priority: "Medium"
          }
        ];
        
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
    markAsRead(notice.id);
  };

  const handleBackToList = () => {
    setSelectedNotice(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (selectedNotice) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={handleBackToList}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Notices
        </button>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden p-6 text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {selectedNotice.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                <span>{selectedNotice.date}</span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                  {selectedNotice.department}
                </span>
                <span className={`px-2 py-1 rounded ${
                  selectedNotice.priority === "High" 
                    ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200" 
                    : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                }`}>
                  {selectedNotice.priority} Priority
                </span>
              </div>
            </div>
          </div>
          
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedNotice.fullContent }}
          />
          
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              onClick={handleBackToList}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Back to All Notices
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
          <BellIcon className="h-8 w-8 mr-3 text-blue-500" />
          Department Notices
        </h1>
        <button
          onClick={markAllAsRead}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <CheckIcon className="h-5 w-5 mr-2" />
          Mark all as read
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`px-6 py-4 ${!notification.isRead ? 'bg-blue-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'} transition cursor-pointer`}
              onClick={() => handleNoticeClick(notification)}
            >
              <div className="flex justify-between">
                <div className="w-full">
                  <div className="flex justify-between items-start">
                    <h3 className={`text-lg font-medium ${!notification.isRead ? 'text-blue-800 dark:text-blue-200' : 'text-gray-700 dark:text-gray-200'}`}>
                      {notification.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      notification.priority === "High" 
                        ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200" 
                        : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                    }`}>
                      {notification.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {notification.date} • {notification.department}
                    </p>
                    {!notification.isRead && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}