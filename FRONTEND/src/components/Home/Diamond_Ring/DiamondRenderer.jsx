import React, { useEffect, useRef, useContext } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { Context } from "../../../utils/context";

const DiamondRing = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const animationStarted = useRef(false); // Ref to track animation state

  const { model, setModel } = useContext(Context); // Access model and setModel from context

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 220;
    camera.position.y = 100;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;
    controls.enableZoom = false;

    const group = new THREE.Group();
    scene.add(group);

    let sampler = null;
    let paths = [];
    let pathsCompleted = false; // Flag to check if paths are complete

    // Define the Path class before using it
    const tempPosition = new THREE.Vector3();
    const materials = [
      new THREE.LineBasicMaterial({
        color: 0xf1e5ac,
        transparent: true,
        opacity: 0.5,
      }),
      new THREE.LineBasicMaterial({
        color: 0xe8e4c9,
        transparent: true,
        opacity: 0.5,
      }),
      new THREE.LineBasicMaterial({
        color: 0xeee8aa,
        transparent: true,
        opacity: 0.5,
      }),
      new THREE.LineBasicMaterial({
        color: 0xede275,
        transparent: true,
        opacity: 0.5,
      }),
    ];

    class Path {
      constructor(index) {
        this.geometry = new THREE.BufferGeometry();
        this.material = materials[index % 4];
        this.line = new THREE.Line(this.geometry, this.material);
        this.vertices = [];
        this.updateVertex();
        this.previousPoint = tempPosition.clone();
      }

      updateVertex() {
        sampler.sample(tempPosition);
        this.vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
      }

      update() {
        if (pathsCompleted) return;

        let pointFound = false;
        while (!pointFound) {
          sampler.sample(tempPosition);
          const distance = tempPosition.distanceTo(this.previousPoint);
          const maxDistance = 0.03;

          if (distance < maxDistance) {
            this.vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
            this.previousPoint = tempPosition.clone();
            pointFound = true;
          }
        }
        if (this.vertices.length >= 10000) {
          pathsCompleted = true;
        }
        this.geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(this.vertices, 3)
        );
      }
    }

    // Check if the model is already loaded in the context
    if (model) {
      addModelToScene(model);
    } else {
      // Load the model and set it to context if not loaded
      new OBJLoader().load(
        "/models/diamond_ring3.obj",
        (obj) => {
          setModel(obj); // Store the loaded model in the context
          addModelToScene(obj);
        },
        (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
        (err) => console.error(err)
      );
    }

    function addModelToScene(obj) {
      while (group.children.length > 0) {
        group.remove(group.children[0]);
      }

      const mesh = obj.children[0];
      if (mesh && mesh.geometry && mesh.geometry.isBufferGeometry) {
        sampler = new MeshSurfaceSampler(mesh).build();
        for (let i = 0; i < 4; i++) {
          const path = new Path(i);
          paths.push(path);
          group.add(path.line);
        }

        const scaleFactor = 400;
        group.scale.set(scaleFactor, scaleFactor, scaleFactor);
        group.position.set(0, -30, 0);
      } else {
        console.error("Mesh or BufferGeometry not found in the loaded object.");
      }
    }

    function render() {
      if (!animationStarted.current) return;

      group.rotation.y += 0.002;

      if (!pathsCompleted) {
        paths.forEach((path) => {
          path.update();
        });
      }

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize, false);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animationStarted.current) {
          animationStarted.current = true;
          render(); // Start the animation when the component is in view
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    sceneRef.current = { scene, camera, renderer, controls, group, paths };

    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
      observer.disconnect();
      if (
        containerRef.current &&
        containerRef.current.contains(renderer.domElement)
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [model]); // Use model as a dependency

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default DiamondRing;
