// LoginButton.js
import React from 'react';
import { auth, googleAuthProvider } from './Firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginButton = ({ onLogin, onLogout, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const displayName = user.displayName || "User"; // Default to "User" if displayName is not available
      onLogin(displayName); // Pass the user's name to onLogin callback
      navigate("/"); // Redirect to home page
    } catch (error) {
      toast.error("Login failed");
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // toast.success("Successfully logged out");
      onLogout(); // Call the onLogout callback
      navigate("/"); // Redirect to home page
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  return (
    <button
      className="auth-button"
      onClick={isAuthenticated ? handleLogout : handleLogin}
    >
      {isAuthenticated ? "Logout" : "Login with Google"}
    </button>
  );
};

export default LoginButton;
