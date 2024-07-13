const { createContext, useState, useEffect } = require("react");
const { jwtDecode } = require("jwt-decode");
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => 
      localStorage.getItem("isLoggedIn") === "true" ? true : false,
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (isLoggedIn && token) {
      try {
        const decodedToken = jwtDecode(token);
        const expTime = decodedToken.exp * 1000;
        const currentTime = new Date().getTime();

        if (expTime < currentTime) {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
          logout();
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
      }
    } 
    else {
      logout();
    }
  }, []);

  const login = () => setIsLoggedIn(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("name", JSON.stringify(""));
    localStorage.setItem("email", JSON.stringify(""));
    localStorage.setItem("id", JSON.stringify(""));
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
