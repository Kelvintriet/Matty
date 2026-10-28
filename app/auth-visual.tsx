"use client";

import { useEffect, useRef } from "react";

export default function AuthVisual() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let disposed = false;
    let cleanup = () => {};

    async function setup() {
      try {
        const THREE = await import("three");
        if (disposed || !element) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.set(0, 0, 7);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        element.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);
        const geometry = new THREE.IcosahedronGeometry(1.38, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x65cf32, roughness: 0.42, metalness: 0.08, flatShading: true });
        const shape = new THREE.Mesh(geometry, material);
        group.add(shape);

        const edgeGeometry = new THREE.EdgesGeometry(geometry);
        const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xd6ffc9, transparent: true, opacity: 0.65 });
        group.add(new THREE.LineSegments(edgeGeometry, edgeMaterial));

        const orbitGeometry = new THREE.TorusGeometry(2.1, 0.012, 8, 100);
        const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x93de70, transparent: true, opacity: 0.8 });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.set(1.15, 0.15, -0.35);
        scene.add(orbit);
        const orbit2 = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit2.rotation.set(0.8, 1, 0.7);
        scene.add(orbit2);
        scene.add(new THREE.AmbientLight(0xffffff, 2));
        const light = new THREE.DirectionalLight(0xffffff, 3);
        light.position.set(3, 5, 5);
        scene.add(light);
        group.rotation.set(0.25, 0.35, 0.05);

        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let frame = 0;
        const resize = () => {
          const width = element.clientWidth;
          const height = element.clientHeight;
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
        const animate = () => {
          if (disposed || motion.matches) return;
          group.rotation.y += 0.0025;
          group.rotation.x += 0.0008;
          orbit.rotation.z += 0.001;
          renderer.render(scene, camera);
          frame = requestAnimationFrame(animate);
        };
        const updateMotion = () => {
          cancelAnimationFrame(frame);
          if (!motion.matches) animate();
          else renderer.render(scene, camera);
        };
        const observer = new ResizeObserver(resize);
        observer.observe(element);
        motion.addEventListener("change", updateMotion);
        resize();
        updateMotion();

        cleanup = () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          motion.removeEventListener("change", updateMotion);
          geometry.dispose();
          material.dispose();
          edgeGeometry.dispose();
          edgeMaterial.dispose();
          orbitGeometry.dispose();
          orbitMaterial.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        // The decorative CSS fallback stays visible if WebGL is unavailable.
      }
    }

    void setup();
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div className="auth-art-canvas" ref={container} aria-hidden="true" />;
}
