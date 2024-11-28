import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Success from "../components/Alerts/Success";
import Error from "../components/Alerts/Error";
const SearchPatient = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formState, setFormState] = useState("");
  const onChange = (e) => {
    setFormState(e.target.value);
  };
  const API_URL = "http://localhost:5500/patient/" + formState;
  //config object with token
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const search = useMutation({
    mutationFn: async () => {
      const response = await axios.get(API_URL, config);
      if (response.data) {
        // navigate("/login");
      }
      console.log(response);
      return response.data;
    },
  });
  const allPatients = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        "http://127.0.0.1:5500/patients",
        config
      );
      console.log(response);
      return response.data;
    },
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    search.mutate();
  };
  return (
    <div className="bg-[#178dc21a] flex-grow flex items-center">
      <div className="container mx-auto p-4 font-roboto text-xl">
        <form className="flex flex-col items-center max-w-[60%] bg-white bg-opacity-40 p-20 rounded-3xl m-auto">
          <div className="relative z-0 w-full mb-10 group">
            <input
              onChange={onChange}
              type="text"
              name="nationalID"
              id="nationalID"
              className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-[#0a415a33] appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="National ID"
              required
            />
            
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleFormSubmit}
              type="submit"
              className="rounded-3xl text-white bg-[#178DC2] hover:bg-[#178DC2]-800 focus:ring-4 focus:outline-none focus:ring-[#178DC2]-300 font-medium rounded-lg  w-full sm:w-auto px-8 py-2.5 text-center "
            >
              Search for patient
            </button>
            <div
              onClick={() => {
                return allPatients.mutate();
              }}
              className="rounded-3xl cursor-pointer text-white bg-[#178DC2] hover:bg-[#178DC2]-800 focus:ring-4 focus:outline-none focus:ring-[#178DC2]-300 font-medium rounded-lg  w-full sm:w-auto px-8 py-2.5 text-center "
            >
              Get all patients with diagnosis
            </div>
          </div>

          <div className="h-[32px] mt-6">
            {(search.isLoading || allPatients.isLoading) && (
              <ClipLoader color={"#178DC2"}></ClipLoader>
            )}
            {(search.isError || allPatients.isError) && (
              <Error message={"Patient not found."}></Error>
            )}
          </div>
        </form>
        {search.isSuccess && (
          <>
            <h2 className="text-center font-bold mt-10 mb-10">
              Search results:{" "}
            </h2>
            <div className=" mt-5 mx-auto block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    Patient info
                  </h5>
                  <p className="font-normal text-gray-700 ">
                    <span className="font-bold">Name</span>: {search.data.name}
                  </p>
                  <p className="font-normal text-gray-700 ">
                    <span className="font-bold">Gender</span>: {search.data.gender}
                  </p>
                  <p className="font-normal text-gray-700 ">
                    <span className="font-bold">National ID</span>:{" "}
                    {search.data.nationalID}
                  </p>
                  <p className="font-normal text-gray-700 ">
                    <span className="font-bold">Phone number</span>:{" "}
                    {search.data.phoneNumber}
                  </p>
                  <p className="font-normal text-gray-700 ">
                    <span className="font-bold">Address</span>:{" "}
                    {search.data.address}
                  </p>
                  {search.data.retina_image_path && (
                    <div>
                      <p className="font-normal text-gray-700 ">
                        <span className="font-bold">retina image path</span>:{" "}
                        {search.data.retina_image_path}
                      </p>
                      <p className="font-normal text-gray-700 ">
                        <span className="font-bold">
                          retina ulcer diagnosis
                        </span>
                        : {search.data.retina_ulcer_diagnosis}
                      </p>
                    </div>
                  )}
                  {search.data.foot_image_path && (
                    <div>
                      <p className="font-normal text-gray-700 ">
                        <span className="font-bold">foot image path</span>:{" "}
                        {search.data.foot_image_path}
                      </p>
                      <p className="font-normal text-gray-700 ">
                        <span className="font-bold">foot ulcer diagnosis</span>:{" "}
                        {search.data.foot_ulcer_diagnosis}
                      </p>
                    </div>
                  )}
                </div>
          </>
        )}
        {allPatients.isSuccess && (
          <>
            <h2 className="text-center font-bold mt-10 mb-10">
              All patients:{" "}
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {allPatients.data.map((patient) => (
                <div className=" mt-5 mx-auto block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    Patient info
                  </h5>
                  <p className="font-normal text-gray-700 ">
                    <span className="font-bold">Name</span>: {patient.name}
                  </p>
                  <p className="font-normal text-gray-700 ">
                    <span className="font-bold">Gender</span>: {patient.gender}
                  </p>
                  <p className="font-normal text-gray-700 ">
                    <span className="font-bold">National ID</span>:{" "}
                    {patient.nationalID}
                  </p>
                  <p className="font-normal text-gray-700 ">
                    <span className="font-bold">Phone number</span>:{" "}
                    {patient.phoneNumber}
                  </p>
                  <p className="font-normal text-gray-700 ">
                    <span className="font-bold">Address</span>:{" "}
                    {patient.address}
                  </p>
                  {patient.retina_image_path && (
                    <div>
                      <p className="font-normal text-gray-700 ">
                        <span className="font-bold">retina image path</span>:{" "}
                        {patient.retina_image_path}
                      </p>
                      <p className="font-normal text-gray-700 ">
                        <span className="font-bold">
                          retina ulcer diagnosis
                        </span>
                        : {patient.retina_ulcer_diagnosis}
                      </p>
                    </div>
                  )}
                  {patient.foot_image_path && (
                    <div>
                      <p className="font-normal text-gray-700 ">
                        <span className="font-bold">foot image path</span>:{" "}
                        {patient.foot_image_path}
                      </p>
                      <p className="font-normal text-gray-700 ">
                        <span className="font-bold">foot ulcer diagnosis</span>:{" "}
                        {patient.foot_ulcer_diagnosis}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPatient;
