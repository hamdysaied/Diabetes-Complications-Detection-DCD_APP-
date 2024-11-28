import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import retLogo from "../assets/retinopathyLogo.png";
import dfuLogo from "../assets/dfuLogo.png";
import RetToolStepper from "../components/retinopathy/RetToolStepper";
import DfuToolStepper from "../components/dfu/DfuToolStepper";
import { ClipLoader } from "react-spinners";
import Error from "../components/Alerts/Error";
const Diagnose = () => {
  const { user } = useSelector((state) => state.auth);
  const [formState, setFormState] = useState("");
  const [patientFound, setPatientFound] = useState(false);
  const [disease, setDisease] = useState(null);
  const onChange = (e) => {
    setFormState(e.target.value);
  };
  const API_URL = "http://localhost:5000/patients/" + formState;
  //config object with token
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const search = useMutation({
    mutationFn: async () => {
      const response = await axios.get(API_URL, config);
      return response.data;
    },
    onSuccess: () => {
      setPatientFound(true);
    },
    onError: () => {
      console.log("user not found");
    },
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    search.mutate();
  };
  return (
    <>
      {!patientFound && (
        <div className="bg-[#178dc21a] flex-grow flex items-center">
          <div className="container mx-auto p-4 font-roboto text-xl">
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col items-center max-w-[60%] bg-white bg-opacity-40 p-20 rounded-3xl m-auto"
            >
              <div className="relative z-0 w-full mb-10 group">
                <input
                  onChange={onChange}
                  type="text"
                  name="nationalID"
                  id="nationalID"
                  className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-[#0a415a33] appearance-none dark: dark:border-[#0a415a33] dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="nationalID"
                  className="  text-gray-500 dark:text-gray-400 duration-300"
                >
                  Enter national ID of the patient
                </label>
              </div>
              <button
                type="submit"
                className="rounded-3xl text-white  bg-[#178DC2] hover:bg-[#178DC2]-800 focus:ring-4 focus:outline-none focus:ring-[#178DC2]-300 font-medium rounded-3xl  w-full sm:w-auto px-8 py-2.5 text-center dark:bg-[#178DC2]-600 dark:hover:bg-[#178DC2]-700 dark:focus:ring-[#178DC2]-800"
              >
                Submit
              </button>
              {true && (
                <div className="h-[32px] mt-6">
                  {search.isLoading && (
                    <ClipLoader color={"#178DC2"}></ClipLoader>
                  )}
                  {search.isError && (
                    <Error
                      message={
                        "Patient not found. Enter valid ID to access the tool"
                      }
                    ></Error>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
      {patientFound && !disease && (
        <div className="container mx-auto flex flex-grow items-center justify-between">
          <div className="flex w-full justify-between">
            <div
              onClick={() => setDisease("ret")}
              className="cursor-pointer flex flex-col basis-1/3"
            >
              <div
                style={{
                  borderRadius: "40px 40px 0 0",
                }}
                className="flex-grow p-4 flex items-center justify-center border-4 border-b-0 border-[#9EDDFE]"
              >
                <img alt="diabetic retinopathy tool" src={retLogo}></img>
              </div>
              <p
                style={{
                  borderRadius: "0 0 40px 40px",
                }}
                className="bg-[#178DC2] p-5 text-center text-[35px] text-white "
              >
                Diabetic Retinopathy<br></br>Check
              </p>
            </div>
            <div
              onClick={() => setDisease("dfu")}
              className="cursor-pointer basis-1/3 flex flex-col"
            >
              <div
                style={{
                  borderRadius: "40px 40px 0 0",
                }}
                className="flex-grow p-4 flex items-center justify-center border-4 border-b-0 border-[#9EDDFE]"
              >
                <img alt="diabetic foot ulcer tool" src={dfuLogo}></img>
              </div>
              <p
                style={{
                  borderRadius: "0 0 40px 40px",
                }}
                className="bg-[#178DC2] p-5 text-center text-[35px] text-white"
              >
                Diabetic Foot Ulcer<br></br>Check
              </p>
            </div>
          </div>
        </div>
      )}
      {patientFound && disease === "ret" && (
        <div className="mt-[100px]">
          <RetToolStepper patientID={search.data._id}></RetToolStepper>
        </div>
      )}
      {patientFound && disease === "dfu" && (
        <div className="mt-[100px]">
          <DfuToolStepper patientID={search.data._id}></DfuToolStepper>
        </div>
      )}
    </>
  );
};

export default Diagnose;
