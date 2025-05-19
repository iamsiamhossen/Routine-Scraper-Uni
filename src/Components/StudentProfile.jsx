// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, doc, getDoc } from '../firebase';

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          setError("User data not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white">
          <h1 className="text-2xl font-bold">Student Profile</h1>
        </div>
        
        <div className="p-6">
          {userData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <ProfileField label="Full Name" value={userData.name} />
                <ProfileField label="Student ID" value={userData.studentId} />
                <ProfileField label="Department" value={userData.department} />
                <ProfileField label="Batch" value={userData.batch} />
              </div>
              <div className="space-y-4">
                <ProfileField label="Email" value={userData.email} />
                <ProfileField label="Mobile" value={userData.mobile} />
                <ProfileField label="Gender" value={userData.gender} />
                <ProfileField 
                  label="Email Verified" 
                  value={userData.emailVerified ? "Yes" : "No"} 
                  highlight={!userData.emailVerified}
                />
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => navigate('/edit-profile')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProfileField = ({ label, value, highlight = false }) => (
  <div>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
    <p className={`mt-1 text-lg ${highlight ? 'text-red-500 font-semibold' : 'text-gray-900 dark:text-white'}`}>
      {value || 'Not provided'}
    </p>
  </div>
);