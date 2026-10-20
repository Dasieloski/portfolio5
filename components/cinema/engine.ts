import {
  ACESFilmicToneMapping,
  Color,
  DirectionalLight,
  Fog,
  Group,
  InstancedMesh,
  LatheGeometry,
  Matrix4,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Plane,
  PMREMGenerator,
  PointLight,
  Quaternion,
  Raycaster,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { FORMATIONS, TOKEN_H, TOKEN_R } from "./formations";
import { cinema } from "./store";

export type CinemaOptions = { reduced: boolean; mobile: boolean };
export type Cinema = { dispose: () => void };

const BG = "#0a0a0b";
/** Ceramic white and lacquered black. The accent tone (2) is not a paint: those tokens are polished champagne gold. */
const TONES = [new Color("#f1f0ec"), new Color("#141416"), new Color("#f1f0ec")];
const FOV = 30;
const CAM_Z = 15;

type Token = {
  p: Vector3;
  v: Vector3;
  q: Quaternion;
  w: Vector3;
  tone: number;
  /** Random order in which tokens join the next formation. */
  rank: number;
  c: Color;
  /** Drawn in the gold mesh instead of the lacquer one. */
  gold: boolean;
  oriented: boolean;
  collide: boolean;
};

/** A chunky token with a raised rim and recessed faces, turned on a lathe (axis = Y). */
function tokenGeometry() {
  const r = TOKEN_R;
  const h = TOKEN_H / 2;
  const rec = 0.035;
  const pts = [
    [0, h - rec], [r * 0.7, h - rec], [r * 0.76, h], [r * 0.93, h], [r * 0.985, h - 0.02], [r, h - 0.06],
    [r, -h + 0.06], [r * 0.985, -h + 0.02], [r * 0.93, -h], [r * 0.76, -h], [r * 0.7, -h + rec], [0, -h + rec],
  ].map(([x, y]) => new Vector2(x, y));
  const g = new LatheGeometry(pts.reverse(), 64);
  g.computeVertexNormals();
  return g;
}

export function createCinema(canvas: HTMLCanvasElement, opts: CinemaOptions): Cinema | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  // Reason: phones get the full 2x so the tokens stay as crisp as on desktop; it is the page's centrepiece.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.mobile ? 2 : 1.75));
  renderer.setClearColor(BG, 1);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.86;
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  scene.fog = new Fog(BG, 12, 30);
  const pmrem = new PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.6;
  scene.background = new Color(BG);

  const camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
  camera.position.set(0, 0, CAM_Z);

  // Studio light: a hard key from above-left, a cool rim from behind, a warm bounce from below, a torch on the cursor.
  const key = new DirectionalLight(0xffffff, 1.7);
  key.position.set(-5, 8, 7);
  const rim = new DirectionalLight(0x9fb8ff, 1.6);
  rim.position.set(6, 3, -6);
  const bounce = new PointLight(0xffb066, 12, 22, 1.8);
  bounce.position.set(2, -6, 4);
  const torch = new PointLight(0xffffff, 0, 10, 1.6);
  scene.add(key, rim, bounce, torch);

  const n = opts.mobile ? 52 : 64;
  const geo = tokenGeometry();
  const mat = new MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.24, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.06 });
  const mesh = new InstancedMesh(geo, mat, n);
  const goldMat = new MeshPhysicalMaterial({ color: 0xe6c591, metalness: 1, roughness: 0.2, clearcoat: 0.4, clearcoatRoughness: 0.1 });
  const goldMesh = new InstancedMesh(geo, goldMat, n);
  const group = new Group();
  group.add(mesh, goldMesh);
  scene.add(group);

  // Tokens start in one point and burst out into the pile: the opening moment.
  const tokens: Token[] = Array.from({ length: n }, (_, i) => {
    const tone = i % 7 === 3 ? 2 : i % 2 === 0 ? 0 : 1;
    const dir = new Vector3(Math.sin(i * 12.9898), Math.cos(i * 78.233), Math.sin(i * 39.425)).normalize();
    return {
      p: opts.reduced ? new Vector3() : dir.clone().multiplyScalar(0.05),
      v: opts.reduced ? new Vector3() : dir.clone().multiplyScalar(9 + (i % 5)),
      q: new Quaternion().setFromAxisAngle(dir, i),
      w: new Vector3(Math.sin(i), Math.cos(i * 1.7), Math.sin(i * 2.3)).multiplyScalar(opts.reduced ? 0 : 4),
      tone,
      rank: (Math.sin(i * 91.7) * 0.5 + 0.5),
      c: TONES[tone].clone(),
      gold: tone === 2,
      oriented: false,
      collide: true,
    };
  });

  let composer: EffectComposer | null = null;
  let bloom: UnrealBloomPass | null = null;
  {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    // Reason: a high threshold so only the specular glints bloom; the tokens themselves stay crisp.
    bloom = new UnrealBloomPass(new Vector2(1, 1), opts.mobile ? 0.18 : 0.22, 0.3, 0.9);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
  }

  let halfH = 1;
  let halfW = 1;
  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    composer?.setSize(w, h);
    // Reason: on phones the glow is computed at half size; it is soft anyway and costs a quarter of the pixels.
    bloom?.resolution.set(opts.mobile ? w / 2 : w, opts.mobile ? h / 2 : h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    halfH = Math.tan((FOV * Math.PI) / 360) * CAM_Z;
    halfW = halfH * camera.aspect;
  };
  resize();
  window.addEventListener("resize", resize);

  const ndc = new Vector2(9, 9);
  let pointerOn = 0;
  const onPointer = (e: PointerEvent) => {
    ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    pointerOn = 1;
  };
  const onLeave = () => (pointerOn = 0);
  if (!opts.reduced) {
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);
  }

  // Eased placement of the whole formation.
  const place = { x: 0, y: 0, scale: 1, rotX: 0, rotY: 0, presence: opts.reduced ? 1 : 0 };
  const ray = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const hit = new Vector3();
  const local = new Vector3();
  const target = new Vector3();
  const tq = new Quaternion();
  const dq = new Quaternion();
  const m = new Matrix4();
  const one = new Vector3(1, 1, 1);
  const hidden = new Matrix4().makeScale(0, 0, 0);
  const tint = new Color();
  const d = new Vector3();
  const minDist = TOKEN_R * 1.9;
  const tmpV = new Vector3();

  renderer.compile(scene, camera);
  let clock = 0;
  let last = performance.now();
  let raf = 0;

  let settled = "";
  /** One physics step: springs toward the formation, cursor push, collisions, spin and orientation. */
  const step = (h: number, cursor: boolean, shot: typeof cinema.shot) => {
    const from = FORMATIONS[shot.from];
    const to = FORMATIONS[shot.to];
    for (let i = 0; i < n; i++) {
      const tk = tokens[i];
      const spec = tk.rank < shot.mix ? to : from;
      const oriented = spec.place(i, n, clock, target, tq);
      const k = spec.k;
      const c = 2 * Math.sqrt(k) * 0.85;
      tk.v.addScaledVector(d.copy(target).sub(tk.p), k * h).addScaledVector(tk.v, -c * h);
      if (cursor) {
        d.copy(tk.p).sub(local);
        const dist = d.length();
        if (dist < 2) {
          const f = (1 - dist / 2) * 34 * shot.push;
          tk.v.addScaledVector(d.normalize(), f * h);
          tk.w.x += d.y * f * h * 0.8;
          tk.w.y -= d.x * f * h * 0.8;
        }
      }
      if (oriented) tk.q.slerp(tq, 1 - Math.exp(-h * 6));
      tk.oriented = oriented;
      tk.collide = spec.collide;
      const tone = spec.tone?.(i, n, target) ?? -1;
      const resolved = tone >= 0 ? tone : tk.tone;
      tk.gold = resolved === 2;
      if (!tk.gold) tk.c.lerp(tint.copy(TONES[resolved]), 1 - Math.exp(-h * 5));
    }
    // Loose piles collide: a cheap pairwise push keeps tokens from passing through each other.
    for (let i = 0; i < n; i++) {
      const a = tokens[i];
      if (!a.collide) continue;
      for (let j = i + 1; j < n; j++) {
        const b = tokens[j];
        if (!b.collide) continue;
        d.copy(a.p).sub(b.p);
        const dist = d.length();
        if (dist > 0 && dist < minDist) {
          const push = (minDist - dist) * 0.5;
          d.multiplyScalar(1 / dist);
          a.p.addScaledVector(d, push);
          b.p.addScaledVector(d, -push);
          const rel = d.dot(tmpV.copy(a.v).sub(b.v));
          if (rel < 0) {
            a.v.addScaledVector(d, -rel * 0.6);
            b.v.addScaledVector(d, rel * 0.6);
            a.w.x += rel * 0.8;
            b.w.y -= rel * 0.8;
          }
        }
      }
    }
    for (const tk of tokens) {
      tk.p.addScaledVector(tk.v, h);
      const spin = tk.w.length();
      if (spin > 1e-4) {
        dq.setFromAxisAngle(d.copy(tk.w).multiplyScalar(1 / spin), spin * h);
        tk.q.premultiply(dq);
      }
      tk.w.multiplyScalar(Math.exp(-h * (tk.oriented ? 4 : 0.6)));
      if (!tk.oriented && !opts.reduced) {
        tk.w.addScaledVector(d.set(Math.sin(clock + tk.rank * 9), Math.cos(clock * 0.7 + tk.rank * 5), 0), h * 0.6);
      }
    }
  };

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(1 / 30, (now - last) / 1000);
    last = now;
    if (!opts.reduced) clock += dt;
    const shot = cinema.shot;

    const ease = opts.reduced ? 1 : 1 - Math.exp(-dt * 3);
    place.x += (shot.x - place.x) * ease;
    place.y += (shot.y - place.y) * ease;
    place.scale += (shot.scale - place.scale) * ease;
    place.rotX += (shot.rotX - place.rotX) * ease;
    place.rotY += (shot.rotY - place.rotY) * ease;
    place.presence += (shot.presence - place.presence) * (opts.reduced ? 1 : 1 - Math.exp(-dt * 4));
    canvas.style.opacity = place.presence.toFixed(3);
    if (place.presence < 0.004) return;

    // Portrait screens are fitted less strictly by width so the formation stays large and central.
    const fit = Math.min(halfH / 3.4, halfW / (opts.mobile ? 3.4 : 4.6));
    group.position.set(place.x * halfW, place.y * halfH, 0);
    group.scale.setScalar(fit * place.scale);
    group.rotation.set(place.rotX, place.rotY, 0);
    group.updateMatrixWorld();

    // Cursor in the formation's own space.
    let cursor = false;
    if (pointerOn && shot.push > 0) {
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(plane, hit)) {
        local.copy(hit);
        group.worldToLocal(local);
        cursor = true;
      }
      torch.position.set(hit.x, hit.y, 4);
    }
    torch.intensity = cursor ? 40 * place.presence : 0;

    if (opts.reduced) {
      // Reason: reduced motion never shows tokens travelling; the physics settles off screen and only the result is drawn.
      const key = `${shot.from}|${shot.to}|${shot.mix.toFixed(2)}`;
      if (key !== settled) {
        for (let k = 0; k < 360; k++) step(1 / 60, false, shot);
        settled = key;
      }
    } else {
      step(dt / 2, cursor, shot);
      step(dt / 2, cursor, shot);
    }
    for (let i = 0; i < n; i++) {
      const tk = tokens[i];
      m.compose(tk.p, tk.q, one);
      mesh.setMatrixAt(i, tk.gold ? hidden : m);
      goldMesh.setMatrixAt(i, tk.gold ? m : hidden);
      mesh.setColorAt(i, tk.c);
    }
    mesh.instanceMatrix.needsUpdate = true;
    goldMesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    if (composer) composer.render();
    else renderer.render(scene, camera);
  };

  const onVisibility = () => {
    cancelAnimationFrame(raf);
    if (!document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };
  document.addEventListener("visibilitychange", onVisibility);
  raf = requestAnimationFrame(frame);

  return {
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      geo.dispose();
      mat.dispose();
      goldMat.dispose();
      mesh.dispose();
      goldMesh.dispose();
      env.dispose();
      pmrem.dispose();
      composer?.dispose();
      renderer.dispose();
    },
  };
}
