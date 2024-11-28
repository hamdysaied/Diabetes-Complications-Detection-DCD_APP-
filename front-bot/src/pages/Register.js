import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Success from "../components/Alerts/Success";
import Error from "../components/Alerts/Error";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    nationalID: "",
  });
  const onChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const API_URL = "http://localhost:5000/users/signup";
  const authenticate = useMutation({
    mutationFn: async () => {
      const response = await axios.post(API_URL, formState);
      console.log(response);
      return response.data;
    },
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    authenticate.mutate();
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (authenticate.isSuccess) {
      const timeout = setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [authenticate.isSuccess, navigate]);
  return (
    <div className="flex-grow flex items-center">
      <div className="container mx-auto p-4 font-roboto text-xl">
        <form
          onSubmit={handleFormSubmit}
          className="border border-gray-200 rounded-lg shadow max-w-[60%] bg-white bg-opacity-20 p-20 rounded-5xl m-auto"
        >
          <div className="relative z-0 w-full mb-10 group">
            <input
              onChange={onChange}
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-[#0a415a33] appearance-none  dark:border-[#0a415a33] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Name"
              required
            />
            
          </div>
          <div className="relative z-0 w-full mb-10 group">
            <input
              onChange={onChange}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-[#0a415a33] appearance-none  dark:border-[#0a415a33] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Email Address"
              required
            />
            
          </div>
          <div className="relative z-0 w-full mb-10 group">
            <input
              onChange={onChange}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-[#0a415a33] appearance-none  dark:border-[#0a415a33] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Password"
              required
            />
            
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-10 group">
              <input
                onChange={onChange}
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-[#0a415a33] appearance-none  dark:border-[#0a415a33] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Phone number"
                required
              />
             
            </div>
            <div className="relative z-0 w-full mb-10 group">
              <input
                onChange={onChange}
                type="text"
                name="nationalID"
                id="nationalID"
                className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-[#0a415a33] appearance-none  dark:border-[#0a415a33] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="National ID"
                required
              />
             
            </div>
          </div>
          <div className="flex items-center gap-7">
            <button
              type="submit"
              className="rounded-3xl text-white bg-[#178DC2] hover:bg-[#178DC2]-800 focus:ring-4 focus:outline-none focus:ring-[#178DC2]-300 font-medium rounded-lg  w-full sm:w-auto px-8 py-2.5 text-center dark:bg-[#178DC2]-600 dark:hover:bg-[#178DC2]-700 dark:focus:ring-[#178DC2]-800"
            >
              Submit
            </button>
            {authenticate.isLoading && (
              <ClipLoader color={"#178DC2"}></ClipLoader>
            )}
            {authenticate.isSuccess && (
              <Success
                message={
                  "Sign up is successful! You will be shortly redirected to the login page"
                }
              ></Success>
            )}
            {authenticate.isError && (
              <Error
                message={"Sign up failed. Check the user info and try again."}
              ></Error>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
