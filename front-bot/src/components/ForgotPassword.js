import axios from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import Error from "./Alerts/Error";
import Success from "./Alerts/Success"
import diaLogo from "../assets/logo_black-removebg-preview 1.png";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
const API_URL = "http://localhost:5000/users/forgot-password";
const ForgotPassword = ({setForgotPassword}) => {
    const [formState, setFormState] = useState({
        email: "",
      });
      const onChange = (e) => {
        setFormState(() => ({
          email: e.target.value
        }));
      };
    const reset = useMutation({
        mutationKey: ["reset"],
        mutationFn: async () => {
            const response = await axios.post(API_URL, formState);
          return response.data;
        },
    })
    const handleFormSubmit = (e) => {
      e.preventDefault()
        reset.mutate()
    }
    return(
    <form
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
              <button className="border border-[#178DC2] bg-[#178DC2] text-white text-xl w-full py-2 mt-5 rounded-md" type="submit">Reset password</button>
              <button className="mt-3" onClick={() => setForgotPassword(false)}>Go back to login</button>
              <div className="h-[32px] mt-6 mx-auto">
                {reset.isLoading && (
                  <ClipLoader color={"#178DC2"}></ClipLoader>
                )}
                {reset.isError && (
                  <Error message={"Invalid email"}></Error>
                )}
                 {reset.isSuccess && (
                  <Success message={"password reset email sent."}></Success>
                )}
              </div>
            </div>
          </form>)
}
export default ForgotPassword