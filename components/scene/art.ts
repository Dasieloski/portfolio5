/** Line-art drawn on each slab (white on transparent; tinted by the material). Order = layer order. */
export const ART_W = 512;
export const ART_H = 360;

type Draw = (c: CanvasRenderingContext2D) => void;

const circle = (c: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.stroke();
};
const rect = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => c.strokeRect(x, y, w, h);
const line = (c: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
};

const product: Draw = (c) => {
  // decision graph: nodes joined by arrows, with registration crosses
  const pts: [number, number][] = [[110, 250], [230, 130], [350, 220], [430, 100]];
  pts.forEach(([x, y], i) => {
    circle(c, x, y, i === 1 ? 26 : 16);
    if (i) line(c, pts[i - 1][0] + 18, pts[i - 1][1] - 10, x - 18, y + 10);
  });
  for (const [x, y] of [[40, 40], [472, 40], [40, 320], [472, 320]]) {
    line(c, x - 12, y, x + 12, y);
    line(c, x, y - 12, x, y + 12);
  }
};

const iface: Draw = (c) => {
  rect(c, 70, 50, 372, 260);
  line(c, 70, 90, 442, 90);
  circle(c, 90, 70, 6);
  circle(c, 112, 70, 6);
  rect(c, 90, 112, 90, 176);
  for (let i = 0; i < 4; i++) line(c, 102, 134 + i * 34, 168, 134 + i * 34);
  rect(c, 200, 112, 108, 70);
  rect(c, 324, 112, 100, 70);
  rect(c, 200, 198, 224, 46);
  rect(c, 330, 258, 94, 30);
};

const api: Draw = (c) => {
  for (let i = 0; i < 5; i++) {
    const y = 70 + i * 55;
    line(c, 60, y, 452, y);
    circle(c, 60, y, 7);
    circle(c, 452, y, 7);
    const x = 130 + ((i * 97) % 220);
    rect(c, x, y - 14, 70, 28);
    line(c, x + 80, y, x + 104, y);
    line(c, x + 96, y - 6, x + 104, y);
    line(c, x + 96, y + 6, x + 104, y);
  }
};

const data: Draw = (c) => {
  for (let k = 0; k < 3; k++) {
    const cx = 130 + k * 126;
    for (let j = 0; j < 3; j++) {
      const y = 100 + j * 56;
      c.beginPath();
      c.ellipse(cx, y, 46, 14, 0, 0, Math.PI * 2);
      c.stroke();
      if (j < 2) {
        line(c, cx - 46, y, cx - 46, y + 56);
        line(c, cx + 46, y, cx + 46, y + 56);
      }
    }
  }
  for (let i = 0; i < 9; i++) line(c, 70 + i * 46.5, 270, 70 + i * 46.5, 310);
  line(c, 70, 270, 442, 270);
  line(c, 70, 310, 442, 310);
};

const money: Draw = (c) => {
  circle(c, 256, 180, 100);
  circle(c, 256, 180, 78);
  circle(c, 256, 180, 54);
  c.font = "700 72px sans-serif";
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.lineWidth = 3;
  c.strokeText("¤", 256, 184);
  for (let i = 0; i < 4; i++) {
    line(c, 40, 80 + i * 60, 130, 80 + i * 60);
    line(c, 382, 80 + i * 60, 472, 80 + i * 60);
  }
};

const delivery: Draw = (c) => {
  for (let i = 0; i < 5; i++) {
    const x = 70 + i * 74;
    c.beginPath();
    c.moveTo(x, 90);
    c.lineTo(x + 46, 180);
    c.lineTo(x, 270);
    c.stroke();
  }
  c.setLineDash([10, 10]);
  line(c, 60, 180, 452, 180);
  c.setLineDash([]);
  rect(c, 400, 140, 60, 80);
};

export const LAYER_ART: Draw[] = [product, iface, api, data, money, delivery];
