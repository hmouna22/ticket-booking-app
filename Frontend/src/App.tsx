import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Search from './components/Search';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface UserType {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

type TripType = {
  id: number;
  departure: string;
  destination: string;
  date: Date;
  price: number;
}

function App() {

  const navigate = useNavigate()
  const [trips, setTrips] = useState<TripType[]>([])

  const handleLogin = (data: string): void => {
    navigate("/")
    localStorage.setItem('token', data)
  }

  const handleLogout = (): void => {
    navigate("/")
    localStorage.removeItem('token')
  }
  
  const register = (state: UserType): void => {
    axios.post(`http://localhost:3000/user/register`, { name: state.name, email: state.email, password: state.password, phone: state.phone })
      .then(() => navigate("/login"))
      .catch(err => console.log(err.message))
  }

  const login = (email: string, password: string): void => {
    axios.post(`http://localhost:3000/user/login`, { email: email, password: password })
      .then(res => handleLogin(res.data.token))
      .catch(err => console.log(err.message))
  }

  const getAllTrips = (): void => {
    axios.get(`http://localhost:3000/trip`).then(reponse => {setTrips(reponse.data.trips);
    console.log('trips:',reponse.data.trips)})
      .catch(response => console.log(response.error))
  }

  useEffect(() => {
    getAllTrips();
  },[]);

  //const searchTrip = (from: string, to: string): void => {
  //setSearchClicked(true)
  //const temp = trips.filter(trip => trip.departure.includes(from) && trip.destination.includes(to))
  //setSearchedTrips(temp)
  //}

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home trips={trips} />} />
        <Route path="/register" element={<Register register={register} />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  )
}

export default App
