import React, { useState } from 'react';
import supabase from '../supabase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await supabase.auth.signIn({ provider: 'github' });
    } catch (error) {
      console.error('Error logging in with GitHub:', error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGitHubLogin}>Login with GitHub</button>
    </div>
  );
}

export default Login;
