import { useState, useEffect } from "react";

const useWindowWidth = () => {
  const [width, setWidth] = useState();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setWidth(window.innerWidth);
      }
    };
    window.addEventListener("resize", () => {
      handleResize();
    });
    window.removeEventListener("resize", () => {
      handleResize();
    });
  });
  return width;
};

export { useWindowWidth };
