import React, { useState, useMemo } from 'react'
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
import RestaurantDetails from './pages/RestaurantDetails';
import Authentication from './pages/Authentication';
export const logInContext = React.createContext()
export const mapDataContext = React.createContext()
export const loginEmailContext = React.createContext()

function App() {
  const [isEdit, setIsEdit] = useState(false);
  const [mapData, setMapData] = useState([])
  const [email, setEmail] = useState("")
  const [business, setBusiness] = useState("")
  const [isItLoggedIn, setIsItLoggedIn] = useState(false)

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

  const memoziedEmail = useMemo(() => {
    return { email, setEmail }
  }, [email])

  const memoziedLogIn = useMemo(() => {
    return { isItLoggedIn, setIsItLoggedIn }
  }, [isItLoggedIn])

  return (
    <logInContext.Provider value={memoziedLogIn}>
      <loginEmailContext.Provider value={memoziedEmail}>
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
                  <Route path="authentication" element={<Authentication />} />
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
      </loginEmailContext.Provider>
    </logInContext.Provider>
  );
}

export default App;
