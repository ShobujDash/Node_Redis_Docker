import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast'

import uploadFile from "../helpers/UploadFile";


function RegisterPage() {
  const [loading,setLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [uploadPhoto, setUploadPhoto] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const navigate = useNavigate();

  const handleUploadPhoto = async (e) => {
    setLoading(true)
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file)
    setUploadPhoto(file);
    
    setData((prev) => {
      return {
        ...prev,
        profile_pic:uploadPhoto?.url
      }
    })
    setLoading(false)
  };

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleSubmit = async(e) => { 
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/register`;

    try {
      setLoading(true)
      const response = await axios.post(URL, data);
      toast.success(response?.data?.message)
      
      if (response?.data?.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });
        navigate("/email")
        setLoading(false)
      }
      
    } catch (error) {
      toast.error(error.response.data?.message)
      console.log("error",error)      
    }


  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome to Chat app!</h3>
        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              placeholder="enter your name"
              name="name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary "
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              placeholder="enter your email"
              name="email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary "
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              placeholder="*******"
              name="password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary "
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo :
              <div className="h-14 bg-slate-200 flex justify-center items-center border hover:border-primary rounded cursor-pointer">
                <p className="text-sm max-w-[200px] text-ellipsis line-clamp-1">
                  {
                    loading && "Picture Uploading..." 
                  }
                  {uploadPhoto?.name
                    ? uploadPhoto?.name
                    : "Upload profile photo"}
                </p>
                {uploadPhoto?.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleClearUploadPhoto}
                    disabled={loading}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>

            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleUploadPhoto}
            />
          </div>

          <button type="submit" className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
            Register
          </button>
        </form>
        <p className="my-3 text-center ">
          Already have account ?{" "}
          <Link to="/email" className="hover:text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
