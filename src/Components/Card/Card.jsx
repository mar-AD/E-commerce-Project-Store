import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Button from "./Button";
import ''

// const cardStyles = {
//   display: "flex",
//   // border: "solid",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   backgroundColor: "bisque",
//   width: "19rem",
//   height: "20rem",
//   padding: "2rem",
//   borderRadius: "10px",
// };

// const imageStyles = {
//   // marginTop: "-20%",
//   width: "100%",
//   height: "100%",
//   borderRadius: "20px",
// };
// if (window.innerWidth <= 768) {
//   cardStyles.width = "10px";
//   cardStyles.height = "10px";
//   imageStyles.width = "10px";
//   imageStyles.height = "10px";
// }
// const h2Styles = {
//   margin: 0,
//   marginTop: "1rem",
// };

function Card({ imagen }) {
  const [show, setShown] = useState(false);

  // const props3 = useSpring({
  //   transform: show ? "scale(1.03)" : "scale(1)",
  //   boxShadow: show
  //     ? "0 20px 25px rgb(0 0 0 / 25%)"
  //     : "0 2px 10px rgb(0 0 0 / 8%)",
  // });

  return (
    <animated.div
      style={{ ...cardStyles, ...props3 }}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img
        src={imagen}
        alt=""
        style={imageStyles}
      />
    </animated.div>
  );
}

export default Card;
