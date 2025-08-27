import React, { useEffect, useState } from "react";

function App() {
  const [indices, setIndices] = useState([]);
  const [gainers, setGainers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/market/indices")
      .then((res) => res.json())
      .then((data) => setIndices(data.indices || []))
      .catch(() => setIndices([]));
    fetch("http://localhost:8000/market/top-gainers")
      .then((res) => res.json())
      .then((data) => setGainers(data || []))
      .catch(() => setGainers([]));
  }, []);

  const goToLogin = () => (window.location.href = "/login");
  const goToSignUp = () => (window.location.href = "/signup");
  const goToCreateAccount = () => (window.location.href = "/signup");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white flex justify-between items-center px-6 py-4 shadow-md fixed w-full z-50">
        <span className="text-xl font-extrabold tracking-wide">
          USK BROKERING
        </span>
        <div className="space-x-6 text-sm font-medium">
          <button onClick={goToLogin} className="hover:underline">
            Login
          </button>
          <button onClick={goToSignUp} className="hover:underline">
            Register
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24 px-6 max-w-7xl mx-auto w-full">
        {/* Welcome Banner */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-3">
            Welcome to USK BROKERING
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto mb-8">
            Professional trading platform with real-time market data, advanced
            order management, and comprehensive portfolio tracking.
          </p>
          <div className="inline-flex space-x-6">
            <button
              onClick={goToLogin}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-7 rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
            >
              Login
            </button>
            <button
              onClick={goToSignUp}
              className="border border-blue-600 text-blue-600 py-3 px-7 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Sign Up
            </button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-12">
          <Feature
            icon="📈"
            title="Real-time Trading"
            description="Live market quotes and instant order execution with advanced order types."
          />
          <Feature
            icon="📊"
            title="Portfolio Analytics"
            description="Comprehensive portfolio tracking with P&L analysis and performance metrics."
          />
          <Feature
            icon="🛡️"
            title="Risk Management"
            description="Advanced risk controls and position monitoring for safe trading."
          />
          <Feature
            icon="📱"
            title="Mobile Ready"
            description="Fully responsive design that works perfectly on all devices."
          />
        </section>

        {/* Market Overview Box */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl shadow-xl text-white p-8 mb-12">
          <h2 className="text-xl font-bold flex items-center mb-6">
            <span className="mr-2">📊</span> Market Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Popular Indices */}
            <div>
              <h3 className="font-semibold mb-4">Popular Indices</h3>
              <ul>
                {indices.length ? (
                  indices.map((index) => (
                    <li
                      key={index}
                      className="flex justify-between py-2 border-b border-indigo-400"
                    >
                      <span className="font-bold">{index}</span>
                      <span className="bg-green-500 px-3 py-1 rounded-full text-xs font-semibold">
                        Live
                      </span>
                    </li>
                  ))
                ) : (
                  <li>Loading indices...</li>
                )}
              </ul>
            </div>

            {/* Top Gainers */}
            <div>
              <h3 className="font-semibold mb-4">Top Gainers</h3>
              <ul>
                {gainers.length ? (
                  gainers.map((gainer) => (
                    <li
                      key={gainer.symbol}
                      className="flex justify-between py-2 border-b border-indigo-400"
                    >
                      <span>{gainer.symbol}</span>
                      <span className="text-green-300 font-semibold">
                        {gainer.change}
                      </span>
                    </li>
                  ))
                ) : (
                  <li>Loading gainers...</li>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* Ready to Start Trading Callout */}
        <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white rounded-xl text-center p-12 mb-12 shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">
            Ready to Start Trading?
          </h3>
          <p className="mb-6 max-w-lg mx-auto opacity-80">
            Join thousands of traders who trust USK BROKERING for their trading
            needs.
          </p>
          <div className="inline-flex space-x-6">
            <button
              onClick={goToCreateAccount}
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
            >
              Create Account
            </button>
            <button
              onClick={goToLogin}
              className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition font-semibold"
            >
              Login
            </button>
          </div>
        </section>

        {/* Extended Features */}
        <BenefitsSection />
        <TestimonialsSection />
        <Footer />
      </main>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md text-center space-y-4">
      <div className="text-5xl">{icon}</div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function BenefitsSection() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <div className="grid md:grid-cols-3 gap-12 text-center">
        <Benefit
          icon="⚡"
          title="Ultra-Fast Execution"
          description="Experience lightning-quick order processing and minimal latency."
        />
        <Benefit
          icon="🔒"
          title="Secure Platform"
          description="Your data and transactions are fully encrypted and secure."
        />
        <Benefit
          icon="🤝"
          title="24/7 Support"
          description="Our team is always available to help you with any issue."
        />
      </div>
    </section>
  );
}

function Benefit({ icon, title, description }) {
  return (
    <div className="space-y-3">
      <div className="text-6xl text-blue-600">{icon}</div>
      <h5 className="font-bold text-lg">{title}</h5>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <h3 className="text-center text-2xl font-bold text-blue-700 mb-10">
        What Our Traders Say
      </h3>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 justify-center">
        <TestimonialCard
          name="Priya S."
          text="USK BROKERING's tools and analytics helped me succeed in my trades!"
        />
        <TestimonialCard
          name="Rahul K."
          text="Exceptional support and blazing-fast execution, highly recommended."
        />
        <TestimonialCard
          name="Anjali M."
          text="The most intuitive and reliable platform I've used."
        />
      </div>
    </section>
  );
}

function TestimonialCard({ name, text }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm">
      <p className="text-gray-700 italic mb-4">&quot;{text}&quot;</p>
      <h4 className="font-semibold text-blue-700">{name}</h4>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 text-sm">
        <span>
          © {new Date().getFullYear()} USK BROKERING. All rights reserved.
        </span>
        <nav className="mt-3 md:mt-0 space-x-6">
          <a href="#terms" className="hover:underline">
            Terms
          </a>
          <a href="#privacy" className="hover:underline">
            Privacy
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default App;
