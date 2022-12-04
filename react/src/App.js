import "./App.css";
import Footer from "./fragments/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyNavbar from "./fragments/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import MyProfile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditProfile from "./pages/EditProfile";
import { removeUser, getUser } from "./data/repository";
import React, { useState } from "react";
import UserContext from "./contexts/UserContext";
import Forum from "./pages/Forum";
import NewPost from "./fragments/NewPost";
import AllPost from "./fragments/AllPost";
import MyPost from "./fragments/MyPost";
import EditPost from "./fragments/EditPost";
import ForEachReply from "./components/ForEachReply";
import Follow from "./pages/Follow";
import MyFollowingPost from "./fragments/MyFollowingPost";


function App() {
  const [user, setUser] = useState(getUser());

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <MyNavbar user={user}  logoutUser={logoutUser} />
          <Routes>
            <Route
              path="/"
              element={<Home user={user}  />}
            />

            <Route path="/login" element={<Login  loginUser={loginUser}/>} />
            <Route path="/signup" element={<Signup  />} />

            <Route path="/profile" element={<MyProfile />}>
              <Route
                path="editProfile"
                element={<EditProfile  />}
              />
            </Route>

            <Route path="/forum" element={<Forum  />}>
              <Route path="newPost" element={<NewPost  />} />
              <Route path="myPost" element={<MyPost />} />
              <Route path="allPost" element={<AllPost  />}>
                <Route path="forEachReply" element={<ForEachReply />}/>
              </Route>
              <Route path="EditPost" element={<EditPost />} />
              <Route path="myFollowingPost" element={<MyFollowingPost />} />
            </Route>

            <Route path="/follow" element={<Follow  />} />
          </Routes>

          <Footer />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
