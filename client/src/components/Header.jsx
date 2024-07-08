// import React from 'react';
// import { Link,NavLink } from 'react-router-dom';

// const Header = () => {
//     return (
//       <header className="flex w-full justify-between bg-black text-white p-3">
//         <Link to="/" className="brand text-2xl">
//           RentEase
//         </Link>
//         <NavLink to="/">Home</NavLink>
//         <NavLink to="/listings">Properties</NavLink>
//         <div className="avatar-dropdown">
//           <img src="avatar.jpg" alt="User Avatar" />
//           <div className="dropdown-content">
//             <a href="/profile">Profile</a>
//             <a href="/settings">Settings</a>
//             <a href="/logout">Logout</a>
//           </div>
//         </div>
//       </header>
//     );
// };

// export default Header;



import { Avatar, Dropdown, Navbar } from "flowbite-react";
import HouseIcon from "@mui/icons-material/House";

export default function Header() {
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
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Logout</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="text-white text-xl">
        <Navbar.Link href="/" active className="text-white text-lg">
          Home
        </Navbar.Link>
        <Navbar.Link href="/listings" className="text-lg">
          Properties
        </Navbar.Link>
        {/* <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}


