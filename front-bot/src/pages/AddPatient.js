import { useMutation } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import Success from "../components/Alerts/Success";
import Error from "../components/Alerts/Error";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const AddPatient = () => {
  const { user } = useSelector((state) => state.auth);
  const [formState, setFormState] = useState({
    name: "",
    gender: "Male",
    address: "",
    phoneNumber: "",
    nationalID: "",
  });
  const onChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const API_URL = "http://localhost:5000/patients/add-patient";
  //config object with token
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const authenticate = useMutation({
    mutationFn: async () => {
      const response = await axios.post(API_URL, formState, config);
      console.log(response);
      return response.data;
    },
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    authenticate.mutate();
  };
  return (
    <div className="bg-[#178dc21a] flex-grow flex items-center">
      <div className="container mx-auto p-4 font-roboto text-xl">
        <form
          onSubmit={handleFormSubmit}
          className="max-w-[60%] bg-white bg-opacity-40 p-20 rounded-3xl m-auto"
        >
          <div className="relative z-0 w-full mb-10 group">
            <input
              onChange={onChange}
              type="text"
              name="name"
              id="name"
              value={formState.name}
              className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-[#0a415a33] appearance-none  dark:border-[#0a415a33] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-10 group">
            <select
              id="gender"
              value={formState.gender}
              name="gender"
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-gray-500 bg-transparent border-0 border-b-2 border-[#0a415a33]"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-10 group">
            <input
              onChange={onChange}
              type="text"
              name="address"
              id="address"
              value={formState.address}
              className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-[#0a415a33] appearance-none  dark:border-[#0a415a33] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="address"
              className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-10 group">
              <input
                onChange={onChange}
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={formState.phoneNumber}
                className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-[#0a415a33] appearance-none  dark:border-[#0a415a33] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="phoneNumber"
                className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
            </div>
            <div className="relative z-0 w-full mb-10 group">
              <input
                onChange={onChange}
                type="text"
                name="nationalID"
                id="nationalID"
                value={formState.nationalID}
                className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-[#0a415a33] appearance-none  dark:border-[#0a415a33] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="nationalID"
                className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                National ID
              </label>
            </div>
          </div>
          <div className="flex items-center gap-7">
            <button
              type="submit"
              className="rounded-3xl text-white bg-[#178DC2] hover:bg-[#178DC2]-800 focus:ring-4 focus:outline-none focus:ring-[#178DC2]-300 font-medium rounded-lg  w-full sm:w-auto px-8 py-2.5 text-center dark:bg-[#178DC2]-600 dark:hover:bg-[#178DC2]-700 dark:focus:ring-[#178DC2]-800"
            >
              Save patient
            </button>
            {authenticate.isLoading && (
              <ClipLoader color={"#178DC2"}></ClipLoader>
            )}
            {authenticate.isSuccess && (
              <Success message={"Patient successfully added"}></Success>
            )}
            {authenticate.isError && (
              <Error
                message={
                  "Something wrong happened. Check the patient credentials."
                }
              ></Error>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
