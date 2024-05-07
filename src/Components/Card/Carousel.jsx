import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";

export default function Carroussel(props) {
  const table = props.cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
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
      clearInterval(interval);
    };
  }, [autoplay, props.cards.length]);

  return (
    <div
    onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
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
