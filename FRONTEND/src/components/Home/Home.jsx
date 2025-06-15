import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { useNavigate } from "react-router-dom";
import djc_bg_logo from "../../assets/temp0_bgless.png";
import DiamondRing from "./Diamond_Ring/DiamondRenderer";

const Home = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const pointsRef = useRef(null);
  const animationIdRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitialized) {
      initScene();
      setIsInitialized(true);
    } else {
      // If already initialized, just restart the render loop
      if (rendererRef.current && composerRef.current) {
        renderLoop();
      }
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isInitialized]);

  const initScene = () => {
    const scene = new THREE.Scene();
    // Remove or comment out the background color setting to allow transparency
    // scene.background = new THREE.Color(0x000010);
    sceneRef.current = scene;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "high-performance",
      alpha: true, // Enable transparency
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const camera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.set(34, 40, -20);
    scene.add(camera);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    setupControls(controls);
    controlsRef.current = controls;

    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    composerRef.current = composer;

    window.addEventListener("resize", handleResize);

    loadDiamond();
    introAnimation();
  };

  const loadDiamond = () => {
    const dracoLoader = new DRACOLoader();
    const loader = new GLTFLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    dracoLoader.setDecoderConfig({ type: "js" });
    loader.setDRACOLoader(dracoLoader);
    console.log("loaded the diamond");

    loader.load("/models/diamond.glb", (gltf) => {
      let sampler;
      gltf.scene.traverse((obj) => {
        if (obj.isMesh) {
          sampler = new MeshSurfaceSampler(obj).build();
        }
      });
      if (sampler) {
        createPoints(sampler);
      }
    });
  };

  const createPoints = (sampler) => {
    const pointsGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const tempPosition = new THREE.Vector3();

    for (let i = 0; i < 3000; i++) {
      sampler.sample(tempPosition);
      vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
    }

    pointsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    const pointsMaterial = new THREE.PointsMaterial({
      // color: 0x4ee2ec,
      color: 0xfcce16,
      size: 0.3,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
      sizeAttenuation: true,
      alphaMap: new THREE.TextureLoader().load(
        "/models/particle-texture.jpg",
        (texture) => {
          texture.minFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
        }
      ),
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    sceneRef.current.add(points);
    pointsRef.current = points;
  };

  const setupControls = (controls) => {
    controls.enableRotate = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;
  };

  const introAnimation = () => {
    if (controlsRef.current && cameraRef.current) {
      controlsRef.current.enabled = false;
      new TWEEN.Tween(cameraRef.current.position.set(-1, -0.1, 0))
        .to({ x: 2, y: -0.9, z: 5 }, 6500)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
        .onComplete(() => {
          if (controlsRef.current) {
            controlsRef.current.enabled = true;
            setOrbitControlsLimits();
          }
          const titleElement = document.querySelector(".main--title");
          if (titleElement) {
            titleElement.classList.add("ended");
          }
        });
    }
  };

  const setOrbitControlsLimits = () => {
    if (controlsRef.current) {
      controlsRef.current.enableDamping = true;
      controlsRef.current.dampingFactor = 0.04;
      controlsRef.current.minDistance = 0.5;
      controlsRef.current.maxDistance = 9;
      controlsRef.current.enableRotate = true;
      controlsRef.current.autoRotate = true;
    }
  };

  const handleResize = () => {
    if (cameraRef.current && rendererRef.current && composerRef.current) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
      composerRef.current.setSize(width, height);
    }
  };

  const renderLoop = () => {
    TWEEN.update();
    if (controlsRef.current) {
      controlsRef.current.update();
    }
    if (composerRef.current) {
      composerRef.current.render();
    }
    animationIdRef.current = requestAnimationFrame(renderLoop);
  };

  const handleBuyNowClick = () => {
    navigate("/products");
  };

  const handlePersonlize = () => {
    navigate("/personalize");
  };

  const handleUploadIdea = () => {
    navigate("/uploadIdea");
  };

  return (
    <section id="home">
      <div className="main--container" ref={containerRef}>
        <h1 className="main--title"></h1>
        <div className="logo-bg">
          {/* <img src={djc_bg_logo} alt="hel" /> */}
        </div>
      </div>

      <div className="container">
        <h1>Diamond Jewellery Company</h1>
        <h3>
          Step into a world of luxury with our exquisite selection of diamond
          and gold jewellery. Each piece is a masterpiece, crafted with
          precision and passion to elevate your style and make every moment
          unforgettable. Begin your journey to brilliance now.
        </h3>
        <button className="button-74" role="button" onClick={handleBuyNowClick}>
          BUY NOW
        </button>
        <div className="custom">
          <div className="diamond-cont">
            <DiamondRing />
          </div>
          <div className="left">
            <h1>Personalize Your Sparkle</h1>
            <p>
              Explore our custom jewellery design studio and craft personalized
              rings, necklaces, bracelets, or earrings with ease. Start by
              selecting your base metal and style, add your choice of gemstones,
              and customize with settings and engravings. Our intuitive design
              tool makes the process simple and fun.
            </p>
            <h3>Have a Design in Mind?</h3>
            <p>
              Upload an image of your desired jewellery, and our skilled
              artisans will bring it to life with impeccable craftsmanship.
            </p>
            <button
              className="button-74"
              role="button"
              onClick={handlePersonlize}
            >
              Personalize
            </button>
            <button
              className="button-74"
              role="button"
              onClick={handleUploadIdea}
            >
              Upload Image
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
