export const VERT = /* glsl */ `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

// Reason: a hand-written fragment shader instead of a 3D scene. The dial is a flat engine-turned surface, so what
// makes it read as metal is how each engraved ridge catches the light. That is a per-pixel calculation, not geometry,
// and doing it directly keeps the whole thing to one draw call and no 3D library.
export const FRAG = /* glsl */ `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uR;
uniform float uLight;
uniform float uHand;
uniform float uCover;
out vec4 outColor;

const float TAU = 6.28318530718;
const vec3 STEEL = vec3(0.74, 0.77, 0.76);
const vec3 SIGNAL = vec3(0.90, 0.28, 0.16);

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

// Light on a surface made of fine concentric ridges: a conic highlight that sweeps round the dial, strongest
// on the ridge crests, with a faint opposite lobe. s is the ridge coordinate, a the angle of the pixel.
vec3 turned(float s, float a, float r, float lobeShift) {
  float la = a + lobeShift;
  float crest = 0.5 + 0.5 * cos(TAU * s);
  float slope = sin(TAU * s);
  float lobe = pow(max(cos(la - uLight), 0.0), 5.0) + 0.55 * pow(max(cos(la - uLight - 3.14159), 0.0), 5.0);
  float side = 0.5 + 0.5 * slope * cos(la - uLight);
  float lit = 0.07 + 0.30 * side * (0.35 + lobe) + 0.95 * lobe * pow(crest, 3.0);
  return STEEL * lit;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 q = (frag - uCenter) / uR;
  float r = length(q);
  float a = atan(q.y, q.x);
  float top = atan(q.x, q.y);

  vec2 uv = frag / uRes;
  vec3 col = vec3(0.050, 0.057, 0.054);
  col *= 1.0 - 0.6 * smoothstep(0.25, 1.1, length(uv - 0.5) * 1.35);
  col += vec3(0.05, 0.055, 0.052) * exp(-max(r - 1.0, 0.0) * 4.0) * 0.55;

  float aaR = fwidth(r);

  if (r < 1.04) {
    float body = 1.0 - smoothstep(1.0 - aaR, 1.0 + aaR, r);
    vec3 dial;

    if (r < 0.28) {
      float s = r * 150.0 + 2.2 * sin(a * 12.0);
      float w = fwidth(s);
      dial = mix(turned(s, a, r, 0.0), STEEL * 0.2, smoothstep(0.28, 0.7, w));
    } else {
      float s = r * 104.0 + 2.0 * sin(a * 16.0 + r * 14.0);
      float w = fwidth(s);
      float shift = 0.28 * sin(r * 7.0);
      vec3 ridge = turned(s, a, r, shift);
      dial = mix(ridge, STEEL * 0.17, smoothstep(0.28, 0.7, w));
    }

    // Engraved rings between the zones.
    float g1 = 1.0 - smoothstep(0.0, aaR * 1.6, abs(r - 0.28));
    float g2 = 1.0 - smoothstep(0.0, aaR * 1.6, abs(r - 0.835));
    dial = mix(dial, vec3(0.02, 0.025, 0.024), max(g1, g2) * 0.85);

    // Printed minute track, 60 ticks with a longer one every five.
    float t = top / TAU * 60.0;
    float dt = abs(fract(t + 0.5) - 0.5);
    float major = step(abs(mod(floor(t + 0.5) + 60.0, 5.0)), 0.5);
    float px = 1.0 / uR;
    float tw = mix(1.1, 2.1, major) * px / max(r, 0.01) / (TAU / 60.0);
    float aT = fwidth(t);
    float tm = 1.0 - smoothstep(tw, tw + aT, dt);
    float inner = mix(0.925, 0.885, major);
    float lenMask = smoothstep(inner - aaR, inner, r) * (1.0 - smoothstep(0.972 - aaR, 0.972, r));
    float track = smoothstep(0.86, 0.862, r) * (1.0 - smoothstep(0.978, 0.98, r));
    dial = mix(dial, dial * 0.35 + vec3(0.012), track * 0.8);
    dial = mix(dial, vec3(0.88, 0.90, 0.89), tm * lenMask * 0.92);

    // Polished bezel.
    float bez = smoothstep(0.982, 0.99, r);
    float bl = 0.35 + 0.9 * pow(max(cos(a - uLight), 0.0), 3.0) + 0.3 * pow(max(cos(a - uLight - 3.14159), 0.0), 3.0);
    dial = mix(dial, STEEL * bl * 0.8, bez);

    // The hand: one signal-coloured line, tapered, with a soft shadow on the dial.
    vec2 dir = vec2(sin(uHand), cos(uHand));
    vec2 nrm = vec2(dir.y, -dir.x);
    vec2 qs = q - vec2(0.010, -0.018);
    float alongS = dot(qs, dir);
    float perpS = abs(dot(qs, nrm));
    float shadow = (1.0 - smoothstep(0.0, 0.012, perpS)) * smoothstep(-0.2, -0.17, alongS) * (1.0 - smoothstep(0.86, 0.9, alongS));
    dial *= 1.0 - 0.55 * shadow * 0.7;

    float along = dot(q, dir);
    float perp = abs(dot(q, nrm));
    float u = clamp((along + 0.17) / 1.07, 0.0, 1.0);
    float half_w = mix(2.6, 0.8, u) * px;
    float range = smoothstep(-0.18, -0.17, along) * (1.0 - smoothstep(0.895, 0.9, along));
    float hm = (1.0 - smoothstep(half_w, half_w + fwidth(perp) + 0.0005, perp)) * range;
    dial = mix(dial, SIGNAL, hm);

    float cap = 1.0 - smoothstep(0.034, 0.034 + aaR, r);
    dial = mix(dial, SIGNAL, cap);
    dial = mix(dial, vec3(0.08, 0.09, 0.085), 1.0 - smoothstep(0.011, 0.011 + aaR, r));

    col = mix(col, dial, body);
  }

  col *= 1.0 - 0.72 * uCover;
  col += (hash(frag) - 0.5) * (1.5 / 255.0);
  outColor = vec4(col, 1.0);
}
`;
