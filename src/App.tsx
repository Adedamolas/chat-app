import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Navbar";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { AppContext } from "./helpers/Context";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase-config";
import useLocalStorageBoolean from "./helpers/useLocalStorageBoolean";
import Register from "./pages/Register";

export default function App() {
  const [isAuth, setIsAuth] = useLocalStorageBoolean("isAuth", false);
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  console.log(isAuth);

  // const navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", JSON.stringify(true));

      setIsAuth(true);
      // navigate("/");
    });
  };

  return (
    <AppContext.Provider value={{ isAuth, signUserOut }}>
      <main className=" bg-white text-black h-max">
        <Navbar isAuth={isAuth} signUserOut={signUserOut} />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route
              path="/login"
              element={<Login signInWithGoogle={signInWithGoogle} />}
            />
            <Route
              path="/register"
              element={<Register signInWithGoogle={signInWithGoogle} />}
            />
          </Routes>
        </Router>
      </main>
    </AppContext.Provider>
  );
}
