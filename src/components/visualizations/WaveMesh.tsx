"use client";

import { useEffect, useRef } from "react";

export function WaveMesh({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let rafId = 0;
    let dead = false;

    (async () => {
      const { Renderer, Camera, Transform, Geometry, Program, Mesh } =
        await import("ogl");
      if (dead) return;

      const renderer = new Renderer({ canvas, alpha: true });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);

      const camera = new Camera(gl, { fov: 50 });
      camera.position.set(0, 1.8, 5);
      camera.lookAt([0, 0, -1]);

      const scene = new Transform();

      const COLS = 50;
      const ROWS = 28;
      const W = 16;
      const D = 10;

      const positions: number[] = [];

      // Horizontal lines
      for (let row = 0; row <= ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const z = (row / ROWS) * D - D * 0.5;
          const x0 = (col / COLS) * W - W * 0.5;
          const x1 = ((col + 1) / COLS) * W - W * 0.5;
          positions.push(x0, 0, z, x1, 0, z);
        }
      }

      // Vertical lines
      for (let col = 0; col <= COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
          const x = (col / COLS) * W - W * 0.5;
          const z0 = (row / ROWS) * D - D * 0.5;
          const z1 = ((row + 1) / ROWS) * D - D * 0.5;
          positions.push(x, 0, z0, x, 0, z1);
        }
      }

      const geometry = new Geometry(gl, {
        position: { size: 3, data: new Float32Array(positions) },
      });

      const program = new Program(gl, {
        vertex: /* glsl */ `
          attribute vec3 position;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          uniform float uTime;
          void main() {
            float y = sin(position.x * 0.9 + uTime * 0.5) * 0.55
                    + sin(position.z * 1.3 - uTime * 0.4) * 0.45
                    + sin((position.x * 0.6 + position.z * 0.9) + uTime * 0.35) * 0.3;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, y, position.z, 1.0);
          }
        `,
        fragment: /* glsl */ `
          precision mediump float;
          void main() {
            gl_FragColor = vec4(0.85, 0.85, 0.85, 0.6);
          }
        `,
        uniforms: { uTime: { value: 0 } },
        transparent: true,
      });

      const mesh = new Mesh(gl, { mode: gl.LINES, geometry, program });
      mesh.setParent(scene);

      const onResize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h);
        camera.perspective({ aspect: w / h });
      };
      window.addEventListener("resize", onResize, { passive: true });
      onResize();

      const t0 = performance.now();
      const loop = () => {
        rafId = requestAnimationFrame(loop);
        program.uniforms.uTime.value = (performance.now() - t0) / 1000;
        renderer.render({ scene, camera });
      };
      loop();
    })();

    return () => {
      dead = true;
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}

export default WaveMesh;
