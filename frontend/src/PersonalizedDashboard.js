import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PersonalizedDashboard() {
  const [userName, setUserName] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [news, setNews] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    // Fetch current user info based on token
    fetch("http://localhost:8000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user info");
        return res.json();
      })
      .then((data) => {
        setUserName(data.username);
      })
      .catch(() => setUserName(""));

    // Fetch portfolio data - replace with your API
    setPortfolio([
      { symbol: "AAPL", shares: 50, currentValue: 7000 },
      { symbol: "TSLA", shares: 12, currentValue: 10000 },
    ]);

    // Fetch watchlist - replace with your API
    setWatchlist([
      { symbol: "GOOG", price: 2800 },
      { symbol: "MSFT", price: 315 },
      { symbol: "AMZN", price: 3400 },
    ]);

    // Fetch news - replace with your API
    setNews([
      { id: 1, title: "Market rallies up 2% on tech gains" },
      { id: 2, title: "Inflation numbers beat expectations" },
      { id: 3, title: "New trading regulations coming in 2026" },
    ]);
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-blue-800">
          Welcome, {userName || "Trader"}
        </h1>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={logout}
        >
          Logout
        </button>
      </header>

      {/* Navigation */}
      <div className="flex gap-4 mb-6">
        <Link
          to="/orders"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Orders Mgmt
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Portfolio Summary */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
          <ul>
            {portfolio.map(({ symbol, shares, currentValue }) => (
              <li
                key={symbol}
                className="flex justify-between py-2 border-b border-gray-200"
              >
                <span>
                  {symbol} ({shares} shares)
                </span>
                <span>${currentValue.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Watchlist */}    
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
          <ul>
            {watchlist.map(({ symbol, price }) => (
              <li
                key={symbol}
                className="flex justify-between py-2 border-b border-gray-200"
              >
                <span>{symbol}</span>
                <span>${price.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Latest News */} 
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Latest News</h2>
          <ul className="space-y-3">
            {news.map(({ id, title }) => (
              <li key={id} className="text-gray-700">
                • {title}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default PersonalizedDashboard;
