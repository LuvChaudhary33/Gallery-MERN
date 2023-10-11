import axios from "axios";
import { useNavigate } from "react-router-dom"
import {IoIosCreate} from "react-icons/io"
import {FiLogOut} from "react-icons/fi"
import { URL } from "../assets/url";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async() =>{
        try {
            const res = await axios.get(`${URL}/api/user/logout`, {withCredentials: true})
            navigate("/login")
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div className="w-full h-14 border-b-2 flex justify-between items-center px-2 md:px-14">
        <div onClick={() => navigate("/")} className="cursor-pointer">
            <h1 className="text-4xl font-extrabold">LUV.</h1>
        </div>
        <div className="flex items-center gap-5">
            <button onClick={() =>navigate("/upload")} className="flex items-center gap-1 text-sm md:text-[1rem] font-semibold border-2 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white px-1 md:px-3 py-1 md:py-2 rounded ">
                <IoIosCreate size={18} />Create Post
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1 text-sm md:text-[1rem] font-semibold border-2 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white px-1 md:px-3 py-1 md:py-2 rounded ">
                <FiLogOut size={18} />Logout
            </button>
        </div>
    </div>
  )
}

export default Navbar