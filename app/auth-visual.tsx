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
        const [THREE, opentype, response] = await Promise.all([
          import("three"),
          import("opentype.js"),
          fetch("/fonts/math-bold.ttf"),
        ]);
        if (!response.ok) throw new Error("Font unavailable");
        const font = opentype.parse(await response.arrayBuffer());
        if (disposed || !element) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.set(0, 0, 11);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        element.appendChild(renderer.domElement);

        const characters = [
          { value: "2", color: 0x62c934, x: -1.8, y: 1.65, z: 0.3, size: 1.25, speed: 0.33 },
          { value: "π", color: 0x8399ef, x: 0.2, y: 1.9, z: -0.3, size: 1.1, speed: -0.26 },
          { value: "+", color: 0xf4bb55, x: 2, y: 1.25, z: 0.3, size: 1.05, speed: 0.29 },
          { value: "7", color: 0xf28f83, x: 1.25, y: -0.25, z: 0.5, size: 1.45, speed: -0.3 },
          { value: "=", color: 0x8bcfbb, x: -1.15, y: -0.25, z: -0.2, size: 1.0, speed: 0.23 },
          { value: "3", color: 0x79bceb, x: -2, y: -1.65, z: 0, size: 1.1, speed: -0.22 },
          { value: "×", color: 0xb095d9, x: 0.15, y: -1.8, z: 0.25, size: 1.1, speed: 0.31 },
          { value: "5", color: 0x78c95c, x: 2, y: -1.85, z: -0.4, size: 1.0, speed: -0.27 },
        ];
        const meshes = characters.map((item, index) => {
          const outline = font.getPath(item.value, 0, 0, 1);
          const path = new THREE.ShapePath();
          for (const command of outline.commands) {
            if (command.type === "M") path.moveTo(command.x, -command.y);
            if (command.type === "L") path.lineTo(command.x, -command.y);
            if (command.type === "Q") path.quadraticCurveTo(command.x1, -command.y1, command.x, -command.y);
            if (command.type === "C") path.bezierCurveTo(command.x1, -command.y1, command.x2, -command.y2, command.x, -command.y);
            if (command.type === "Z") path.currentPath?.closePath();
          }
          const geometry = new THREE.ExtrudeGeometry(path.toShapes(), {
            depth: 0.14,
            bevelEnabled: true,
            bevelThickness: 0.035,
            bevelSize: 0.025,
            bevelSegments: 3,
            curveSegments: 16,
          });
          geometry.computeBoundingBox();
          geometry.center();
          const material = new THREE.MeshStandardMaterial({ color: item.color, roughness: 0.48, metalness: 0.03 });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(item.x, item.y, item.z);
          mesh.scale.setScalar(item.size);
          mesh.rotation.set(0.12 * (index % 3 - 1), 0.18 * (index % 2 ? 1 : -1), 0.16 * (index % 3 - 1));
          scene.add(mesh);
          return { mesh, geometry, material, item, phase: index * 1.2 };
        });

        scene.add(new THREE.AmbientLight(0xffffff, 2.2));
        const light = new THREE.DirectionalLight(0xffffff, 2.5);
        light.position.set(-3, 5, 8);
        scene.add(light);

        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let frame = 0;
        let previous = 0;
        let elapsed = 0;
        const resize = () => {
          const width = element.clientWidth;
          const height = element.clientHeight;
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.position.z = width / height < 0.8 ? 13 : 11;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
        const animate = (time: number) => {
          if (disposed || motion.matches) return;
          const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
          previous = time;
          elapsed += delta;
          for (const { mesh, item, phase } of meshes) {
            mesh.rotation.y += item.speed * delta;
            mesh.rotation.x = Math.sin(elapsed * 0.45 + phase) * 0.18;
            mesh.position.y = item.y + Math.sin(elapsed * 0.7 + phase) * 0.12;
          }
          renderer.render(scene, camera);
          frame = requestAnimationFrame(animate);
        };
        const updateMotion = () => {
          cancelAnimationFrame(frame);
          previous = 0;
          if (!motion.matches) frame = requestAnimationFrame(animate);
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
          for (const { geometry, material } of meshes) {
            geometry.dispose();
            material.dispose();
          }
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        // The quiet fallback remains if the font or WebGL is unavailable.
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
