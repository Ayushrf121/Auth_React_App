import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../util';

export default function Login() {
  const navigate = useNavigate();
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...LoginInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;

    if (!email || !password) {
      return handleError("Either email or password not written!");
    }

    try {
      const url = "https://auth-react-app-x6np.onrender.com/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(LoginInfo)
      });

      const result = await response.json();
      const { message, email: userEmail, jwtToken, name, success } = result;

      if (success) {
        handleSuccess(`${message}\nEmail: ${userEmail}\nName: ${name}`);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedName', name);
        setTimeout(() => navigate("/"), 3000);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl flex flex-col items-center gap-6 p-6 sm:p-8 w-full max-w-md transition-all duration-300 hover:shadow-2xl"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 underline mb-2">Login</h1>

          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-600 mb-1">Email</label>
            <input
              onChange={handleInput}
              value={LoginInfo.email}
              type="email"
              name="email"
              placeholder="abe@gmail.com"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-600 mb-1">Password</label>
            <input
              onChange={handleInput}
              value={LoginInfo.password}
              type="password"
              name="password"
              placeholder="••••••"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200"
          >
            Login
          </button>

          <p className="text-gray-700 text-sm text-center">
            Don't have an account?{' '}
            <Link to="/Signup" className="text-blue-600 hover:underline font-medium">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
