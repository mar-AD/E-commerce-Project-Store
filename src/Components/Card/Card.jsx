import React, { useState } from "react";
import { animated } from "react-spring";

function Card({ imagen }) {
  const [show, setShown] = useState(false);
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
