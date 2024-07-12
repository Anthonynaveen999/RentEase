import React, {useContext} from 'react'
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
const Home = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setUserDetails } = useContext(UserContext);
  
  return (
    <div>
      Home
      {/* <a href="/register">Register</a>
      <a href="/login">Login</a> */}
    </div>
  );
}

export default Home