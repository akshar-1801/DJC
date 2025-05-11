import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./About.module.css";

function AboutUs() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [visibleElements, setVisibleElements] = useState({
    heading: false,
    p1: false,
    p2: false,
    p3: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height =
        width < 768 ? window.innerHeight * 0.46 : window.innerHeight;
      setCanvasSize({ width, height });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const images = useMemo(() => {
    const loadedImages = [];
    for (let i = 0; i <= 124; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(5, "0"); // Ensures zero-padding to 5 digits
      img.src = `/Scroller/scroller-ring_${paddedIndex}.webp`; // Adjusted path and naming
      loadedImages.push(img);
    }
    return loadedImages;
  }, []);

  const render = useCallback(
    (index) => {
      if (images[index - 1] && canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        const canvas = canvasRef.current;

        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const img = images[index - 1];
          const imgAspectRatio = img.width / img.height;
          const canvasAspectRatio = canvas.width / canvas.height;

          let drawWidth, drawHeight, offsetX, offsetY;

          if (imgAspectRatio > canvasAspectRatio) {
            drawHeight = canvas.height;
            drawWidth = canvas.height * imgAspectRatio;
            offsetX = 0;
            offsetY = 0;
          } else {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgAspectRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
          }

          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
      }
    },
    [images]
  );

  const currentIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [1, images.length]
  );

  useMotionValueEvent(currentIndex, "change", (latest) => {
    render(Math.floor(latest));

    // Show elements based on scroll progress
    const progress = latest / images.length;
    setVisibleElements({
      heading: progress > 0.5,
      p1: progress > 0.7,
      p2: progress > 0.8,
      p3: progress > 0.9,
    });
  });

  useEffect(() => {
    render(1);
  }, [render, canvasSize]);

  return (
    <div className={styles.container}>
      <div ref={containerRef} className={styles.wrapper}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          style={{ height: `${canvasSize.height}px` }}
          width={canvasSize.width}
          height={canvasSize.height}
        />

        <div className={styles.textContainer}>
          <h2
            className={`${styles.heading} ${
              visibleElements.heading ? styles.visible : ""
            }`}
          >
            About Our Company
          </h2>
          <p
            className={`${styles.paragraph} ${
              visibleElements.p1 ? styles.visible : ""
            }`}
          >
            We are a forward-thinking technology company dedicated to pushing
            the boundaries of innovation. With over a decade of experience,
            we've consistently delivered cutting-edge solutions to our global
            clientele.
          </p>
          <p
            className={`${styles.paragraph} ${
              visibleElements.p2 ? styles.visible : ""
            }`}
          >
            Our team of experts brings together diverse skills and perspectives,
            allowing us to tackle complex challenges with creative solutions.
          </p>
          <p
            className={`${styles.paragraph} ${
              visibleElements.p3 ? styles.visible : ""
            }`}
          >
            We believe in sustainable growth, ethical practices, and creating
            lasting value for our stakeholders and communities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
