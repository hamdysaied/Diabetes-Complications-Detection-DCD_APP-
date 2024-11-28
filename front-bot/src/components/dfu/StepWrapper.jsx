import { React, useState } from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { ReactComponent as NextIcon } from "../../assets/dfu/icons/arrow-circle-right.svg";
import { ReactComponent as BackIcon } from "../../assets/dfu/icons/arrow-circle-left.svg";
import { ReactComponent as HomeIcon } from "../../assets/dfu/icons/home-2.svg";
import { ReactComponent as BookIcon } from "../../assets/dfu/icons/book.svg";
import { ReactComponent as UploadPhotoIcon } from "../../assets/dfu/icons/gallery-add-bulk.svg";
import { ReactComponent as ProcessorIcon } from "../../assets/dfu/icons/cpu.svg";
import { ReactComponent as CompletedIcon } from "../../assets/dfu/icons/task-square.svg";
import {
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
} from "@mui/material";
import Button from "./Button";

const StyledStepWrapper = styled.div`
  min-height: 470px;
  width: 900px;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;

  .buttonWrapper {
    margin-top: auto;
    display: flex;
    gap: 1rem;
  }
`;

const ColorlibConnector = muiStyled(StepConnector)(({ theme }) => ({
  marginLeft: 22,
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#E2E2E2",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#178DC2",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    width: 3,
    height: 25,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = muiStyled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "white",
  zIndex: 1,
  color: "#178DC2",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  border: "4px solid #D3D3D3",
  ...(ownerState.active && {
    backgroundColor: "#178DC2",
    color: "white",
    border: "4px solid #178DC2",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#BABABA",
    color: "white",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <HomeIcon />,
    2: <BookIcon />,
    3: <UploadPhotoIcon />,
    4: <ProcessorIcon />,
    5: <CompletedIcon />,
    6: <CompletedIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

const StepWrapper = ({
  children,
  setCurrentStep,
  currentStep,
  photo,
  result,
  isPredicting,
  getPrediction,
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === children.length - 1;
  const incrementStep = () => {
    if (currentStep === 2 && !result) return;
    setCurrentStep((currentStep) => currentStep + 1);
  };
  const decrementStep = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  let showBack = false;
  if (!isFirstStep) {
    showBack = true;
    if (isPredicting || currentStep >= 3) showBack = false;
  }

  let showNext = false;
  if (!isLastStep) {
    showNext = true;
    if (currentStep === 2 || currentStep === 3) showNext = false;
  }
console.log(photo, currentStep, result)
  let showStartTest = photo && !result && currentStep === 2 ? true : false;

  return (
    <Wrapper>
      <StyledStepWrapper>
        {children[currentStep]}
        <div className="buttonWrapper">
          {showBack && (
            <Button
              reversed
              onClick={decrementStep}
              color="#71848C"
              text="white"
              Icon={BackIcon}
            >
              Back
            </Button>
          )}
          {showStartTest && (
            <Button
              onClick={() => {
                getPrediction(photo);
              }}
              color="#178dc2"
              Icon={NextIcon}
              text="white"
            >
              Start Test
            </Button>
          )}
          {showNext && (
            <Button
              onClick={incrementStep}
              color="#178dc2"
              Icon={NextIcon}
              text="white"
            >
              Next
            </Button>
          )}
        </div>
      </StyledStepWrapper>
      <Stepper
        activeStep={currentStep}
        orientation="vertical"
        connector={<ColorlibConnector />}
      >
        {children.map((child) => (
          <Step key={child.props.label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {child.props.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Wrapper>
  );
};

export default StepWrapper;
