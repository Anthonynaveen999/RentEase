import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import BASE_URL from "../config";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { jwtDecode } from "jwt-decode";
export default function Register() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setUserDetails } = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Sign up request sent with:", credentials);

    try {
      const response = await axios.post(
        `${BASE_URL}/user/register`,
        credentials,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        const token = response.data.token;
        const decodedUser = jwtDecode(token);
        setUserDetails({
          id: decodedUser.id,
          name: decodedUser.name,
          email: decodedUser.email,
        });
        setIsLoggedIn(true);
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      if (error.response && error.response.status === 400) {
        // Handle validation errors
        console.log(error.response.data);
      }
    }
  }

  return (
    <div className="flex-grow items-center p-28">
      <form
        className="flex flex-col max-w-md gap-4 mx-auto mt-8 p-4 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center">
          <h1 className="text-4xl">Sign Up</h1>
        </div>
        <div>
          <Label htmlFor="name" className="mb-2 block" value="Name" />
          <TextInput
            id="name"
            type="text"
            required
            className="w-full"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2 block" value="Email" />
          <TextInput
            id="email"
            type="email"
            required
            className="w-full"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="password" className="mb-2 block" value="Password" />
          <TextInput
            id="password"
            type="password"
            required
            className="w-full"
            name="password"
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="mt-4 w-full">
          Submit
        </Button>
        <div className="text-center">
          <Link to="/login" className="text-slate-500 hover:text-slate-700">
            <span>Already have an account? Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
