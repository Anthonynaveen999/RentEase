const { createContext, useState, useEffect } = require("react");
const jwtDecode = require("jwt-decode");
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(
    localStorage.getItem("email") ? {
      id: localStorage.getItem("id"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
    } : 
    ""
  );

  useEffect(() => {
    localStorage.setItem("email",userDetails.email);
    localStorage.setItem("name",userDetails.name);
    localStorage.setItem("id",userDetails.id);
  }, [userDetails]);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};