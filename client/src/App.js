import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css"
import Form from "./components/Form";
import LCAData from "./components/LCAData";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const getData = async () => {
    const data = await axios.get('http://localhost:5000/posts', {
      headers: { Authorization: 'Bearer ' + user.result.token }
    })
    setPosts(data.data)
  }

  const deletepost = async (id) => {
    await axios.delete(`http://localhost:5000/posts/${id}`).then(setPosts(posts.filter((post) => post._id !== id)))
  }

  useEffect(() => {
    getData();
  }, [location])


  console.log(posts)
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <div className="App">
        <div className="App-header">
          {user ?
            <Box sx={{ width: { xl: "1400px" } }} m="auto">
              <Navbar />
              <Routes>
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/" element={<Form posts={posts} />} />
                <Route path="/LCADatas" element={<LCAData posts={posts} deletepost={deletepost} />} />
                <Route path="/:id" element={<Form posts={posts} />} />
              </Routes>
            </Box>
            :
            <SignIn />
          }
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
