"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ART_H, ART_W, LAYER_ART } from "./art";

type Props = { names: string[]; onReady: () => void };

const INK = new THREE.Color("#121210");
const PAPER = new THREE.Color("#ece8df");
const SIG = new THREE.Color("#e8431a");
const DARK_FILL = new THREE.Color("#1b1a16");

const W = 360;
const D = 250;
const H = 12;
const N = 6;
const BASE = 780; // px of stage size at which scale === 1
// Reason: the packet visits one waypoint per layer; offsets make its path zig-zag through the stack.
const PORTS: [number, number][] = [[-70, -30], [60, 40], [-40, 50], [80, -40], [-20, 0], [50, 30]];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const damp = (a: number, b: number, k: number, dt: number) => a + (b - a) * (1 - Math.exp(-k * dt));
const ease = (t: number) => t * t * (3 - 2 * t);

function makeTexture(i: number) {
  const cv = document.createElement("canvas");
  cv.width = ART_W;
  cv.height = ART_H;
  const c = cv.getContext("2d")!;
  c.strokeStyle = "#fff";
  c.lineWidth = 3;
  c.lineCap = "round";
  c.lineJoin = "round";
  LAYER_ART[i](c);
  const t = new THREE.CanvasTexture(cv);
  t.anisotropy = 4;
  return t;
}

export default function SceneCanvas({ names, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const tip = tipRef.current!;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2));
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -3000, 3000);
    camera.position.z = 1000;
    const root = new THREE.Group();
    root.rotation.order = "XYZ";
    scene.add(root);

    // ---- slabs
    const boxGeo = new THREE.BoxGeometry(W, H, D);
    const edgeGeo = new THREE.EdgesGeometry(boxGeo);
    const planeGeo = new THREE.PlaneGeometry(W - 30, D - 30);
    const ringGeo = new THREE.RingGeometry(13, 15, 64);
    ringGeo.rotateX(-Math.PI / 2);
    type Layer = {
      group: THREE.Group;
      fill: THREE.MeshBasicMaterial;
      edge: THREE.LineBasicMaterial;
      art: THREE.MeshBasicMaterial;
      ring: THREE.MeshBasicMaterial;
      ringMesh: THREE.Mesh;
      mesh: THREE.Mesh;
      hl: number;
      pulse: number;
    };
    const layers: Layer[] = [];
    for (let i = 0; i < N; i++) {
      const group = new THREE.Group();
      const fill = new THREE.MeshBasicMaterial({ color: PAPER, transparent: true, opacity: 0.8, depthWrite: false });
      const mesh = new THREE.Mesh(boxGeo, fill);
      mesh.renderOrder = i * 4;
      mesh.userData.index = i;
      const edge = new THREE.LineBasicMaterial({ color: INK, transparent: true });
      const edges = new THREE.LineSegments(edgeGeo, edge);
      edges.renderOrder = i * 4 + 1;
      const art = new THREE.MeshBasicMaterial({ map: makeTexture(i), color: INK, transparent: true, depthWrite: false, opacity: 0.9 });
      const plane = new THREE.Mesh(planeGeo, art);
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = H / 2 + 0.6;
      plane.renderOrder = i * 4 + 2;
      const ring = new THREE.MeshBasicMaterial({ color: SIG, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
      const ringMesh = new THREE.Mesh(ringGeo, ring);
      ringMesh.position.set(PORTS[i][0], H / 2 + 1.2, PORTS[i][1]);
      ringMesh.renderOrder = i * 4 + 3;
      group.add(mesh, edges, plane, ringMesh);
      root.add(group);
      layers.push({ group, fill, edge, art, ring, ringMesh, mesh, hl: 0, pulse: 0 });
    }

    // ---- corner posts
    const postPos = new Float32Array(8 * 3);
    const postGeo = new THREE.BufferGeometry();
    postGeo.setAttribute("position", new THREE.BufferAttribute(postPos, 3));
    const postMat = new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.35 });
    const posts = new THREE.LineSegments(postGeo, postMat);
    posts.renderOrder = 1;
    root.add(posts);

    // ---- packet + trail
    const packetMat = new THREE.MeshBasicMaterial({ color: SIG });
    const packet = new THREE.Mesh(new THREE.SphereGeometry(7, 16, 16), packetMat);
    packet.renderOrder = 100;
    root.add(packet);
    const TRAIL = 16;
    const trailGeo = new THREE.SphereGeometry(1, 8, 8);
    const trail: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial }[] = [];
    const history: THREE.Vector3[] = [];
    for (let i = 0; i < TRAIL; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: SIG, transparent: true, opacity: 0.5 * (1 - i / TRAIL), depthWrite: false });
      const mesh = new THREE.Mesh(trailGeo, mat);
      mesh.scale.setScalar(6 * (1 - i / TRAIL));
      mesh.renderOrder = 99;
      root.add(mesh);
      trail.push({ mesh, mat });
      history.push(new THREE.Vector3());
    }

    // ---- state
    const st = { x: 0, y: 0, size: 600, gap: 1, tint: 0, opacity: 0, rotY: -0.75, rotX: 0.62, vel: 0 };
    const pointer = { x: 0, y: 0, cx: -1, cy: -1, fine: false };
    let external = -1;
    let hover = -1;
    let lastScroll = window.scrollY;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
    };
    resize();

    const onMove = (e: PointerEvent) => {
      pointer.fine = e.pointerType === "mouse";
      pointer.x = (e.clientX / w) * 2 - 1;
      pointer.y = (e.clientY / h) * 2 - 1;
      pointer.cx = e.clientX;
      pointer.cy = e.clientY;
    };
    const onLayer = (e: Event) => {
      external = (e as CustomEvent<number>).detail;
    };
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("layer", onLayer);

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const meshes = layers.map((l) => l.mesh);

    let stages: HTMLElement[] = [];
    const refreshStages = () => (stages = Array.from(document.querySelectorAll<HTMLElement>("[data-stage]")));
    refreshStages();
    const mo = new MutationObserver(refreshStages);
    mo.observe(document.body, { childList: true, subtree: true });

    let raf = 0;
    let last = performance.now();
    let time = 0;
    let ready = false;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) {
        last = now;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time += dt;

      // pick the stage that is most on-screen; the scene fades out when none is
      let best: HTMLElement | null = null;
      let bestF = -1;
      let rect: DOMRect | null = null;
      for (const s of stages) {
        const r = s.getBoundingClientRect();
        const f = r.height > 0 ? (Math.min(r.bottom, h) - Math.max(r.top, 0)) / r.height : 0;
        if (f > bestF) {
          bestF = f;
          best = s;
          rect = r;
        }
      }
      if (!best || !rect) return;
      const mode = best.dataset.stage;
      const targetOpacity = clamp(bestF * 1.6 - 0.15);
      const scrollY = window.scrollY;
      st.vel = damp(st.vel, Math.abs(scrollY - lastScroll) / Math.max(dt, 0.001), 6, dt);
      lastScroll = scrollY;

      const tx = rect.left + rect.width / 2;
      const ty = rect.top + rect.height / 2;
      const ts = Math.min(rect.width, rect.height * 1.15);
      const first = st.opacity === 0 && !ready;
      const k = first ? 100 : 7;
      st.x = damp(st.x, tx, k, dt);
      st.y = damp(st.y, ty, k, dt);
      st.size = damp(st.size, ts, k, dt);
      st.opacity = damp(st.opacity, targetOpacity, 6, dt);
      const targetGap = (mode === "contact" ? 0.5 : mode === "stack" ? 1.35 : 1) + clamp(st.vel / 3500) * 0.35;
      st.gap = damp(st.gap, targetGap, 4, dt);
      st.tint = damp(st.tint, mode === "contact" ? 1 : 0, 5, dt);

      if (st.opacity < 0.01) {
        canvas.style.opacity = "0";
        tip.style.opacity = "0";
        return;
      }
      canvas.style.opacity = String(st.opacity);

      const spacing = 74 * st.gap;
      const scale = st.size / BASE;
      root.scale.setScalar(scale);
      root.position.set(st.x - w / 2, -(st.y - h / 2), 0);
      const idle = Math.sin(time * 0.35) * 0.12;
      st.rotY = damp(st.rotY, -0.75 + idle + pointer.x * 0.32 + Math.sin(scrollY * 0.0011) * 0.5, 4, dt);
      st.rotX = damp(st.rotX, 0.62 + pointer.y * 0.09, 4, dt);
      root.rotation.set(st.rotX, st.rotY, 0);

      // hover (mouse only, hero/stack)
      let hit = -1;
      if (pointer.fine && st.opacity > 0.6 && mode !== "contact") {
        ndc.set(pointer.x, -pointer.y);
        raycaster.setFromCamera(ndc, camera);
        const hits = raycaster.intersectObjects(meshes, false);
        if (hits.length) hit = hits[0].object.userData.index as number;
      }
      hover = hit;
      if (hover >= 0) {
        tip.textContent = names[hover];
        tip.style.opacity = "1";
        tip.style.transform = `translate(${pointer.cx + 16}px, ${pointer.cy + 12}px)`;
      } else {
        tip.style.opacity = "0";
      }

      // packet travel: one segment per layer, with a dwell on arrival
      const cycle = 11;
      const seg = ((time % cycle) / cycle) * (N + 0.6);
      const idx = Math.floor(seg);
      const u = seg - idx;
      let py: number;
      let px: number;
      let pz: number;
      const layerY = (i: number) => ((N - 1) / 2 - i) * spacing;
      if (idx >= N - 1) {
        const i = Math.min(idx, N - 1);
        py = layerY(i);
        [px, pz] = PORTS[i];
        packetMat.opacity = 1;
      } else {
        const m = ease(clamp((u - 0.28) / 0.72));
        py = layerY(idx) + (layerY(idx + 1) - layerY(idx)) * m;
        px = PORTS[idx][0] + (PORTS[idx + 1][0] - PORTS[idx][0]) * m;
        pz = PORTS[idx][1] + (PORTS[idx + 1][1] - PORTS[idx][1]) * m;
      }
      const arrived = Math.min(idx, N - 1);
      if (u < 0.05 && idx < N) layers[arrived].pulse = Math.max(layers[arrived].pulse, 1);
      packet.visible = idx < N;
      packet.position.set(px, py + H, pz);
      history.unshift(history.pop()!.copy(packet.position));
      trail.forEach((t, i) => {
        t.mesh.position.copy(history[Math.min(i * 2, TRAIL - 1)]);
        t.mesh.visible = packet.visible;
      });

      // layers
      layers.forEach((l, i) => {
        const wanted = i === external || i === hover ? 1 : 0;
        l.hl = damp(l.hl, wanted, 10, dt);
        l.pulse = Math.max(0, l.pulse - dt * 0.9);
        const lift = l.hl * 10;
        l.group.position.y = layerY(i) + lift;
        const base = INK.clone().lerp(PAPER, st.tint);
        const col = base.lerp(SIG, Math.max(l.hl, l.pulse * 0.8));
        l.edge.color.copy(col);
        l.art.color.copy(col);
        l.fill.color.copy(PAPER.clone().lerp(DARK_FILL, st.tint));
        l.fill.opacity = 0.8 - 0.58 * st.tint;
        l.ring.opacity = l.pulse * 0.9;
        l.ringMesh.scale.setScalar(1 + (1 - l.pulse) * 5);
      });
      postMat.color.copy(INK.clone().lerp(PAPER, st.tint));
      const top = layerY(0);
      const bot = layerY(N - 1);
      let o = 0;
      for (const sx of [-1, 1]) {
        for (const sz of [-1, 1]) {
          postPos.set([sx * (W / 2 - 1), top, sz * (D / 2 - 1), sx * (W / 2 - 1), bot, sz * (D / 2 - 1)], o);
          o += 6;
        }
      }
      postGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      if (!ready) {
        ready = true;
        onReady();
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("layer", onLayer);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.material) {
          const mats = Array.isArray(m.material) ? m.material : [m.material];
          mats.forEach((x) => {
            (x as THREE.MeshBasicMaterial).map?.dispose();
            x.dispose();
          });
        }
      });
      [boxGeo, edgeGeo, planeGeo, ringGeo, postGeo, trailGeo].forEach((g) => g.dispose());
      renderer.dispose();
    };
  }, [names, onReady]);

  return (
    <>
      <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />
      <div ref={tipRef} className="scene-tip mono" aria-hidden="true" />
    </>
  );
}
