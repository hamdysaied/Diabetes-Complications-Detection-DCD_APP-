import { useState } from "react";
import styled from "styled-components";

const StyledPatientForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding-top: 1rem;
  width: 50%;
  @media (max-width: 800px) {
    width: 100%;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  label {
    font-size: 1rem;
  }
  input {
    ::placeholder {
      opacity: 0.6;
    }
    border: none;
    border-radius: 0.2rem;
    padding: 0.8rem;
    background-color: #fff;
    width: 100%;
  }
`;
const PatientForm = ({ setdone }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nationalID, setNationalID] = useState("");

  const handleInputChange = (e, setData) => {
    setData(e.target.value);
  };

  const handleSubmit = async () => {
    const data = { name, phone, national_id: nationalID, address: "test" };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    let res = await fetch("http://localhost:3001/patients", options);
    console.log(await res.json());
  };
  return (
    <StyledPatientForm
      id="patientForm"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        setdone(true);
      }}
    >
      <div>
        <label htmlFor="">Name</label>
        <input
          type="text"
          placeholder="Mostafa Gouda"
          name=""
          id=""
          value={name}
          onChange={(e) => {
            handleInputChange(e, setName);
          }}
        />
      </div>
      <div>
        <label htmlFor="">Age</label>
        <input
          type="number"
          placeholder="21"
          name=""
          id=""
          value={age}
          onChange={(e) => {
            handleInputChange(e, setAge);
          }}
        />
      </div>
      <div>
        <label htmlFor="">Phone Number</label>
        <input
          type="text"
          placeholder="0172 2823 929"
          name=""
          id=""
          value={phone}
          onChange={(e) => {
            handleInputChange(e, setPhone);
          }}
        />
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input
          type="text"
          placeholder="example@email.com"
          name=""
          id=""
          value={email}
          onChange={(e) => {
            handleInputChange(e, setEmail);
          }}
        />
      </div>
      <div>
        <label htmlFor="">National ID</label>
        <input
          type="text"
          placeholder="2345678954374"
          name=""
          id=""
          value={nationalID}
          onChange={(e) => {
            handleInputChange(e, setNationalID);
          }}
        />
      </div>
    </StyledPatientForm>
  );
};

export default PatientForm;
