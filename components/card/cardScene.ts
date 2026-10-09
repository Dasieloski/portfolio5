import {
  CanvasTexture,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { drawBack, drawFront, drawShadow, type CardCopy } from "./cardTexture";
import { fragment, vertex } from "./shaders";

const CARD_W = 3.37;
const CARD_H = 2.125;
const FOV = 28;
const DIST = 10;

type Pose = { x: number; y: number; w: number; rx: number; ry: number; rz: number };

/**
 * One card, many places on the page. Every element with `data-card` is a "slot": the card sits in the slot's
 * box (so layout stays in CSS) and tilts to the angles in data-rx / data-ry / data-rz. Between slots it
 * flies, blended by how close each slot is to the middle of the viewport.
 */
export function mountCard(canvas: HTMLCanvasElement, copy: CardCopy): () => void {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 50);
  camera.position.z = DIST;

  const front = new CanvasTexture(drawFront(copy));
  const back = new CanvasTexture(drawBack(copy));
  const shadowTex = new CanvasTexture(drawShadow());
  front.anisotropy = back.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const uniforms = {
    uFront: { value: front },
    uBack: { value: back },
    uTime: { value: 0 },
    uLight: { value: { x: 0, y: 0 } },
  };
  const material = new ShaderMaterial({ uniforms, vertexShader: vertex, fragmentShader: fragment });
  const geometry = new RoundedBoxGeometry(CARD_W, CARD_H, 0.05, 5, 0.17);
  const card = new Mesh(geometry, material);

  const shadowMat = new MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, side: DoubleSide });
  const shadowGeo = new PlaneGeometry(CARD_W * 1.5, CARD_H * 1.5);
  const shadow = new Mesh(shadowGeo, shadowMat);
  shadow.position.set(0.25, -0.45, -0.6);

  const group = new Group();
  group.add(shadow, card);
  scene.add(group);

  const slots = Array.from(document.querySelectorAll<HTMLElement>("[data-card]"));
  const visible = new Set<Element>();
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  const cur: Pose = { x: 0, y: 0, w: 1, rx: 0, ry: 0, rz: 0 };
  let primed = false;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let scrollVel = 0;
  let lastY = window.scrollY;
  let raf = 0;
  let last = performance.now();
  let hidden = document.hidden;
  let width = 1;
  let height = 1;

  const resize = () => {
    width = canvas.clientWidth || 1;
    height = canvas.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      kick();
    },
    { rootMargin: "20% 0px" },
  );
  slots.forEach((s) => io.observe(s));

  const onMove = (e: PointerEvent) => {
    if (!finePointer) return;
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onVis = () => {
    hidden = document.hidden;
    kick();
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("visibilitychange", onVis);

  const target = (): Pose | null => {
    const vh = window.innerHeight;
    let sum = 0;
    const t: Pose = { x: 0, y: 0, w: 0, rx: 0, ry: 0, rz: 0 };
    for (const s of slots) {
      const r = s.getBoundingClientRect();
      if (r.width === 0) continue;
      const cy = r.top + r.height / 2;
      const dist = Math.abs(cy - vh / 2) / vh;
      // Reason: squared falloff, so a slot dominates as soon as it is near the middle and the flight between slots stays short.
      const wgt = Math.max(0, 1 - dist / 0.95) ** 2;
      if (wgt <= 0) continue;
      sum += wgt;
      t.x += (r.left + r.width / 2 - width / 2) * wgt;
      t.y += (cy - vh / 2) * wgt;
      t.w += r.width * wgt;
      t.rx += parseFloat(s.dataset.rx ?? "0") * wgt;
      t.ry += parseFloat(s.dataset.ry ?? "0") * wgt;
      t.rz += parseFloat(s.dataset.rz ?? "0") * wgt;
    }
    if (sum < 0.0001) return null;
    for (const k of Object.keys(t) as (keyof Pose)[]) t[k] /= sum;
    return t;
  };

  const frame = (now: number) => {
    raf = 0;
    if (hidden || visible.size === 0) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    const tgt = target();
    if (tgt) {
      if (!primed) {
        Object.assign(cur, tgt);
        primed = true;
      }
      const kp = 1 - Math.exp(-dt * 11);
      const kr = 1 - Math.exp(-dt * 5);
      cur.x += (tgt.x - cur.x) * kp;
      cur.y += (tgt.y - cur.y) * kp;
      cur.w += (tgt.w - cur.w) * kp;
      cur.rx += (tgt.rx - cur.rx) * kr;
      cur.ry += (tgt.ry - cur.ry) * kr;
      cur.rz += (tgt.rz - cur.rz) * kr;
    }

    const y = window.scrollY;
    scrollVel += ((y - lastY) / Math.max(dt, 0.001) - scrollVel) * (1 - Math.exp(-dt * 8));
    lastY = y;
    pointer.x += (pointer.tx - pointer.x) * (1 - Math.exp(-dt * 4));
    pointer.y += (pointer.ty - pointer.y) * (1 - Math.exp(-dt * 4));

    const t = now / 1000;
    const worldH = 2 * DIST * Math.tan((FOV * Math.PI) / 360);
    const worldW = worldH * (width / height);
    const s = ((cur.w / width) * worldW) / CARD_W;

    group.position.set((cur.x / width) * worldW, -(cur.y / height) * worldH + Math.sin(t * 0.9) * 0.05, 0);
    group.scale.setScalar(s);
    group.rotation.set(
      cur.rx - pointer.y * 0.22 + Math.max(-0.35, Math.min(0.35, scrollVel * 0.00022)) + Math.sin(t * 0.7) * 0.03,
      cur.ry + pointer.x * 0.4 + Math.sin(t * 0.5) * 0.05,
      cur.rz,
    );

    uniforms.uTime.value = t;
    uniforms.uLight.value = { x: pointer.x, y: -pointer.y };
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };

  function kick() {
    if (!raf && !hidden && visible.size > 0) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }
  kick();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("visibilitychange", onVis);
    [geometry, shadowGeo, material, shadowMat, front, back, shadowTex].forEach((d) => d.dispose());
    renderer.dispose();
    renderer.forceContextLoss();
  };
}
