import diabetes from "../assets/diabetes.png";
import doctor from "../assets/doctor.png";
import { useState } from "react";
import home1 from "../video/home1.mp4"
import home2 from "../video/home2.mp4"

import { Link } from "react-router-dom";
import Footer from "../components/Footer";
function Home() {
  const [toggled, setToggled] = useState(false)
  const handleToggle = () => {
    setToggled(prevState => !prevState)
  } 
  return (
    <div>
      <div className="bg-landingBackground bg-cover">
        <section
          id="main"
          className="flex items-center container mx-auto p-4 relative min-h-[643px]"
        >
          <div className="font-lora  tracking-[0.02em]">
            <h1 className="text-[40px] text-[#5F6364] font-bold">Welcome to</h1>
            <h1 className="text-[55px] xl:text-[75px] font-bold">
              Diabetes early detection unit
            </h1>
            <p className="text-[25px] font-normal max-w-[800px] mb-16">
              Egypt is one of the 21 countries and territories of the IDF MENA
              region. 537 million people have diabetes in the world and 73
              million people in the MENA Region; by 2045 this will rise to 135.7
              million.
            </p>
            <div id="cards" className="flex items-center gap-6 mb-16">
              <div
                id="card"
                className="max-w-[150px] rounded-[30px] bg-black/[.85] py-5 px-2 shadow-3xl"
              >
                <p className="text-[18px] text-white text-center">
                  <span className="font-bold text-2xl">59.37 M</span>
                  <br /> Total
                  <br />
                  Adult population
                </p>
              </div>
              <div
                id="card"
                className="max-w-[150px] rounded-[30px] bg-black/[.85] py-5 px-2 shadow-3xl"
              >
                <p className="text-[18px] text-white text-center">
                  <span className="font-bold text-2xl">18.4 %</span>
                  <br /> Prevalence of
                  <br />
                  diabetes in adults
                </p>
              </div>
              <div
                id="card"
                className="max-w-[150px] rounded-[30px] bg-black/[.85] py-5 px-2 shadow-3xl"
              >
                <p className="text-[18px] text-white text-center">
                  <span className="font-bold text-2xl">10.93 M</span>
                  <br /> Total cases of
                  <br />
                  diabetes in adults
                </p>
              </div>
            </div>
          </div>
          <div className=" top-0 right-0 bottom-0 ">
            <img src={diabetes} alt="" className="w-full" />
          </div>
        </section>
      </div>
      {toggled && <div className="container mx-auto p-4 font-lora text-xl">
        <p className="max-w-[600px]">
          Egypt came among the Arab countries with the highest number of people
          with diabetes aged between 20 and 79 years, reaching 20.9% and their
          total number to 10.9 million people during 2021. People with diabetes
          have an increased risk of developing several serious health problems.
          Consistently high blood glucose levels can lead to serious diseases
          affecting the heart and blood vessels, eyes, kidneys, nerves and
          teeth. In addition, people with diabetes also have a higher risk of
          developing infections
        </p>
        <div className="my-10">
          <h2 className="font-bold">Diabetes complications</h2>
          <p className="max-w-[1200px]">
            Over time, diabetes can damage the heart, blood vessels, eyes,
            kidneys and nerves. Adults with diabetes are two to three times more
            likely to have heart attacks and strokes. Poor blood flow and
            neuropathy (nerve damage) in the feet increases the risk of
            developing foot ulcers and sepsis, which may eventually require
            amputation. Diabetic retinopathy is a major cause of blindness and
            occurs as a result of the long-term build up of damage to the small
            blood vessels in the retina. About one million people have gone
            blind as a result of diabetes. Diabetes is one of the main causes of
            kidney failure.
          </p>
        </div>
        <div className="my-10">
          <h2 className="font-bold">Diabetic Retinopathy</h2>
          <div className="flex justify-between gap-5">
          <p className="max-w-[600px]">
            Diabetic retinopathy is a complication of diabetes, caused by high
            blood sugar levels damaging the back of the eye (retina). It can
            cause blindness if left undiagnosed and untreated. The retina is the
            light-sensitive layer of cells at the back of the eye that converts
            light into electrical signals. The signals are sent to the brain
            which turns them into the images you see. The retina needs a
            constant supply of blood, which it receives through a network of
            tiny blood vessels. Over time, a persistently high blood sugar level
            can damage these blood vessels in 3 main stages.
          </p>
          <video className="h-[300px]" controls  src = {home1}></video>
          </div>
          
        </div>
       
        <div className="my-10">
          <h2 className="font-bold">Diabetic foot ulcer Detection</h2>
          <div className="flex justify-between gap-5">
          <p className="max-w-[1000px]">
            A diabetic foot ulcer is an open sore or wound that occurs in
            approximately 15 percent of patients with diabetes , and it is a
            disease that has no clear symptoms, so the disease may be discovered
            late, and is commonly located on the bottom of the foot. Of those
            who develop a foot ulcer, six percent will be hospitalized due to
            infection or other ulcer-related complication. Diabetes is the
            leading cause of nontraumatic lower extremity amputations in the
            United States, and approximately 14 to 24 percent of patients with
            diabetes who develop a foot ulcer have an amputation.
          </p>
            <video controls  className="h-[300px]" src={home2}></video>
          </div>
          
        </div>
      </div>}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-b border-black"></div>
        </div>
        <div className="relative flex justify-center">
          <button onClick={handleToggle} className="font-roboto font-semibold relative text-black/60 px-4 py-2 text-center inline-block bg-[#C4CDD2]">
            {`See ${toggled ? "less" : "more"}`}
          </button>
        </div>
      </div>
      <div className="text-center my-4">
        <Link
          to="/auth/register"
          className="bg-black text-white text-2xl px-12 py-3 rounded-full"
        >
          Join Us
        </Link>
      </div>
      <section className="py-11">
        <div className="container mx-auto p-4">
          <div className="flex justify-between gap-7 relative">
            <div
              id="card"
              className=" rounded-[15px] pt-7 text-center px-4 bg-[#5D6772] pb-16"
            >
              <h2 className="font-lora text-center font-bold text-2xl text-white">
                Early detectoin for Diabets complications
              </h2>
              <p className="text-[18px] text-white/75 my-3">
                The main goal of our system is the early detection of diabetes
                complications before getting serious problems
              </p>
            </div>
            <div
              id="card"
              className=" rounded-[15px] pt-7 text-center px-4 bg-[#5D6772] pb-16 self-stretch relative top-6"
            >
              <h2 className="font-lora text-center font-bold text-2xl text-white">
                Low cost and Rapid Service{" "}
              </h2>
              <p className="text-[18px] text-white/75 my-3">
                Our system fulfills the need of low cost service in short time
                which saves the effort , money and time
              </p>
            </div>
            <div
              id="card"
              className=" rounded-[15px] pt-7 text-center px-4 bg-[#5D6772] pb-16 self-stretch relative top-12"
            >
              <h2 className="font-lora text-center font-bold text-2xl text-white">
                High Accurate Results
              </h2>
              <p className="text-[18px] text-white/75 my-3">
                We used Artificial Intelligence models with high accuracy so
                that we can depend on it in our diagnosis
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default Home;
