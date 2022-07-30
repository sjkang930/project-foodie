import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Comment from './components/Comment';
import PostItem from './components/PostItem';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Map from './pages/Map';
import Create from './pages/Create';
import Post from './pages/Post';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import axios from 'axios';
function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <header>
          <h2>
            <a href="/"><img className="head_logo" src='https://ifh.cc/g/9qtKfn.png' border='0' /></a>
          </h2>
        </header>
        
        <div className="posts">


          <Routes>
            <Route path="/" element={<Post />} />
            <Route path="Map" element={<Map />} />
            <Route path="Create" element={<Create />} />
            <Route path="Chat" element={<Chat />} />
            <Route path="Profile" element={<Profile />} />
          </Routes>
        </div>

      </div>

      <nav className="nav_icon">
        <NavLink to="/">
          <img className="home_icon" src="/icons/home.svg" />
        </NavLink>
        <NavLink to="Map">
          <img className="map_icon" src="icons/locationicon.svg" />
        </NavLink>
        <NavLink to="Create">
          <img className="post_icon" src="icons/post-new.svg" />
        </NavLink>
        <NavLink to="Chat">
          <img className="chat_icon" src="icons/txt.svg" />
        </NavLink>
        <NavLink to="Profile">
          <img className="profile_icon" src="icons/profile.svg" />
        </NavLink>
      </nav>

    </BrowserRouter>

  );
}

export default App;
