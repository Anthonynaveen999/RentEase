const { createContext, useState, useEffect } = require("react");
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    id: JSON.parse(localStorage.getItem("id")) || "",
    email: JSON.parse(localStorage.getItem("email")) || "",
    name: JSON.parse(localStorage.getItem("name")) || "",
  });

  useEffect(() => {
    localStorage.setItem("email",JSON.stringify(userDetails.email));
    localStorage.setItem("name",JSON.stringify(userDetails.name));
    localStorage.setItem("id",JSON.stringify(userDetails.id));
  }, [userDetails]);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};