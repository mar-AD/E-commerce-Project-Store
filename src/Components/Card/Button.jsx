// import Styles from "./button.css";

const buttonStyles = {
  backgroundColor: "#0094ff",
  color: "#fff",
  border: "none",
  outline: "none",
  fontSize: "1.2rem",
  borderRadius: "10px",
  padding: "11px 1rem",
  width: "7.5rem",
};

function Button({ text }) {
  return <button style={buttonStyles}>{text}</button>;
}

export default Button;
