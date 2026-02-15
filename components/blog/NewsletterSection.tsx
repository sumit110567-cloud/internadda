'use client';

import { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with email service
    setSubmitted(true);
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white rounded-3xl p-8 shadow-xl">
      <h4 className="text-2xl font-bold mb-3">Get weekly insights</h4>
      <p className="text-blue-100 mb-6">Join 50,000+ students who get the latest internships and career tips.</p>
      {submitted ? (
        <p className="text-green-200 font-medium">Thanks! Please check your inbox.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-5 py-3 rounded-xl text-gray-900 placeholder-gray-400 border-2 border-white/30 bg-white/90 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="w-full bg-white text-blue-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition shadow-md"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
