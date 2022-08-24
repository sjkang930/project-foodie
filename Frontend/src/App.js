import React, { useState, createContext, useMemo } from 'react'
import './App.css';
import './signUp.css';
import './map.css'
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import Map from './pages/Map';
import Create from './pages/Create';
import Post from './pages/Post';
import LogIn from './pages/LogIn';
import Head from './components/Head';
import { GoogleMap, withScriptjs, withGoogleMap } from "@react-google-maps/api";
import RestaurantDetails from './pages/RestaurantDetails';

export const mapDataContext = React.createContext()

function App() {
  const [isEdit, setIsEdit] = useState(false);
  const [mapData, setMapData] = useState([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [business, setBusiness] = useState("")
  const onClick = () => {
    if (isEdit) {
      setIsEdit(!isEdit)
    }
    return
  }

  const clearMapData = () => {
    setMapData([])
  }
  const memoziedMap = useMemo(() => {
    return { mapData, setMapData }
  }, [mapData])
  return (
    <mapDataContext.Provider value={memoziedMap}>
      <BrowserRouter>
        <div className="App">
          <div className="posts">
            <Routes>
              <Route path="/" element={<Post isEdit={isEdit} setIsEdit={setIsEdit} />} />
              <Route path="Map" element={<Map business={business} setBusiness={setBusiness} />} />
              <Route path="Create" element={<Create />} />
              <Route path="Chat" element={<Chat />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<LogIn />} />
              <Route path="restaurant" element={<RestaurantDetails business={business} />} />
            </Routes>
          </div>
        </div>

        <nav className="nav_icon">
          <NavLink to="/">
            <img onClick={onClick} alt="icon" className="home_icon" src="/icons/home.svg" />
          </NavLink>
          <NavLink to="Map">
            <img onClick={clearMapData} alt="icon" className="map_icon" src="icons/locationicon.svg" />
          </NavLink>
          <NavLink to="Create">
            <img alt="icon" className="post_icon" src="icons/post-new.svg" />
          </NavLink>
          <NavLink to="Chat">
            <img alt="icon" className="chat_icon" src="icons/txt.svg" />
          </NavLink>
          <NavLink to="signup">
            <img alt="icon" className="profile_icon" src="icons/profile.svg" />
          </NavLink>
        </nav>
      </BrowserRouter>
    </mapDataContext.Provider>
  );
}

export default App;
