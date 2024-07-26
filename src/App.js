import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import isEmptyObj from "./helpers/emptyObj";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Profile from "./components/Profile";
import Preloader from "./components/Preloader"; // Import Preloader
import axios from "axios";
import './style.scss';

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [searchQuery, setSearchQuery] = useState("");
  const [makeSearch, setMakeSearch] = useState(false);
  const [data, setData] = useState({});
  const [initialLoading, setInitialLoading] = useState(true); // Manage initial loading state

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
    // Simulate initial loading time
    const initialLoad = async () => {
      await new Promise(resolve => setTimeout(resolve, 4000)); // Adjust timeout as needed
      setInitialLoading(false); // Set initial loading to false after simulated loading
    };

    initialLoad();
  }, []);

  return (
    <Router>
      {initialLoading && <Preloader />} {/* Show Preloader during initial loading */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="container" data-theme={theme}>
              <Header theme={theme} setTheme={setTheme} />
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setMakeSearch={setMakeSearch}
                data={data}
              />
              {/* Conditional rendering based on the state */}
              {!isEmptyObj(data) && <Navigate to="/profile" replace />}
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className="container" data-theme={theme}>
              <Header theme={theme} setTheme={setTheme} />
              <Profile data={data} />
            </div>
          }
        />
      </Routes>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme === "light" ? "#363636" : "#fff",
            color: theme === "light" ? "#fff" : "#363636",
          },
        }}
      />
    </Router>
  );
}

export default App;
