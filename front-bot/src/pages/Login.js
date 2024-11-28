import diaLogo from "../assets/logo_black-removebg-preview 1.png";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { redirect } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Error from "../components/Alerts/Error";
import ForgotPassword from "../components/ForgotPassword";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [forgotPassword, setForgotPassword] = useState(false)
  const onChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const API_URL = "http://localhost:5000/users/login";
  const authenticate = useMutation({
    mutationFn: async () => {
      const response = await axios.post(API_URL, formState);
      if (response.data) {
        dispatch(login(response.data));
        navigate("/");
      }
      console.log(response);
      return response.data;
    },
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    authenticate.mutate();
  };
  return (
    <div className="bg-[#1373a0] flex-grow flex-col flex">
      <div className=" bg-loginBackground bg-cover h-full">
        <div className="w-full h-full flex items-center justify-center px-4">
          {!forgotPassword && <form
            onSubmit={handleFormSubmit}
            className="bg-white rounded-[50px] text-left w-[450px] mx-auto "
          >
            <div className="flex flex-col items-start justify-center p-10">
              <div className="self-center mb-3">
                <img src={diaLogo} alt="logo" />
              </div>
              <label
                htmlFor="email"
                className="mb-2 text-[#178DC2] font-roboto font-medium text-xl"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formState.email}
                onChange={onChange}
                className="border border-[#178DC2] px-2 py-2 mb-2 rounded-[5px] focus:outline-none w-full"
              />
              <label
                htmlFor="password"
                className="mb-2 text-[#178DC2] font-roboto font-medium text-xl mt-4"
              >
                Password :
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formState.password}
                onChange={onChange}
                className="border border-[#178DC2] px-2 py-2 rounded-[5px] focus:outline-none w-full"
              />

              <button
                type="submit"
                className="border border-[#178DC2] bg-[#178DC2] text-white text-xl w-full py-2 mt-5 rounded-md"
              >
                Login
              </button>
              <button className="mt-3" onClick={() => {setForgotPassword(true)}}>Forgot Password?</button>
              <div className="h-[32px] mt-6 mx-auto">
                {authenticate.isLoading && (
                  <ClipLoader color={"#178DC2"}></ClipLoader>
                )}
                {authenticate.isError && (
                  <Error message={"Invalid Credentials"}></Error>
                )}
              </div>
            </div>
          </form>}
          {forgotPassword && <ForgotPassword setForgotPassword = {setForgotPassword}></ForgotPassword>}
        </div>
      </div>
    </div>
  );
};
export default Login;
export const requireLogout = () => {
  if (localStorage.getItem("user")) return redirect("/");
  return null;
};
