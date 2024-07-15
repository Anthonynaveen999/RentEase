import React, { useContext, useState } from "react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import HouseIcon from "@mui/icons-material/House";
import { AuthContext } from "../context/AuthContext";
import AddProperty from "./AddProperty";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/style.css";


export default function Header() {
  const { isLoggedIn, setIsLoggedIn, logout } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const userName = JSON.parse(localStorage.getItem("name"));
  const Navigate = useNavigate();
  // const userInitials = userName ? userName.charAt(0).toUpperCase() : "U";

  const handleLogout = () => {
    setIsLoggedIn(false);
    logout();
    localStorage.removeItem("token");
    Navigate("/");
  };

  const handleAddProperty = () => {
    if (isLoggedIn) {
      setModalOpen(true);
    } else {
      alert("Please login to add a property");
    }
  };

  return (
    <Navbar fluid className="bg-black text-white">
      <Navbar.Brand href="/">
        <HouseIcon className="mr-3 h-6 sm:h-9" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          RentEase
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {isLoggedIn ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User Profile"
                rounded
                className="hover:shadow-lg shadow-blue-50"
              >
              </Avatar>
            }
          >
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="/favorites">Favorites</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown>
        ) : (
          <Button href="/login" className="mr-3" style={{backgroundColor: '#ca3521'}}>
            Login
          </Button>
        )}
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse className="text-white text-xl">
        <Navbar.Link href="/" active className="navbar-link">
          Home
        </Navbar.Link>
        <Navbar.Link href="/listings" className="navbar-link">
          Properties
        </Navbar.Link>
        <Navbar.Link href="/sale" className="navbar-link">
          Buy
        </Navbar.Link>
        <div
          onClick={handleAddProperty}
          className="navbar-link hover:cursor-pointer"
        >
          Add Property
        </div>
        <AddProperty open={modalOpen} setOpen={setModalOpen} />
      </Navbar.Collapse>
    </Navbar>
  );
}
