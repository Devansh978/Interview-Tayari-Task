import React from 'react';
import { GraduationCap } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { NewSubmission } from './components/NewSubmission';
import { ExperienceList } from './components/ExperienceList';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { Contact } from './components/Contact';
import { InterviewRepo } from './components/InterviewRepo';
import { useAuth } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';

function App() {
  const { user, signOut } = useAuth();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-right" />
        //
        {/* Navigation */}
        <nav className="bg-[#0A2F7D] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <GraduationCap className="h-8 w-8" />
                  <span className="font-bold text-xl">INTERVIEW TAYARI</span>
                </Link>
              </div>
              
              {user && (
                <div className="flex items-center space-x-4">
                  <Link to="/" className="hover:text-gray-200">Interview Repo</Link>
                  <Link to="/submit" className="hover:text-gray-200">New Submission</Link>
                  <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
                  <Link to="/contact" className="hover:text-gray-200">Contact</Link>
                  <button
                    onClick={signOut}
                    className="bg-white text-[#0A2F7D] px-4 py-2 rounded-md font-medium hover:bg-gray-100"
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */} 
        <main className="flex-1 bg-gray-50">
          <Routes>
            <Route path="/" element={user ? <InterviewRepo /> : <AuthForm />} />
            <Route path="/submit" element={user ? <NewSubmission /> : <AuthForm />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <AuthForm />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-[#1E1E1E] text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center space-x-6 mb-4">
              <a href="mailto:contact@interviewtayari.com" className="hover:text-gray-300">
                <span className="sr-only">Email</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
              <a href="https://linkedin.com/company/interview-tayari" className="hover:text-gray-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
            <p>&copy; {new Date().getFullYear()} Interview Tayari. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
