import React, { useEffect, useState } from "react";

export default function ScrollAnimation() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const offset = 500; // Adjust this value to determine when the animation should trigger

      if (scrollTop > offset) {
        setShowAnimation(true);
      } else {
        setShowAnimation(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`my-element ${showAnimation ? "animate" : ""}`}>
      {/* Your content */}
    </div>
  );
}
