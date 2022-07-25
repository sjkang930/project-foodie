import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>
          <a href="/"><img src='https://ifh.cc/g/9qtKfn.png' border='0' /></a>
        </h2>
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Comment" element={<Comment />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/Create" element={<Create />} />
        </Routes>
        <div>
          <NavBar />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
