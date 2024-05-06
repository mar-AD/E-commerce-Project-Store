import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";

export default function Carroussel(props) {
  const table = props.cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(0); // Initial slide index is set to 0
  const [autoplay, setAutoplay] = useState(true); // Autoplay state
  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoplay) {
        setGoToSlide((prev) => (prev + 1) % props.cards.length);
      }
    }, 2000);
    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
    };
  }, [autoplay, props.cards.length]);

  return (
    <div
    onMouseEnter={() => setAutoplay(false)} // Pause on hover
      onMouseLeave={() => setAutoplay(true)}  // Resume on mouse leave
      style={{ width: props.width, height: props.height, margin: props.margin }}
    >
      <Carousel
      pauseOnHover
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
    </div>
  );
}
