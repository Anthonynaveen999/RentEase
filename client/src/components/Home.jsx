import React, {useContext} from 'react'
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { Button } from '@mantine/core';
const Home = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setUserDetails } = useContext(UserContext);
  
  return (
    <div>
      Home
      {/* <Button>Hello Mantine</Button> */}
      <Button variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
        Indigo cyan
      </Button>
      {/* <a href="/register">Register</a>
      <a href="/login">Login</a> */}
    </div>
  );
}

export default Home