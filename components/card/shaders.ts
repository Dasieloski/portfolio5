export const vertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vObjN;
varying vec3 vViewN;
varying vec3 vViewPos;
void main() {
  vUv = uv;
  vObjN = normal;
  vViewN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

// Reason: a custom shader (not MeshPhysicalMaterial) because the card needs three things the stock material
// can't give together: a view-angle iridescent foil, a procedural guilloche seal, and a light that follows the cursor.
export const fragment = /* glsl */ `
precision highp float;
uniform sampler2D uFront;
uniform sampler2D uBack;
uniform float uTime;
uniform vec2 uLight;
varying vec2 vUv;
varying vec3 vObjN;
varying vec3 vViewN;
varying vec3 vViewPos;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
vec3 foil(float t) { return 0.5 + 0.5 * cos(6.28318 * (vec3(0.0, 0.33, 0.67) + t)); }

void main() {
  vec3 V = normalize(-vViewPos);
  vec3 N = normalize(vViewN);
  float facing = max(dot(N, V), 0.0);
  float fres = pow(1.0 - facing, 3.0);

  vec3 L = normalize(vec3(uLight * 1.4 + vec2(-0.35, 0.55), 0.85));
  vec3 H = normalize(L + V);
  float spec = pow(max(dot(N, H), 0.0), 70.0);
  float broad = pow(max(dot(N, H), 0.0), 7.0);

  float isFace = step(0.5, abs(vObjN.z));
  bool front = vObjN.z > 0.0;
  vec2 uv = vUv;

  // Brushed graphite base with a slow vertical gradient and film grain.
  vec3 base = mix(vec3(0.055, 0.062, 0.06), vec3(0.135, 0.15, 0.145), smoothstep(0.0, 1.0, uv.y * 0.8 + uv.x * 0.25));
  base += (hash(uv * 900.0) - 0.5) * 0.018;

  // Iridescent foil: hue travels with the viewing angle and the light, so tilting the card visibly changes it.
  float shift = facing * 1.1 + uv.x * 0.5 - uv.y * 0.3 + uLight.x * 0.35 + uTime * 0.01;
  vec3 hue = foil(shift);
  vec3 col = base + hue * (0.05 + 0.42 * fres) + hue * broad * 0.16;

  // Procedural guilloche seal (front only, top right).
  if (front) {
    vec2 q = (uv - vec2(0.82, 0.74)) * vec2(1.586, 1.0);
    float d = length(q);
    float ang = atan(q.y, q.x);
    float rings = 0.5 + 0.5 * sin(d * 190.0 + sin(ang * 8.0) * 2.2);
    float disc = smoothstep(0.175, 0.168, d) * smoothstep(0.02, 0.05, d);
    col = mix(col, foil(shift * 1.6 + d * 2.2) * (0.35 + 0.75 * rings), disc * 0.9);
  }

  vec4 art = front ? texture2D(uFront, uv) : texture2D(uBack, uv);
  col = mix(col, art.rgb, art.a);
  col += vec3(spec) * 0.55 + vec3(broad) * 0.05;

  // Rim: brushed steel edge.
  vec3 edge = vec3(0.64, 0.66, 0.65) + spec * 0.6 + fres * 0.2;
  col = mix(edge, col, isFace);

  gl_FragColor = vec4(col, 1.0);
}
`;
