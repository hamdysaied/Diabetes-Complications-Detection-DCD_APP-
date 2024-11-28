import styled from "styled-components";

import BloodSugarIllustarion from "../../assets/ret/blood-sugar.png";
import BodyIllustration from "../../assets/ret/body.png";
import TestIllustarion from "../../assets/ret/test.png";
import BloodVesselIllustarion from "../../assets/ret/blood-vessel.png";
import EyeIllustarion from "../../assets/ret/eye.png";

const advice = [
  {
    text: "Monitor their blood sugar level",
    image: BloodSugarIllustarion,
  },
  {
    text: "Manage their diabetes",
    image: BodyIllustration,
  },
  {
    text: "Perform glycosylated hemoglobin test regularly",
    image: TestIllustarion,
  },
  {
    text: "Keep their blood pressure and cholesterol under control",
    image: BloodVesselIllustarion,
  },
  {
    text: "Pay attention to vision changes",
    image: EyeIllustarion,
  },
];

const StyledAdviceCard = styled.div`
  max-width: 400px;
  min-height: 35px;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1rem;
  background-color: white;
  border-radius: 0.5rem;
  img {
    width: 40px;
  }
`;

const StyledAdviceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const AdviceCard = ({ illustration, advice, className }) => {
  return (
    <StyledAdviceCard className={className}>
      <img src={illustration} alt="" />
      <div className="advice">{advice}</div>
    </StyledAdviceCard>
  );
};

const AdviceList = () => {
  return (
    <StyledAdviceList>
      {advice.map((singleAdvice, i) => {
        return (
          <AdviceCard
            key={i}
            illustration={singleAdvice.image}
            advice={singleAdvice.text}
          />
          //   <img src={singleAdvice.image} alt="" srcset="" />
        );
      })}
    </StyledAdviceList>
  );
};

export default AdviceList;
