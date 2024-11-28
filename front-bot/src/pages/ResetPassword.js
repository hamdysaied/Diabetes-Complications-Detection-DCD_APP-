import axios from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import Error from "../components/Alerts/Error";
import Success from "../components/Alerts/Success"
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";
const ResetPassword = ({setForgotPassword}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const API_URL = "http://localhost:5000/users/reset-password?resetToken=" + searchParams.get("resetToken");
    const [formState, setFormState] = useState({
        password: "",
      });
      const onChange = (e) => {
        setFormState(() => ({
          password: e.target.value
        }));
      };
      const config = {
        headers: {
          Authorization: `Bearer ${searchParams.get("resetToken")}`,
        },
      };
    const reset = useMutation({
        mutationKey: ["reset"],
        mutationFn: async () => {
            const response = await axios.post(API_URL, formState, config);
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
              <label
                htmlFor="password"
                className="mb-2 text-[#178DC2] font-roboto font-medium text-xl"
              >
                New password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formState.password}
                onChange={onChange}
                className="border border-[#178DC2] px-2 py-2 mb-2 rounded-[5px] focus:outline-none w-full"
              />
              <button className="border border-[#178DC2] bg-[#178DC2] text-white text-xl w-full py-2 mt-5 rounded-md" type="submit">Reset password</button>
              <div className="h-[32px] mt-6 mx-auto">
                {reset.isLoading && (
                  <ClipLoader color={"#178DC2"}></ClipLoader>
                )}
                {reset.isError && (
                  <Error message={"Error changing password"}></Error>
                )}
                 {reset.isSuccess && (
                  <Success message={"password successfully reset."}></Success>
                )}
              </div>
            </div>
          </form>)
}
export default ResetPassword