import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Listings from './components/Listings';
import Favorites from './components/Favorites';
import Login from './components/Login';
import Register from './components/Register';
import PropertyDetails from './components/PropertyDetails';
import { AuthProvider } from './context/AuthContext.js';
import { UserProvider } from './context/UserContext.js';
import { MantineProvider } from '@mantine/core';
import Alert from './components/Alert';
import HouseSale from './components/HouseSale.jsx';
function App() {
  const [alert, setalert] = useState(null);
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <AuthProvider>
          <UserProvider>
            {/* <Alert alert={alert} /> */}
            <Routes>
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/register" element={<Register showAlert={showAlert}/>} />
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/sale" element={<HouseSale />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route
                  path="/property/:houseId"
                  element={<PropertyDetails />}
                />
              </Route>
            </Routes>
          </UserProvider>
        </AuthProvider>
      </Router>
    </MantineProvider>
  );
}

export default App;
