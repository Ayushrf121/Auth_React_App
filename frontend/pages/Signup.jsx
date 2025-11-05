import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../util';

export default function Signup() {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError("Name, email, or password not written!");
    }

    try {
      const url = "https://auth-react-app-x6np.onrender.com/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(signupInfo)
      });

      const result = await response.json();
      const { message, success, error } = result;

      if (success) {
        handleSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else if (error) {
        handleError(error);
      } else {
        handleError(message);
      }

    } catch (error) {
      handleError("Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center px-4 py-6">
      <ToastContainer />
      
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md transition-all duration-300 hover:shadow-2xl"
      >
        <h1 className="text-4xl sm:text-5xl text-gray-800 font-bold text-center mb-6">
          Sign Up
        </h1>

        <div className="flex flex-col gap-1 mb-4">
          <label className="text-sm text-gray-600">Username</label>
          <input
            onChange={handleChange}
            value={signupInfo.name}
            type="text"
            name="name"
            placeholder="Devil"
            className="border border-gray-300 rounded-md p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            onChange={handleChange}
            value={signupInfo.email}
            type="email"
            name="email"
            placeholder="abe@gmail.com"
            className="border border-gray-300 rounded-md p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <label className="text-sm text-gray-600">Password</label>
          <input
            onChange={handleChange}
            value={signupInfo.password}
            type="password"
            name="password"
            placeholder="••••••"
            className="border border-gray-300 rounded-md p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all duration-200"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-gray-700">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-700 underline hover:text-blue-900">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
