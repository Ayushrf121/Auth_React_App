import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess } from '../util';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem('loggedName'));
  }, []);

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedName');
    handleSuccess("Logout Successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  const fetchProduct = async () => {
    try {
      const url = "https://auth-react-app-x6np.onrender.com/products";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      });

      if (!response.ok) {
        return handleError("Failed to fetch products. Invalid or expired token.");
      }

      const result = await response.json();
      setProducts(result);
      console.log(result);
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 flex flex-col items-center justify-center px-4 py-6">
      <ToastContainer />

      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-2xl transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-6">
          Welcome, {userName} 👋
        </h1>

        {products.length > 0 ? (
          <div className="space-y-4">
            {products.map((data, i) => (
              <div
                key={i}
                className="border border-gray-300 rounded-lg p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">{data.name}</p>
                  <p className="text-sm text-gray-600">Price: ₹{data.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No products found.</p>
        )}

        <button
          type="button"
          onClick={handleLogOut}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
