import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, password: string, role: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(email, password, role);
    if (!success) {
      setError('Invalid credentials for the selected role. Please try again.');
    } else {
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">TAQTAQ technical institute</h1>
          <p className="text-gray-600 mb-8">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="••••••••"
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sign in as</label>
            <div className="grid grid-cols-3 gap-3">
                {/* Student Card */}
                <button
                    type="button"
                    onClick={() => setRole('Student')}
                    className={`p-4 border-2 rounded-lg text-center transition-all duration-200 flex flex-col items-center justify-center h-full ${
                    role === 'Student'
                        ? 'bg-blue-50 border-blue-500 shadow-md'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="block font-semibold mt-2 text-sm text-gray-800">Student</span>
                </button>

                {/* Admin Card */}
                <button
                    type="button"
                    onClick={() => setRole('Admin')}
                    className={`p-4 border-2 rounded-lg text-center transition-all duration-200 flex flex-col items-center justify-center h-full ${
                    role === 'Admin'
                        ? 'bg-blue-50 border-blue-500 shadow-md'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="block font-semibold mt-2 text-sm text-gray-800">Admin</span>
                </button>

                {/* Academic Staff Card */}
                <button
                    type="button"
                    onClick={() => setRole('Academic Staff')}
                    className={`p-4 border-2 rounded-lg text-center transition-all duration-200 flex flex-col items-center justify-center h-full ${
                    role === 'Academic Staff'
                        ? 'bg-blue-50 border-blue-500 shadow-md'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="block font-semibold mt-2 text-xs text-center text-gray-800 leading-tight">Academic<br/>Staff</span>
                </button>
            </div>
          </div>
          
          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
          
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;