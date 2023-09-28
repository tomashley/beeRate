import React, { useState } from 'react';
import { supabase } from '../supabase';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError(null); // Clear any previous errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setError(null); // Clear any previous errors

    try {
      if (isLogin) {
        // Handle login
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          throw error;
        }
      } else {
        // Handle signup
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          throw error;
        }
        setMessage('Validation email sent. Please check your inbox.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-yellow-200 border-2 border-yellow-300 rounded-lg p-4 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h2 className="text-2xl font-bold text-yellow-800 mb-4">
        {isLogin ? 'Login' : 'Sign Up'}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        {error && <p className="text-red-600 mb-2">{error}</p>}
        {message && <p className="text-green-600 mb-2">{message}</p>}
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p className="text-yellow-600 mt-2 cursor-pointer" onClick={handleToggle}>
        {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
      </p>
      <button
        onClick={async () => {
          try {
            await supabase.auth.signInWithOAuth({ provider: 'github' });
          } catch (error) {
            setError(error.message);
          }
        }}
        className="bg-gray-800 text-white px-4 py-2 mt-4 rounded hover:bg-gray-900"
      >
        Sign In with GitHub
      </button>
    </div>
  );
}

export default AuthForm;