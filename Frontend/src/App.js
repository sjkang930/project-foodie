import React, { useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Map from './pages/Map';
import Create from './pages/Create';
import Post from './pages/Post';

function App() {
  const [isEdit, setIsEdit] = useState(false);
  const onClick = () => {
    if (isEdit) {
      setIsEdit(!isEdit)
    }
    return
  }
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h2>
            <a href="/"><img className="head_logo" src='https://ifh.cc/g/9qtKfn.png' alt="logo" border='0' /></a>
          </h2>
        </header>
        <div className="posts">
          <Routes>
            <Route path="/" element={<Post isEdit={isEdit} setIsEdit={setIsEdit} />}  />
            <Route path="Map" element={<Map />} />
            <Route path="Create" element={<Create />} />
            <Route path="Chat" element={<Chat />} />
            <Route path="Profile" element={<Profile />} />
          </Routes>
        </div>
      </div>

      <nav className="nav_icon">
        <NavLink to="/">
          <img onClick={onClick} alt="icon" className="home_icon" src="/icons/home.svg" />
        </NavLink>
        <NavLink to="Map">
          <img alt="icon" className="map_icon" src="icons/locationicon.svg" />
        </NavLink>
        <NavLink to="Create">
          <img alt="icon" className="post_icon" src="icons/post-new.svg" />
        </NavLink>
        <NavLink to="Chat">
          <img alt="icon" className="chat_icon" src="icons/txt.svg" />
        </NavLink>
        <NavLink to="Profile">
          <img alt="icon" className="profile_icon" src="icons/profile.svg" />
        </NavLink>
      </nav>
    </BrowserRouter>
  );
}

export default App;
