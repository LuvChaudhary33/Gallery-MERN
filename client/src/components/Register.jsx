import axios from 'axios';
import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { URL } from "../assets/url";

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignup = async(e) => {
        e.preventDefault();
        try {
          const user = await axios.post(`${URL}/api/user`, {name: username, email, password}, {withCredentials: true})
          setUsername('')
          setEmail('');
          setPassword('')
          navigate("/login")
          console.log("Registered!")
        } catch (error) {
          console.log(error)
        }
    };
  
    return (
      <div className='w-full'>
        <div className="md:w-[27rem] mx-auto mt-16 md:mt-20 p-9 rounded-lg shadow-xl">
        <h2 className="text-center text-3xl font-semibold mb-4">Signup</h2>
        <form className="flex flex-col justify-center" onSubmit={handleSignup}>
          <div className="mb-6">
            <label className="block mb-2 text-md font-medium text-gray-700">Username:</label>
            <input
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              required
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
            Signup
          </button>
        </form>
        <div className="flex items-center justify-center gap-2 mt-2">
            <p>Already have an Account?</p><Link to="/login" className="text-black hover:text-black/50 underline">Login</Link>
        </div>
      </div>
      </div>
    );
  };

export default Register