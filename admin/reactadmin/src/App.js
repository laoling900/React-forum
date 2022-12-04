import "./App.css";
import Footer from "./fragments/Footer";
import MyNavbar from "./fragments/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import User from "./pages/User";
import Post from "./pages/Post";
import React from "react";
import UserContext from "./contexts/UserContext";
import { useEffect, useState } from 'react';
import {  getUsers } from './data/repository';
import FollowsMetrics from "./pages/FollowsMetrics";


function App() {
    const [users, setUsers] = useState([]);
    
    useEffect(() =>{
      async function loadData() {
        const currentUsers = await getUsers();
        setUsers(currentUsers);
      }
      loadData();
    },[])

  return (
    <div>
      <UserContext.Provider value={{ users, setUsers }}>
      <Router>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/post" element={<Post />} />
          <Route path="/followsmetrics" element={<FollowsMetrics />}/>
        </Routes>
        <Footer />
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
