import { useState } from 'react';
import axios from 'axios';
import {AiOutlineCloudUpload} from "react-icons/ai"
import Navbar from './Navbar';
import { URL } from "../assets/url";

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
        let formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
  
        const res = await axios.post(`${URL}/api/post`, formData, {withCredentials: true});
        setImage(null);
        setTitle('');
        setDescription('');
        console.log(res)
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <>
    <Navbar />
    <div className="max-w-full h-full mx-auto flex flex-col bg-white  ">
    <div className='h-full flex flex-col gap-8 p-10 lg:mx-16 my-10'>
      <h2 className="text-4xl font-semibold mb-4">Create Post</h2>
      <form onSubmit={handleUpload} className='lg:w-[50rem] w-full flex flex-col gap-5'>
        <input
          type="file"
          required
          accept="image/*"
          name="image"
          onChange={handleImageChange}
          className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
        />
        <input
          type="text"
          required
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
        />
        <textarea
          required
          rows={10}
          placeholder="Image Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
        />
        <div className=''>
          <button
            type="submit"
            className="flex items-center gap-2 font-semibold border-2 border-indigo-400 text-indigo-400 hover:text-white px-4 py-2 rounded hover:bg-indigo-400 transition duration-200"
          >
            Upload<AiOutlineCloudUpload size={25} />
          </button>
        </div>
        
      </form>
    </div>
  </div>
  </>
  );
};

export default UploadForm;