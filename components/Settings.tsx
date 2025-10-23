import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
        <p className="mt-2 text-gray-600">Manage your account settings and preferences.</p>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800">Profile Settings</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Full Name" className="w-full px-3 py-2 border rounded-md" defaultValue="Alex Johnson" />
            <input type="email" placeholder="Email Address" className="w-full px-3 py-2 border rounded-md" defaultValue="alex.j@example.com" />
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800">Change Password</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="password" placeholder="Current Password" className="w-full px-3 py-2 border rounded-md" />
            <input type="password" placeholder="New Password" className="w-full px-3 py-2 border rounded-md" />
        </div>
      </div>

       <div className="flex justify-end pt-6 border-t">
        <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200">Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;
