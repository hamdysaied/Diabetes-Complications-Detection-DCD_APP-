import { Link } from "react-router-dom";
import addPatient from "../assets/addUser.png";
import searchPatient from "../assets/searchUser.png";
import makeDiagnosis from "../assets/diagnose.png";
import { redirect } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="container mx-auto flex flex-grow items-center justify-center">
      <div className="flex gap-20 grid-cols-3 w-full justify-between">
        <Link
          to={"patient/add"}
          className="bg-[#bdfffb33] basis-1/3 p-6 pt-[100px] border-4 border-[#9EDDFE]"
        >
          <div className="w-full flex justify-center pb-10 border-b-2 border-[#3EBBFE]">
            <img alt="add patient" src={addPatient}></img>
          </div>
          <p className="text-center text-[35px] mt-5 text-[#4CAEFE]">
            Add<br></br>new Patient
          </p>
        </Link>
        <Link
          to={"patient/search"}
          className="bg-[#bdfffb33] basis-1/3 p-6 pt-[100px] border-4 border-[#9EDDFE]"
        >
          <div className="w-full flex justify-center pb-10 border-b-2 border-[#3EBBFE]">
            <img alt="search patient" src={searchPatient}></img>
          </div>
          <p className="text-center text-[35px] mt-5 text-[#4CAEFE]">
            Search<br></br>for Patient
          </p>
        </Link>
        <Link
          to={"diagnose"}
          className="bg-[#bdfffb33] basis-1/3 p-6 pt-[100px] border-4 border-[#9EDDFE]"
        >
          <div className="w-full flex justify-center pb-10 border-b-2 border-[#3EBBFE]">
            <img alt="make diagnosis" src={makeDiagnosis}></img>
          </div>
          <p className="text-center text-[35px] mt-5 text-[#4CAEFE]">
            Make<br></br>new diagnosis
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
export const requireLogin = () => {
  if (!localStorage.getItem("user")) return redirect("/auth/login");
  return null;
};
