import React,{ useContext, useState } from "react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import HouseIcon from "@mui/icons-material/House";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import AddProperty from "./AddProperty";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn, logout } = useContext(AuthContext);
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [ modalOpen, setModalOpen ] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // setUserDetails({});
    logout();
    localStorage.removeItem("token");
  };

  const handleAddProperty = () => {
    if (isLoggedIn === true) {
      setModalOpen(true);
    } 
    // else {
    //   alert("Please login to add a property");
    // }
  }

  return (
    <Navbar fluid className="bg-black text-white">
      <Navbar.Brand href="https://flowbite-react.com">
        {/* <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        /> */}
        <HouseIcon className="mr-3 h-6 sm:h-9" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {isLoggedIn === true ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User Profile"
                  rounded
                  className="hover:shadow-lg shadow-blue-50"
                >
                  {/* {username ? username.charAt(0).toUpperCase() : "P"} */}
                </Avatar>
              }
            >
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="/settings">Settings</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <Button href="/login" className="mr-3">
            Login
          </Button>
        )}
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse className="text-white text-xl">
        <Navbar.Link href="/" active className="text-white text-lg">
          Home
        </Navbar.Link>
        <Navbar.Link href="/listings" className="text-lg">
          Properties
        </Navbar.Link>
        {/* <Navbar.Link onClick={handleAddProperty} className="text-lg">
          Add Property
        </Navbar.Link> */}
        <div onClick={handleAddProperty} className="text-lg hover:cursor-pointer">Add Property</div>
        <AddProperty open={modalOpen} setOpen={setModalOpen} />
        {/* <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}


