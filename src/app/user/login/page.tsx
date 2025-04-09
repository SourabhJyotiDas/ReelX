// pages/login.js
import { useState } from 'react';
import Navbar from '@/app/components/Header';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Login:', form);
    // Add API logic here
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[90vh]">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-3 border rounded" required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </>
  );
}
