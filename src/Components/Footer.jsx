import React from 'react';
import { 
  AcademicCapIcon,
  HeartIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  UserGroupIcon,
  ClockIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 border-t border-gray-700/50 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Grid - Responsive Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <AcademicCapIcon className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold text-white bg-clip-text text-transparent">
                Routine Scraper
              </span>
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              Smart university class management system for students and faculty.
            </p>
            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <HeartIcon className="h-4 w-4 text-rose-500" />
              <span>Made with passion by CSE students</span>
            </div>
          </div>

          {/* Quick Links - Mobile first single column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Routine Search', 'Free Rooms', 'Faculty', 'About'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="hover:text-indigo-400 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                  >
                    <ChevronRightIcon className="h-3 w-3 text-gray-500" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Adapts to mobile */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Computer Science Department<br />Khwaja Yunus Ali University</span>
              </li>
              <li className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-sm sm:text-base">routine@university.edu</span>
              </li>
            </ul>
          </div>

          {/* Stats - Full width on mobile, then normal */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold text-white">Our Impact</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <UserGroupIcon className="h-5 w-5 text-indigo-400" />
                  <span className="text-xl sm:text-2xl font-bold">1.2K+</span>
                </div>
                <p className="text-xs mt-1 text-gray-400">Active Users</p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-indigo-400" />
                  <span className="text-xl sm:text-2xl font-bold">500+</span>
                </div>
                <p className="text-xs mt-1 text-gray-400">Hours Saved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Stacked on mobile */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-sm">Follow us:</span>
            <div className="flex space-x-3">
              {['Twitter', 'Facebook', 'GitHub'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="h-8 w-8 rounded-full bg-gray-800 hover:bg-indigo-600/30 flex items-center justify-center transition-colors"
                  aria-label={social}
                >
                  <span className="sr-only">{social}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="text-center md:text-right text-xs sm:text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} RoutineScraper | 
              <span className="text-indigo-400"> Team Brainstorming</span> | 
              All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

