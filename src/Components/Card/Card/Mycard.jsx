// Card.js

import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "./Card.css"; // Import the CSS file

function Card({ imagen }) {
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
  });

  return (
    <animated.div
      className="cardy" // Add the CSS class here
      style={{ ...props3 }}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img
        src={imagen}
        alt=""
      />
    </animated.div>
  );
}

export default Card;
