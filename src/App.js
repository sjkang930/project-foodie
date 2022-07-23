import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import Comment from './pages/Comment';
import Follow from './pages/Follow';
import Map from './pages/Map';
import New from './pages/New';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
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
          <a class="nav-btn" href={"/"}>
            <img class="nav-icon" src="/icons/home.svg" />
          </a>

          <a class="nav-btn" href={"/Map"}>
            <img class="nav-icon" src="icons/locationicon.svg" />
          </a>

          <a class="nav-btn" href={"/New"}>
            <img class="nav-icon" src="icons/post-new.svg" />
          </a>

          <a class="nav-btn" href={"/Chat"}>
            <img class="nav-icon" src="icons/txt.svg" />
          </a>

          <a class="nav-btn" href={"/Follow"}>
            <img class="nav-icon" src="icons/profile.svg" />
          </a>

        </nav>
      </div>
    </BrowserRouter>
  );
}

export default App;
