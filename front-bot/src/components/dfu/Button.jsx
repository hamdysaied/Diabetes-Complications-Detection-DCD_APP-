import styled from "styled-components";

const StyledButton = styled.button`
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
  background-color: ${(props) => props.color || "white"};
  padding: 0.6rem 1rem;
  color: ${(props) => props.text || "black"};
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  svg path {
    fill: ${(props) => props.iconColor || "currentColor"};
  }
  &:hover {
    opacity: 0.9;
  }
`;

const StyledButton2 = styled.div`
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
  background-color: ${(props) => props.color || "white"};
  padding: 0.6rem 1rem;
  color: ${(props) => props.text || "black"};
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  svg path {
    fill: ${(props) => props.iconColor || "currentColor"};
  }
  &:hover {
    opacity: 0.9;
  }
`;

const Button = ({
  color,
  children,
  Icon,
  reversed,
  upload,
  text,
  setPhoto,
  setPhotoUrl,
  ...other
}) => {
  if (upload) {
    return (
      <label style={{ display: "flex" }}>
        <StyledButton2 color={color} text={text} className="UploadButton">
          {reversed && <Icon className="buttonIcon" />}
          {children}
          {!reversed && <Icon className="buttonIcon" />}
        </StyledButton2>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              let file = e.target.files[0];
              setPhoto(file)
              setPhotoUrl(URL.createObjectURL(file))
              // const reader = new FileReader();
              // reader.onabort = () => console.log("file reading was aborted");
              // reader.onerror = () => console.log("file reading has failed");
              // reader.onload = () => {
              //   const photoURL = reader.result;
              //   setPhoto(new File([photoURL], file.name));
              // };
              // reader.readAsArrayBuffer(file);
            }
          }}
          name=""
          id="upload"
          style={{ display: "none" }}
        />
      </label>
    );
  }
  return (
    <StyledButton color={color} text={text} {...other}>
      {reversed && Icon && <Icon className="buttonIcon" />}
      {children}
      {!reversed && Icon && <Icon className="buttonIcon" />}
    </StyledButton>
  );
};

export default Button;
