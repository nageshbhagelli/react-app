import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgot, setForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        navigate("/personalized-dashboard");
      } else {
        setError(data.detail || "Incorrect username or password");
      }
    } catch {
      setError("Server connection failed");
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("http://localhost:8000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(data.message);
      } else {
        setMsg(data.detail || "Failed to process request");
      }
    } catch {
      setMsg("Server connection failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        {!forgot ? (
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border w-full p-2 mb-4 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full p-2 mb-4 rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition mb-4"
            >
              Login
            </button>
            <div className="flex justify-between text-sm text-blue-600">
              <button
                type="button"
                onClick={() => {
                  setForgot(true);
                  setError("");
                  setMsg("");
                }}
                className="underline"
              >
                Forgot Password?
              </button>
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="underline"
              >
                Register
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgot}>
            <h2 className="text-xl font-bold mb-4 text-center">
              Forgot Password
            </h2>
            {msg && <p className="text-green-600 mb-4">{msg}</p>}
            <input
              type="email"
              placeholder="Your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border w-full p-2 mb-4 rounded"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700 transition mb-4"
            >
              Send Reset Link
            </button>
            <button
              type="button"
              className="underline text-blue-600 w-full text-center"
              onClick={() => {
                setForgot(false);
                setMsg("");
              }}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
