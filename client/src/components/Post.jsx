import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {FaEye} from "react-icons/fa";
import loader from "../assets/loader.svg"
import Navbar from "./Navbar";
import { URL } from "../assets/url";

const Post = () => {
    const [image, setImage] = useState([]);
    const [seen, setSeen] = useState(false)
    const postId = useParams().id
    console.log(postId)
    const fetchImages = async() =>{
        try {
            const res = await axios.get(`${URL}/api/post/${postId}`, {withCredentials: true});
            // console.log(res.data.data.seen)
            setSeen(res.data.alreadySeen)
            setImage(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        fetchImages();
    }, [])
  return (
    <>
    <Navbar />
    <div className="w-full h-full px-10 py-10">
     {image.length===0 ? <img className="mx-auto my-[25vh] w-20" src={loader} />
        :<div className="md:w-[90%] h-full mx-auto">
        <div>
            <h1 className="text-2xl font-bold text-black md:text-4xl">{image.title}</h1>
        </div>
        <div className="w-full h-[70%]  mt-10">
            <img src={image.photo} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex justify-between mt-5 px-2">
            <p className="flex items-center gap-2 text-md"><FaEye size={25} className={{seen} && "fill-blue-500"} />{image.seen?.length}</p>
            <p className="text-lg">Author : @{image?.username}</p>
        </div>
        <div className="mt-3 text-lg px-2">
            <p>{image.description}</p>
        </div>
     </div>}
    </div>
    </>
  )
}

export default Post