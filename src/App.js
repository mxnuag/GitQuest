// App.js
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import isEmptyObj from "./helpers/emptyObj";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Profile from "./components/Profile";
import Preloader from "./components/Preloader";
import WhatsAppChatButton from "./components/WhatsAppChatButton";
import LoginButton from "./components/LoginButton";
import axios from "axios";
import './style.scss';

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [searchQuery, setSearchQuery] = useState("");
  const [makeSearch, setMakeSearch] = useState(false);
  const [data, setData] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [greetingShown, setGreetingShown] = useState(false);

  const fetchData = useCallback(async (query) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${query}`);
      setData(response.data);
      toast.success("User found", { id: "success" });
    } catch (e) {
      toast.error("User does not exist!", { id: "error" });
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const search = async () => {
      if (makeSearch) {
        const toastId = toast.loading("Searching user...", { id: "loading" });
        await fetchData(searchQuery);
        toast.dismiss(toastId);
        setMakeSearch(false);
      }
    };
    search();
  }, [searchQuery, makeSearch, fetchData]);

  useEffect(() => {
    const initialLoad = async () => {
      await new Promise(resolve => setTimeout(resolve, 4000));
      setInitialLoading(false);
      setTimeout(() => setContentVisible(true), 100);
    };

    initialLoad();
  }, []);

  const handleLogin = (name) => {
    setIsAuthenticated(true);
    setUserName(name);
    if (!greetingShown) {
      toast.success(`Welcome back, ${name}!`, { id: "welcome" });
      setGreetingShown(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    toast.success("Logged out successfully!", { id: "logout" });
  };

  return (
    <Router>
      {initialLoading && <Preloader />}
      <div className={`container${contentVisible ? ' fade-in' : ''}`} data-theme={theme}>
        <div
          className="mouse-follow"
          style={{
            transform: `translate(${mousePos.x / 50}px, ${mousePos.y / 50}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <Header theme={theme} setTheme={setTheme} />
        <LoginButton onLogin={handleLogin} onLogout={handleLogout} isAuthenticated={isAuthenticated} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  setMakeSearch={setMakeSearch}
                  data={data}
                  isAuthenticated={isAuthenticated} // Pass authentication status
                />
                {!isEmptyObj(data) && <Navigate to="/profile" replace />}
              </>
            }
          />
          <Route
            path="/profile"
            element={<Profile data={data} />}
          />
        </Routes>
      </div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 9000,
          style: {
            background: theme === "light" ? "#363636" : "#fff",
            color: theme === "light" ? "#fff" : "#363636",
          },
        }}
      />
      {contentVisible && <WhatsAppChatButton />}
    </Router>
  );
}

export default App;
