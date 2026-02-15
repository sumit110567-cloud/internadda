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
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-lg">
      <h4 className="text-xl font-bold mb-2">Never miss an update</h4>
      <p className="mb-4 text-blue-100">Get the latest internships and courses directly in your inbox.</p>
      {submitted ? (
        <p className="text-green-200">Thanks for subscribing! Check your email.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 rounded-lg text-gray-900"
          />
          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
