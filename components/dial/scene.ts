import { FRAG, VERT } from "./shader";

export type DialVariant = "hero" | "finale";
type Opts = { variant: DialVariant; animate: boolean };

const MAX_PIXELS = 2.6e6;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? "shader");
  return sh;
}

/** Layout of the dial inside its container, in CSS pixels. */
function layout(variant: DialVariant, w: number, h: number) {
  if (variant === "hero") {
    if (w < 768) return { cx: w * 0.5, cy: h * 0.34, r: Math.min(w * 0.46, h * 0.3) };
    return { cx: w * 0.7, cy: h * 0.5, r: Math.min(h * 0.43, w * 0.32) };
  }
  if (w < 768) return { cx: w * 0.5, cy: h * 0.3, r: w * 0.44 };
  return { cx: w * 0.72, cy: h * 0.5, r: Math.min(h * 0.38, w * 0.27) };
}

/**
 * Draws the dial with one full-screen triangle and renders only when something changes: the light follows the
 * cursor with damping, the hand and the cover follow scroll (hero only). When everything has settled the loop stops.
 */
export function mountDial(canvas: HTMLCanvasElement, { variant, animate }: Opts): (() => void) | null {
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "default" });
  if (!gl) return null;

  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? "link");
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = Object.fromEntries(["uRes", "uCenter", "uR", "uLight", "uHand", "uCover"].map((n) => [n, gl.getUniformLocation(prog, n)]));

  const REST = -0.72;
  const state = { light: animate ? -2.5 : REST, target: REST, hand: 0, cover: 0, zoom: 1 };
  let w = 1;
  let h = 1;
  let dpr = 1;
  let raf = 0;
  let last = performance.now();
  let visible = true;
  let hidden = document.hidden;

  const sizeNow = () => {
    w = canvas.clientWidth || 1;
    h = canvas.clientHeight || 1;
    dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_PIXELS / (w * h)));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const draw = () => {
    // Reason: once the next sheet fully covers the hero there is nothing to see, so nothing is drawn.
    if (variant === "hero" && state.cover > 0.995) return;
    const l = layout(variant, w, h);
    const z = state.zoom;
    // Reason: the hero dial grows and drifts toward the middle as the next section slides over it.
    const cx = l.cx + (w * 0.5 - l.cx) * (z - 1) * 0.9;
    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform2f(U.uCenter, cx * dpr, (h - l.cy) * dpr);
    gl.uniform1f(U.uR, l.r * z * dpr);
    gl.uniform1f(U.uLight, state.light);
    gl.uniform1f(U.uHand, state.hand);
    gl.uniform1f(U.uCover, state.cover);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const readScroll = () => {
    if (variant !== "hero") return;
    const p = Math.min(1, Math.max(0, window.scrollY / Math.max(h, 1)));
    state.hand = p * 1.9;
    state.cover = p;
    state.zoom = 1 + p * 0.45;
  };

  const frame = (now: number) => {
    raf = 0;
    if (hidden || !visible) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const k = 1 - Math.exp(-dt * (animate && state.light < REST - 0.4 ? 2.4 : 5));
    const dl = state.target - state.light;
    state.light += dl * k;
    draw();
    if (Math.abs(dl) > 0.0008) raf = requestAnimationFrame(frame);
  };
  const kick = () => {
    if (!raf && !hidden && visible) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };

  const onMove = (e: PointerEvent) => {
    if (!animate) return;
    const r = canvas.getBoundingClientRect();
    const l = layout(variant, r.width, r.height);
    const dx = e.clientX - (r.left + l.cx);
    const dy = e.clientY - (r.top + l.cy);
    // Reason: the highlight aims at the cursor, but never past +/-60 degrees of its resting angle, so it stays elegant.
    const raw = Math.atan2(-dy, dx);
    let d = raw - REST;
    d = Math.atan2(Math.sin(d), Math.cos(d));
    state.target = REST + Math.max(-1.05, Math.min(1.05, d));
    kick();
  };
  const onScroll = () => {
    readScroll();
    kick();
  };

  const ro = new ResizeObserver(() => {
    sizeNow();
    readScroll();
    draw();
  });
  ro.observe(canvas);
  sizeNow();
  readScroll();
  draw();

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) kick();
  });
  io.observe(canvas);
  const onVis = () => {
    hidden = document.hidden;
    kick();
  };

  if (animate) {
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    state.target = REST;
    kick();
  }

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onVis);
    gl.deleteBuffer(buf);
    gl.deleteProgram(prog);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
}
