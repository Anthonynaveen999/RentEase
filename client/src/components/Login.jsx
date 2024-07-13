import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import BASE_URL from "../config";
import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn, login } = useContext(AuthContext);
  const { setUserDetails } = useContext(UserContext);

  const [credentials, setCredentials] = useState({
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
    console.log(credentials);
    try {
      const response = await axios.post(
        `${BASE_URL}/user/login`,credentials
      );
      if (response.status === 200 ) {
        const token = response.data.token;
        const decodedUser = jwtDecode(token);
        setUserDetails({
          id: decodedUser.id,
          name: decodedUser.name,
          email: decodedUser.email,
        });
        // setIsLoggedIn(true);
        login();
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
      // if (error.response && error.response.status === 401) {
      //   // props.showAlert("Invalid Credentials", "danger");
      //   navigate("/login");
      // } else if (error.response && error.response.status === 404) {
      //   // props.showAlert("Please fill all the fields", "danger");
      //   // console.log(error.response.data);
      //   navigate("/login");
      // }
    }
  }

  return (
    <div className=" flex-grow items-center p-28">
      <form
        className="flex flex-col max-w-md gap-4 mx-auto mt-8 p-4 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center">
          <h1 className="text-4xl">Login</h1>
        </div>
        <div>
          <Label
            htmlFor="email"
            className="mb-2 block"
            value="email"
            name="email"
          />
          <TextInput
            id="email"
            type="text"
            required
            className="w-full"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <Label
            htmlFor="password"
            className="mb-2 block"
            value="password"
            name="password"
          />
          <TextInput
            id="password"
            type="password"
            required
            className="w-full"
            onChange={handleChange}
            name="password"
          />
        </div>

        <Button type="submit" className="mt-4 w-full">
          Submit
        </Button>
        <div className="text-center">
          <Link to="/register" className="text-slate-500 hover:text-slate-700">
            <span>Don't have an account? Sign Up</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
