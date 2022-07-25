import './App.css';
import { BrowserRouter, Route, Routes, Link, NavLink } from 'react-router-dom';
import Chat from './pages/Chat';
import Comment from './pages/Comment';
import Follow from './pages/Follow';
import Map from './pages/Map';
import New from './pages/New';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
      <Link to="/Chat">Chat</Link>
      <div className="App">
        <h2>
          <a href="/"><img src='https://ifh.cc/g/9qtKfn.png' border='0' /></a>
        </h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Comment" element={<Comment />} />
          <Route path="/Follow" element={<Follow />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/New" element={<New />} />

        </Routes>
        <nav className='bottome-nav'>
          <NavLink className="nav-btn" to="/">
            <img className="nav-icon" src="/icons/home.svg" />
          </NavLink>

          <a className="nav-btn" href={"/Map"}>
            <img className="nav-icon" src="icons/locationicon.svg" />
          </a>

          <a className="nav-btn" href={"/New"}>
            <img className="nav-icon" src="icons/post-new.svg" />
          </a>

          <a className="nav-btn" href={"/Chat"} >
            <img className="nav-icon" src="icons/txt.svg" />
          </a >

          <a className="nav-btn" href={"/Follow"} >
            <img className="nav-icon" src="icons/profile.svg" />
          </a >

        </nav >
      </div >
    </BrowserRouter >
  );
}

export default App;
