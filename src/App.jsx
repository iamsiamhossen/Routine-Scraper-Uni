import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './pages/Home';
import RoutineSearchPage from './Components/RoutineSearch';
import NotFound from './pages/NotFound';
import ErrorBoundary from './Components/ErrorBoundary';
import RoutineDisplay from './Components/RoutineDisplay';
import Notices from './Components/Notices';
import Login from './Components/Login'
import Signup from './Components/SignUp'
import Profile from './Components/StudentProfile'
import ProtectedRoute from './context/ProtectedRoute'
import FreeRoom from './Components/FreeRoomChecker'
import Routine from './Components/ExamRoutine'
import { AuthProvider } from './context/AuthContext';


const App = () => {
  const [routineData, setRoutineData] = useState(null);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
            <ErrorBoundary>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notices" element={<Notices/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/freeroom" element={<FreeRoom/>}/>
                <Route path="/routine" element={<Routine/>}/>
                <Route path="/profile" element={<ProtectedRoute>
                <Profile />
              </ProtectedRoute>}/>

                <Route 
                  path="/search" 
                  element={
                    <RoutineSearchPage 
                      onSearchComplete={(data) => setRoutineData(data)} 
                    />
                  } 
                />
                <Route 
                  path="/routine-display" 
                  element={<RoutineDisplay routineData={routineData} />} 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;