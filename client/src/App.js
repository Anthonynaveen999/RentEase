import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Listings from './components/Listings';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext.js';
import { UserProvider } from './context/UserContext.js';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <AuthProvider>
          <UserProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Listings />} />
              </Route>
            </Routes>
          </UserProvider>
        </AuthProvider>
      </Router>
    </MantineProvider>
  );
}

export default App;
