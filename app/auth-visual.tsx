"use client";

import { useEffect, useRef } from "react";

function randomInteger(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function makeEquation() {
  const a = randomInteger(2, 9);
  const b = randomInteger(1, 9);
  const c = randomInteger(2, 9);

  switch (randomInteger(0, 5)) {
    case 0:
      return `${a}x + ${b} = ${a * c + b}`;
    case 1:
      return `${a} × ${b} = ${a * b}`;
    case 2:
      return `${a} + ${b} = ${a + b}`;
    case 3:
      return `${a * c + b} − ${b} = ${a * c}`;
    case 4:
      return `${a} × (${b} + ${c}) = ${a * (b + c)}`;
    default:
      return `${a}x − ${b} = ${a * c - b}`;
  }
}

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
        camera.position.set(0, 0, 10);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        element.appendChild(renderer.domElement);
        scene.add(new THREE.AmbientLight(0xffffff, 2.2));
        const light = new THREE.DirectionalLight(0xffffff, 2.5);
        light.position.set(-3, 5, 8);
        scene.add(light);

        const colors = [0x62c934, 0x8399ef, 0xf0ae42, 0xe8867a, 0x70bd9f, 0x78afe6, 0xa88bd0];
        const recent = new Set<string>();
        let colorOffset = 0;

        function nextEquation() {
          let equation = makeEquation();
          while (recent.has(equation)) equation = makeEquation();
          recent.add(equation);
          if (recent.size > 24) recent.delete(recent.values().next().value!);
          return equation;
        }

        function makeGroup(equation: string) {
          const group = new THREE.Group();
          let cursor = 0;
          for (const character of equation) {
            const size = character === " " ? 1 : 0.86 + Math.random() * 0.32;
            const advance = font.getAdvanceWidth(character, 1) * size;
            if (character !== " ") {
              const outline = font.getPath(character, 0, 0, 1);
              const path = new THREE.ShapePath();
              for (const command of outline.commands) {
                if (command.type === "M") path.moveTo(command.x, -command.y);
                if (command.type === "L") path.lineTo(command.x, -command.y);
                if (command.type === "Q") path.quadraticCurveTo(command.x1, -command.y1, command.x, -command.y);
                if (command.type === "C") path.bezierCurveTo(command.x1, -command.y1, command.x2, -command.y2, command.x, -command.y);
                if (command.type === "Z") path.currentPath?.closePath();
              }
              const geometry = new THREE.ExtrudeGeometry(path.toShapes(), {
                depth: 0.32,
                bevelEnabled: true,
                bevelThickness: 0.055,
                bevelSize: 0.035,
                bevelSegments: 3,
                curveSegments: 10,
              });
              const material = new THREE.MeshStandardMaterial({
                color: colors[colorOffset % colors.length],
                roughness: 0.48,
                metalness: 0.03,
                transparent: true,
              });
              colorOffset += 1;
              const mesh = new THREE.Mesh(geometry, material);
              mesh.position.x = cursor;
              mesh.scale.setScalar(size);
              mesh.userData.motion = {
                phase: Math.random() * Math.PI * 2,
                speed: 0.65 + Math.random() * 0.35,
                tilt: Math.random() * 0.25 + 0.12,
                exitAngle: Math.random() * Math.PI * 2,
                entryAngle: Math.random() * Math.PI * 2,
                stagger: Math.random() * 0.14,
                homeY: (Math.random() - 0.5) * 0.24,
                homeZ: (Math.random() - 0.5) * 0.45,
                impulseAge: -1,
                impulseX: 0,
                impulseY: 0,
              };
              group.add(mesh);
            }
            cursor += advance + 0.06 + Math.random() * 0.045;
          }
          for (const child of group.children) {
            child.position.x -= cursor / 2;
            child.userData.motion.homeX = child.position.x;
          }
          const scale = Math.min(1.18, 4.4 / cursor);
          group.scale.setScalar(scale);
          group.position.y = -0.34;
          scene.add(group);
          return group;
        }

        function removeGroup(group: import("three").Group) {
          scene.remove(group);
          for (const child of group.children) {
            const mesh = child as import("three").Mesh;
            mesh.geometry.dispose();
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((material) => material.dispose());
          }
        }

        let current = makeGroup(nextEquation());
        let incoming: import("three").Group | null = null;
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let frame = 0;
        let previous = 0;
        let elapsed = 0;
        const holdDuration = 5.5;
        const transitionDuration = 3.6;

        function smooth(value: number) {
          const progress = Math.max(0, Math.min(1, value));
          return progress * progress * (3 - 2 * progress);
        }

        function moveCharacters(group: import("three").Group, time: number, delta: number, transition: number, arriving: boolean) {
          for (const child of group.children) {
            const motion = child.userData.motion;
            const phase = time * motion.speed + motion.phase;
            const amount = arriving
              ? 1 - smooth((transition - 0.35 - motion.stagger) / 0.48)
              : smooth((transition - motion.stagger) / 0.48);
            const angle = arriving ? motion.entryAngle : motion.exitAngle;
            if (motion.impulseAge >= 0) motion.impulseAge += delta;
            const impulse = motion.impulseAge >= 0 && motion.impulseAge < 2.8
              ? Math.sin(Math.PI * motion.impulseAge / 2.8)
              : 0;
            if (motion.impulseAge >= 2.8) motion.impulseAge = -1;
            const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
            const travel = (Math.hypot(viewHeight * camera.aspect, viewHeight) / 2 + 3) / group.scale.x;
            child.position.x = motion.homeX + Math.cos(phase * 0.8) * 0.035 + Math.cos(angle) * travel * amount + motion.impulseX * impulse;
            child.position.y = motion.homeY + Math.sin(phase) * 0.11 + Math.sin(angle) * travel * amount + motion.impulseY * impulse;
            child.position.z = motion.homeZ + Math.cos(phase * 0.7) * 0.08 + impulse * 0.3;
            child.rotation.x = Math.sin(phase * 0.75) * motion.tilt + impulse * 0.28;
            child.rotation.y = Math.sin(phase * 0.6) * motion.tilt * 1.4 + amount * Math.cos(angle) * 0.7 + impulse * 0.55;
            child.rotation.z = Math.sin(phase * 0.5) * 0.08 + amount * Math.sin(angle) * 0.4;
            const material = (child as import("three").Mesh).material as import("three").MeshStandardMaterial;
            material.opacity = 1 - smooth((amount - 0.35) / 0.65);
          }
        }

        function settleCharacters(group: import("three").Group) {
          for (const child of group.children) {
            const motion = child.userData.motion;
            child.position.set(motion.homeX, motion.homeY, motion.homeZ);
            child.rotation.set(0, 0, 0);
            (child as import("three").Mesh<import("three").BufferGeometry, import("three").MeshStandardMaterial>).material.opacity = 1;
          }
        }

        const resize = () => {
          const width = element.clientWidth;
          const height = element.clientHeight;
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.position.z = camera.aspect < 0.8 ? 12 : 10;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };

        const animate = (time: number) => {
          if (disposed || motion.matches) return;
          const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
          previous = time;
          elapsed += delta;
          if (elapsed >= holdDuration && !incoming) incoming = makeGroup(nextEquation());

          if (incoming) {
            const progress = Math.min((elapsed - holdDuration) / transitionDuration, 1);
            moveCharacters(current, elapsed, delta, progress, false);
            moveCharacters(incoming, elapsed, delta, progress, true);
            if (progress >= 1) {
              removeGroup(current);
              current = incoming;
              incoming = null;
              elapsed = 0;
            }
          } else {
            moveCharacters(current, elapsed, delta, 0, false);
          }
          renderer.render(scene, camera);
          frame = requestAnimationFrame(animate);
        };

        const updateMotion = () => {
          cancelAnimationFrame(frame);
          previous = 0;
          if (!motion.matches) {
            frame = requestAnimationFrame(animate);
          } else {
            if (incoming) {
              removeGroup(incoming);
              incoming = null;
            }
            settleCharacters(current);
            elapsed = 0;
            renderer.render(scene, camera);
          }
        };
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const onPointerDown = (event: PointerEvent) => {
          if (motion.matches || incoming || event.button !== 0) return;
          const bounds = renderer.domElement.getBoundingClientRect();
          pointer.set(
            ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
            -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
          );
          raycaster.setFromCamera(pointer, camera);
          const hit = raycaster.intersectObjects(current.children, false)[0];
          if (!hit) return;
          const characterMotion = hit.object.userData.motion;
          const angle = Math.random() * Math.PI * 2;
          characterMotion.impulseX = Math.cos(angle) * 1.5;
          characterMotion.impulseY = Math.sin(angle) * 1.5;
          characterMotion.impulseAge = 0;
          elapsed = Math.min(elapsed, holdDuration - 3);
        };
        renderer.domElement.addEventListener("pointerdown", onPointerDown);
        const observer = new ResizeObserver(resize);
        observer.observe(element);
        motion.addEventListener("change", updateMotion);
        resize();
        updateMotion();

        cleanup = () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          motion.removeEventListener("change", updateMotion);
          renderer.domElement.removeEventListener("pointerdown", onPointerDown);
          removeGroup(current);
          if (incoming) removeGroup(incoming);
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        // The page remains usable if the font or WebGL is unavailable.
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
