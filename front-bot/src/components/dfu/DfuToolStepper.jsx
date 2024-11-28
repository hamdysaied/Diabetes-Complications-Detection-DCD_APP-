import styled from "styled-components";
import Button from "./Button";
import EyeSideImage from "../../assets/dfu/retina.png";
import RetinaImage from "../../assets/dfu/retina-photo.png";
import PlaceholderImage from "../../assets/dfu/placeholder.png";
import { ReactComponent as UploadIcon } from "../../assets/dfu/icons/arrow-up-1.svg";
import { ReactComponent as DropzoneIcon } from "../../assets/dfu/icons/gallery-add.svg";
import StepWrapper from "./StepWrapper";
import Dropzone from "react-dropzone";
import { useCallback, useState } from "react";
import AdviceList from "./AdviceList";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Error from "../Alerts/Error";
import { ClipLoader } from "react-spinners";
import foot from "../../video/foot.mp4"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentSms } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";const B = styled.b`
  font-weight: ${(props) => props.weight || "bold"};
`;

const StyledStep = styled.div`
  h1 {
    margin-bottom: 1rem;
    @media (max-width: 800px) {
      font-size: 1.3rem;
    }
  }
  button {
    margin-bottom: 1rem;
  }
  .stepContent {
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    img {
      max-width: 300px;
      @media (max-width: 1100px) {
        width: 300px;
      }
    }
  }
  .textWrapper {
    width: 50%;
    text-align: justify;
    p {
      font-size: ${(props) => props.size || "16px"};
      line-height: 1.4em;
    }
    @media (max-width: 800px) {
      font-size: 10px;
      width: 100%;
    }
  }
  &.results {
    .stepContent > img {
      opacity: 0.2;
      width: 300px;
    }
  }
  &.upload {
    .UploadButton {
      margin-bottom: 1rem;
    }
    .textWrapper {
      @media (max-width: 800px) {
        display: none;
      }
    }
  }
`;

const StyledDone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProccesingFacts = styled.div`
  position: relative;
  padding-top: 4rem;
  padding-left: 2rem;
  z-index: 1;
  .diagramImage {
    width: 150px;
    position: absolute;
    top: -1rem;
    left: 0;
    z-index: -1;
    @media (max-width: 800px) {
      display: none;
    }
  }
  @media (max-width: 800px) {
    padding: 0;
  }
`;

const DfuToolStepper = ({ patientID }) => {
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setdone] = useState(false);

  const prediction = useMutation({
    mutationKey: ["prediction"],
    //add image to form data
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.put(
        "http://127.0.0.1:5500/predict/" + patientID,
        formData
      );
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
      setResult(data.result);
      setCurrentStep(3);
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      const file = new File([reader.result], acceptedFiles[0].name, {
        type: acceptedFiles[0].type,
      });
      setPhoto(file);
      setPhotoUrl(URL.createObjectURL(file))
    };
    reader.readAsArrayBuffer(acceptedFiles[0]);
  }, []);
  if (!done)
    return (
      <div className="stepWrapper">
        <StepWrapper
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          isPredicitng={prediction.isLoading}
          result={result}
          photo={photo}
          getPrediction={prediction.mutate}
        >
          <StyledStep label="Welcome">
            <h1 className="text-[30px]">
              Welcome to the Diabetic <B>foot ulcer Detection Tool</B>
            </h1>
            <div className="stepContent">
              <div className="textWrapper">
                <p>
                  <B weight={600}>diabetic foot ulcer</B> is an open sore or
                  wound that occurs in approximately 15 percent of patients with
                  diabetes, and it is a disease that has no clear symptoms, so
                  the disease may be discovered late.
                </p>
                <p>
                  is commonly located on the bottom of the foot. Of those who
                  develop a foot ulcer, six percent will be hospitalized due to
                  infection or other ulcer-related complication. Diabetes is the
                  leading cause of nontraumatic lower extremity amputations in
                  the United States, and approximately 14 to 24 percent of
                  patients with diabetes who develop a foot ulcer have an
                  amputation.
                </p>
                <p>
                  This tool is developed and maintained by a team of students in{" "}
                  <B weight={600}>
                    The Faculty of Computing and Data Science at Alexandria
                    University, Egypt
                  </B>
                  . It aims to help medical professionals diagnose patients
                  suffering from Diabectic complicatins using the power of
                  Machine Learning.
                </p>
              </div>
              <img src={EyeSideImage} alt="" />
            </div>
          </StyledStep>
          <StyledStep size="1.3em" label="How to use?">
            <h1 className="text-[30px]">
              <B>How to use this tool</B>
            </h1>
            <div className="stepContent">
              <div className="textWrapper">
                <p>
                  This model utilizes image classification, pattern recognition,
                  and machine learning to analyse retinal photographs and detect
                  diabetic foot ulcer.
                </p>
                <p>
                  You are required to upload a
                  <B> clear color foot photograph.</B>
                </p>
                <p>
                  <B>You can find an example photo to the right.</B>
                </p>
              </div>
              <img src={RetinaImage} alt="" />
            </div>
          </StyledStep>
          <StyledStep label="Upload Photo" className="upload">
            <Button
              upload
              setPhoto={setPhoto}
              setPhotoUrl={setPhotoUrl}
              reversed
              color="white"
              text="#15668a"
              Icon={UploadIcon}
            >
              Upload Photo
            </Button>
            <div className="stepContent">
              <div className="textWrapper">
                <Dropzone onDrop={onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="flex gap-5 items-center mb-5">
                          <DropzoneIcon />
                          <p>Drop photo here</p>
                        </div>
                        {prediction.isError && (
                          <Error
                            message={
                              "Error occured. Please upload a proper image for diagnosis."
                            }
                          ></Error>
                        )}
                        {prediction.isLoading && <ClipLoader></ClipLoader>}
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
              <img
                src={!photoUrl ? PlaceholderImage : photoUrl}
                alt=""
              />
            </div>
          </StyledStep>
          <StyledStep label="Results" className="results">
            {result === "Normal" && (
              <>
                <h1>
                  Diagnosis:{" "}
                  <span style={{ color: "#14a708", fontWeight: "bold" }}>
                    No Diabetic foot ulcer detected
                  </span>
                </h1>
                <p>
                  <B>Please advice patients to:</B>
                </p>
                <div className="stepContent !grid grid-cols-2">
                  <AdviceList />
                  <video controls autoPlay src={foot}></video>
                </div>
                <div className="flex items-center gap-10 mt-20">
                  <FontAwesomeIcon size="6x" icon={faBell} shake style={{ color: "#3c87cd" }} />   
                                 <p>
    The system is used to help doctors, so the detection result may not be 100% correct. It is advised to go to any specialist doctor.
  </p>
</div>
                
              </>
            )}
            {result === "DFU Detected " && (
              <>
                <h1>
                  Diagnosis:{" "}
                  <span style={{ color: "#DD4242", fontWeight: "bold" }}>
                    Diabetic Foot Ulcer detected
                  </span>
                </h1>
                <div className="flex items-center gap-5 mt-6">
                  <FontAwesomeIcon size="6x" icon={faCommentSms}></FontAwesomeIcon>
                  <p className="text-[30px]">You will receive a message soon with your doctor's appointment and address Your safety matters to us, we wish you a speedy recovery</p>
                  </div>
                  <div className="flex items-center gap-10 mt-20">
                  <FontAwesomeIcon size="6x" icon={faBell} shake style={{ color: "#3c87cd" }} />   
                                 <p>
    The system is used to help doctors, so the detection result may not be 100% correct. It is advised to go to any specialist doctor.
  </p>
</div>
                {/* <div className="stepContent">
                  <PatientForm setdone={setdone} />
                  <img src={CloseIcon} alt="" />
                </div> */}
              </>
            )}
          </StyledStep>
        </StepWrapper>
      </div>
    );
  else
    return (
      <div className="stepWrapper">
        <StyledDone>
          <h1>
            Thank you for using our tool, we will get in contact with you soon
          </h1>
        </StyledDone>
      </div>
    );
};

export default DfuToolStepper;
