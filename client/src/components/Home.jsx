
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.svg"
import {FaEye} from "react-icons/fa";
import Navbar from "./Navbar";
import { useGetImagesQuery } from "../Redux/Slice/slice";

const Home = () => {
    const navigate = useNavigate();
    const { data: data, isLoading, isSuccess, isError, error } = useGetImagesQuery()
    const [images, setImages] = useState(isSuccess ? data.data : []);

    useEffect(() =>{
      if(isSuccess){
        setImages(data.data)
      }
    }, [isSuccess])

  return (
    <>
    <Navbar />
    <div className="h-full container mx-auto py-8 px-2" >
      <h2 className="text-6xl font-semibold mb-4">Gallery</h2>
      {!isSuccess ? <img className="mx-auto my-[25vh] w-20" src={loader} />
        : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images?.map((image) => (
          <div key={image._id} className="lg:w-[25rem] h-[23rem] bg-white p-4 shadow-xl rounded-lg cursor-pointer " onClick={() => navigate("/post/"+image._id)}>
            <div className="flex justify-center w-full h-[10rem] overflow-hidden mb-5">
                <img src={image.photo} alt="image" className="w-full h-full object-cover" />
            </div>
            <p className="flex items-center gap-2 text-md"><FaEye size={15} />{image.seen?.length}</p>
            <h2 className="text-lg font-semibold">{image.title}</h2>
            <p className="mt-2  text-gray-600">{image.description.slice(0, 150)}<span className="text-blue-500">...Read more</span></p>
          </div>
        ))}
      </div>}
    </div>
    </>
  )
}

export default Home