import React from 'react';

const StudentRegistrationForm: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">New Student Registration</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Full Name" className="w-full px-3 py-2 border rounded-md" />
          <input type="email" placeholder="Email Address" className="w-full px-3 py-2 border rounded-md" />
          <input type="tel" placeholder="Phone Number" className="w-full px-3 py-2 border rounded-md" />
          <input type="date" placeholder="Date of Birth" className="w-full px-3 py-2 border rounded-md" />
        </div>
        <textarea placeholder="Address" className="w-full px-3 py-2 border rounded-md" rows={3}></textarea>
        <div className="text-right">
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200">Register</button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;
