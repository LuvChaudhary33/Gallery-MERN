import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../assets/url";

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async(e) => {
      e.preventDefault();
      try {
        const user = await axios.post(`${URL}/api/user/auth`, {email, password}, {withCredentials: true})
        setEmail('');
        setPassword('')
        console.log("logged In")
        navigate("/")
      } catch (error) {
        console.log(error)
      }
    };
  
    return (
      <div className="w-full">
        <div className="md:w-[27rem] mx-auto mt-16 md:mt-32 p-9 rounded-lg shadow-xl">
        <h2 className=" text-center text-3xl font-semibold mb-4">Login</h2>
        <form className="flex flex-col justify-center" onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block mb-2 text-md font-medium text-gray-700">Email:</label>
            <input
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-md font-medium text-gray-700">Password:</label>
            <input
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center gap-2 mt-2">
            <p>Create an Account?</p><Link to="/register" className="text-black hover:text-black/50 underline">Register</Link>
        </div>
      </div>
      </div>
    );
}

export default Login;