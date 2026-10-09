/** Draws the two faces of the card onto 2D canvases. Transparent backgrounds: the shader supplies the material. */

export const TEX_W = 1024;
export const TEX_H = 646;

export type CardCopy = {
  role: string;
  name: string;
  tagline: string;
  since: string;
  fonts: { sans: string; serif: string };
};

const make = () => {
  const c = document.createElement("canvas");
  c.width = TEX_W;
  c.height = TEX_H;
  return c;
};

const spaced = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, track: number) => {
  // Reason: canvas letterSpacing is not available everywhere, so tracking is drawn glyph by glyph.
  let cx = x;
  for (const ch of text) {
    ctx.fillText(ch, cx, y);
    cx += ctx.measureText(ch).width + track;
  }
};

export function drawFront({ role, name, since, fonts }: CardCopy) {
  const c = make();
  const ctx = c.getContext("2d")!;
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.font = `600 21px ${fonts.sans}`;
  spaced(ctx, role.toUpperCase(), 64, 92, 4);

  // Chip: brushed metal with the usual contact grid.
  const chip = ctx.createLinearGradient(64, 220, 184, 300);
  chip.addColorStop(0, "#e9e3cf");
  chip.addColorStop(0.5, "#b9b29a");
  chip.addColorStop(1, "#d8d1ba");
  ctx.fillStyle = chip;
  ctx.beginPath();
  ctx.roundRect(64, 220, 118, 88, 14);
  ctx.fill();
  ctx.strokeStyle = "rgba(20,20,18,0.45)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(64, 264);
  ctx.lineTo(182, 264);
  ctx.moveTo(108, 220);
  ctx.lineTo(108, 308);
  ctx.moveTo(138, 220);
  ctx.lineTo(138, 308);
  ctx.stroke();

  // Contactless arcs.
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(232, 264, 24 + i * 20, -0.9, 0.9);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = `500 46px ${fonts.sans}`;
  spaced(ctx, "••••   ••••   ••••   ••••", 64, 450, 6);

  ctx.fillStyle = "#fff";
  ctx.font = `600 32px ${fonts.sans}`;
  spaced(ctx, name.toUpperCase(), 64, 560, 6);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = `600 20px ${fonts.sans}`;
  ctx.textAlign = "right";
  ctx.fillText(since, TEX_W - 64, 560);
  return c;
}

export function drawBack({ tagline, name, role, fonts }: CardCopy) {
  const c = make();
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "rgba(0,0,0,0.92)";
  ctx.fillRect(0, 70, TEX_W, 118);

  ctx.fillStyle = "rgba(245,244,238,0.96)";
  ctx.fillRect(64, 250, TEX_W - 128, 96);
  ctx.fillStyle = "#101110";
  ctx.font = `italic 300 52px ${fonts.serif}`;
  ctx.textBaseline = "middle";
  ctx.fillText(tagline, 90, 300, TEX_W - 180);

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = `600 26px ${fonts.sans}`;
  spaced(ctx, name.toUpperCase(), 64, 470, 5);
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = `500 20px ${fonts.sans}`;
  spaced(ctx, role.toUpperCase(), 64, 512, 3);
  return c;
}

/** Soft elliptical shadow used behind the card, so it sits on the white page instead of floating in a void. */
export function drawShadow() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(0,0,0,0.34)");
  g.addColorStop(0.55, "rgba(0,0,0,0.12)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return c;
}
