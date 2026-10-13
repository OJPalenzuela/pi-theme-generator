// Color roles of a pi theme. Order matches the keys of pi's theme JSON.
export const ROLES = [
  "accent",
  "border",
  "borderAccent",
  "borderMuted",
  "success",
  "error",
  "warning",
  "muted",
  "dim",
  "text",
  "thinkingText",
  "selectedBg",
  "scrollbarTrack",
  "scrollbarThumb",
  "searchMatchBg",
  "searchMatchText",
  "userMessageBg",
  "userMessageText",
  "customMessageBg",
  "customMessageText",
  "customMessageLabel",
  "toolPendingBg",
  "toolSuccessBg",
  "toolErrorBg",
  "toolTitle",
  "toolOutput",
  "mdHeading",
  "mdLink",
  "mdLinkUrl",
  "mdCode",
  "mdCodeBlock",
  "mdCodeBlockBorder",
  "mdQuote",
  "mdQuoteBorder",
  "mdHr",
  "mdListBullet",
  "toolDiffAdded",
  "toolDiffRemoved",
  "toolDiffContext",
  "syntaxComment",
  "syntaxKeyword",
  "syntaxFunction",
  "syntaxVariable",
  "syntaxString",
  "syntaxNumber",
  "syntaxType",
  "syntaxOperator",
  "syntaxPunctuation",
  "thinkingOff",
  "thinkingMinimal",
  "thinkingLow",
  "thinkingMedium",
  "thinkingHigh",
  "thinkingXhigh",
  "thinkingMax",
  "bashMode",
];

// Editor sections in display order. Each role appears in exactly one; App.jsx adds the export surfaces.
export const GROUPS = [
  ["Accent and borders", ["accent", "border", "borderAccent", "borderMuted"]],
  ["Text", ["text", "muted", "dim"]],
  ["Status", ["success", "error", "warning"]],
  ["Selection and search", ["selectedBg", "searchMatchBg", "searchMatchText"]],
  ["Scrollbar", ["scrollbarTrack", "scrollbarThumb"]],
  [
    "Messages",
    [
      "userMessageBg",
      "userMessageText",
      "customMessageBg",
      "customMessageText",
      "customMessageLabel",
    ],
  ],
  [
    "Tools",
    [
      "toolPendingBg",
      "toolSuccessBg",
      "toolErrorBg",
      "toolTitle",
      "toolOutput",
      "toolDiffAdded",
      "toolDiffRemoved",
      "toolDiffContext",
    ],
  ],
  [
    "Markdown",
    [
      "mdHeading",
      "mdLink",
      "mdLinkUrl",
      "mdCode",
      "mdCodeBlock",
      "mdCodeBlockBorder",
      "mdQuote",
      "mdQuoteBorder",
      "mdHr",
      "mdListBullet",
    ],
  ],
  [
    "Syntax",
    [
      "syntaxComment",
      "syntaxKeyword",
      "syntaxFunction",
      "syntaxVariable",
      "syntaxString",
      "syntaxNumber",
      "syntaxType",
      "syntaxOperator",
      "syntaxPunctuation",
    ],
  ],
  [
    "Thinking",
    [
      "thinkingText",
      "thinkingOff",
      "thinkingMinimal",
      "thinkingLow",
      "thinkingMedium",
      "thinkingHigh",
      "thinkingXhigh",
      "thinkingMax",
    ],
  ],
  ["Bash mode", ["bashMode"]],
];

// Palette: hues with nine steps each, built from one base at step 200 (gray is built from anchors). Tokens pick which hue plays each job.
// Defaults are the built-in dark palette: its hues, their bases, and its token picks.
export const HUES = ["gray", "red", "orange", "green", "cyan", "blue", "purple"];
export const STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900];
export const TOKENS = ["accent", "interactive", "neutral"];
export const NEW_HUE_BASE = "#e5c07b";
export const DEFAULT_PALETTE = {
  bases: {
    red: "#e06c75",
    orange: "#fab283",
    green: "#7fd88f",
    cyan: "#56b6c2",
    blue: "#5c9cf5",
    purple: "#9d7cd8",
  },
  tokens: { accent: "orange", interactive: "blue", neutral: "gray" },
};
// Gray's steps come from these text and background colors, keyed by step.
export const GRAY_ANCHORS = {
  200: "#eeeeee",
  400: "#808080",
  600: "#1e1e1e",
  700: "#141414",
  800: "#0a0a0a",
};

// Each role takes one step: "token.step" or "hue.step".
export const ROLE_REFS = {
  accent: "accent.300",
  border: "neutral.600",
  borderAccent: "accent.400",
  borderMuted: "neutral.800",
  success: "green.300",
  error: "red.300",
  warning: "orange.300",
  muted: "neutral.300",
  dim: "neutral.400",
  text: "neutral.100",
  thinkingText: "neutral.300",
  selectedBg: "neutral.800",
  scrollbarTrack: "neutral.900",
  scrollbarThumb: "neutral.700",
  searchMatchBg: "orange.800",
  searchMatchText: "orange.100",
  userMessageBg: "neutral.800",
  userMessageText: "neutral.100",
  customMessageBg: "purple.900",
  customMessageText: "purple.100",
  customMessageLabel: "purple.300",
  toolPendingBg: "blue.900",
  toolSuccessBg: "green.900",
  toolErrorBg: "red.900",
  toolTitle: "accent.200",
  toolOutput: "neutral.300",
  mdHeading: "accent.200",
  mdLink: "interactive.300",
  mdLinkUrl: "neutral.400",
  mdCode: "interactive.200",
  mdCodeBlock: "neutral.200",
  mdCodeBlockBorder: "neutral.700",
  mdQuote: "neutral.300",
  mdQuoteBorder: "neutral.600",
  mdHr: "neutral.700",
  mdListBullet: "accent.300",
  toolDiffAdded: "green.200",
  toolDiffRemoved: "red.200",
  toolDiffContext: "neutral.300",
  syntaxComment: "neutral.400",
  syntaxKeyword: "purple.200",
  syntaxFunction: "blue.200",
  syntaxVariable: "cyan.200",
  syntaxString: "green.200",
  syntaxNumber: "orange.200",
  syntaxType: "cyan.100",
  syntaxOperator: "cyan.300",
  syntaxPunctuation: "neutral.300",
  thinkingOff: "neutral.700",
  thinkingMinimal: "neutral.600",
  thinkingLow: "blue.400",
  thinkingMedium: "blue.300",
  thinkingHigh: "blue.200",
  thinkingXhigh: "blue.100",
  thinkingMax: "purple.100",
  bashMode: "green.300",
};

const HEX = /^#[0-9a-fA-F]{6}$/;
const EXPORT_KEYS = ["pageBg", "cardBg", "infoBg"];

// Returns one message per problem; an empty list means the colors are complete.
export function validate(colors) {
  const errors = [];
  for (const role of ROLES) {
    if (!(role in colors)) errors.push(`missing role: ${role}`);
    else if (!HEX.test(colors[role]))
      errors.push(`${role} is not a #rrggbb value: ${colors[role]}`);
  }
  return errors;
}

export function buildTheme({ name, colors, pageBg, cardBg, infoBg }) {
  const errors = validate(colors);
  if (errors.length) throw new Error(errors[0]);
  const exported = { pageBg, cardBg, infoBg };
  for (const key of EXPORT_KEYS)
    if (!HEX.test(exported[key])) throw new Error(`export ${key} is not a #rrggbb value`);
  const picked = Object.fromEntries(ROLES.map((r) => [r, colors[r]]));
  return {
    $schema:
      "https://raw.githubusercontent.com/earendil-works/pi/main/packages/coding-agent/src/modes/interactive/theme/theme-schema.json",
    name,
    colors: picked,
    export: exported,
  };
}

export function toJson(theme) {
  return JSON.stringify(theme, null, 2) + "\n";
}

// Reads a pi theme file. Var references are followed to their hex value.
export function fromJson(text) {
  let raw;
  try {
    raw = JSON.parse(text);
  } catch (error) {
    throw new Error("theme file is not valid JSON", { cause: error });
  }
  const vars = raw.vars ?? {};
  const resolve = (value) => {
    let v = value;
    for (let i = 0; i < 8 && typeof v === "string" && !HEX.test(v); i++) v = vars[v];
    return v;
  };
  const colors = Object.fromEntries(
    Object.entries(raw.colors)
      .map(([role, value]) => [role, resolve(value)])
      .filter(([, v]) => v !== undefined),
  );
  const exported = raw.export ?? {};
  return {
    name: raw.name ?? "",
    colors,
    pageBg: exported.pageBg,
    cardBg: exported.cardBg,
    infoBg: exported.infoBg,
  };
}

// Applies a loaded theme over the current colors. Only valid hex values replace; anything else keeps its value.
export function mergeTheme(current, theme) {
  const next = { ...current };
  for (const key of [...ROLES, ...EXPORT_KEYS]) {
    const value = EXPORT_KEYS.includes(key) ? theme[key] : theme.colors[key];
    if (typeof value === "string" && HEX.test(value)) next[key] = value.toLowerCase();
  }
  return next;
}

// Download file name: a lowercase slug of the theme name, or "theme" when nothing is left.
export function fileName(name) {
  return `${
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "theme"
  }.json`;
}

// OKLab conversions (Bjorn Ottosson's matrices). Hue is in radians.
const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toSrgb = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

function hexToOklch(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    C: Math.hypot(a, bb),
    h: Math.atan2(bb, a),
  };
}

// Linear sRGB channels; a channel outside 0..1 means the color is out of gamut.
function oklchToLinear({ L, C, h }) {
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const inGamut = (rgb) => rgb.every((v) => v >= -1e-6 && v <= 1 + 1e-6);

// Out-of-gamut colors lose chroma in 10% steps, keeping lightness and hue, until they fit sRGB.
function oklchToHex(color) {
  const fits = (C) => inGamut(oklchToLinear({ ...color, C }));
  const C = fits(color.C)
    ? color.C
    : (Array.from({ length: 24 }, (_, i) => color.C * 0.9 ** (i + 1)).find(fits) ?? 0);
  return (
    "#" +
    oklchToLinear({ ...color, C })
      .map((v) =>
        Math.round(Math.min(1, Math.max(0, toSrgb(v))) * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

// Nine steps from one base: lightness moves toward near-black below 200 and chroma fades with distance from 200.
// The dark target sits below the base, so very dark bases still get darker steps.
// shortcut: pure black (lightness 0) has nothing darker to move toward, so its steps stay equal; upgrade if black bases must step.
export function scale(base) {
  const { L, C, h } = hexToOklch(base);
  const target = Math.min(0.18, L / 2);
  return Object.fromEntries(
    STEPS.map((step) => {
      if (step === 200) return [step, base];
      const f = (step - 200) / 700;
      return [step, oklchToHex({ L: L + (target - L) * f, C: C * (1 - 0.5 * f), h })];
    }),
  );
}

// Blends two colors in OKLCH; hue takes the shorter arc.
function mix(from, to, f) {
  const a = hexToOklch(from);
  const b = hexToOklch(to);
  const turn = ((((b.h - a.h) % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
  return oklchToHex({
    L: a.L + (b.L - a.L) * f,
    C: a.C + (b.C - a.C) * f,
    h: a.h + turn * f,
  });
}

// The two anchors a step blends between; steps past either end extrapolate from the outer pair.
function neighbours(known, step) {
  if (step < known[0]) return [known[0], known[1]];
  if (step > known.at(-1)) return [known.at(-2), known.at(-1)];
  return [known.findLast((k) => k < step), known.find((k) => k > step)];
}

function grayScale(anchors) {
  const known = Object.keys(anchors)
    .map(Number)
    .sort((x, y) => x - y);
  return Object.fromEntries(
    STEPS.map((step) => {
      if (step in anchors) return [step, anchors[step]];
      const [lo, hi] = neighbours(known, step);
      return [step, mix(anchors[lo], anchors[hi], (step - lo) / (hi - lo))];
    }),
  );
}

// Every hue's steps: gray from its anchors, the rest from their bases. Overrides ("hue.step" -> hex) replace single steps.
export function paletteScales(bases, overrides = {}) {
  const scales = {
    gray: grayScale(GRAY_ANCHORS),
    ...Object.fromEntries(Object.entries(bases).map(([hue, base]) => [hue, scale(base)])),
  };
  for (const [ref, hex] of Object.entries(overrides)) {
    const [hue, step] = ref.split(".");
    scales[hue][Number(step)] = hex;
  }
  return scales;
}

// A reference is "hue.step" or "token.step"; a token resolves to its hue first.
export function resolveRef(ref, scales, tokens) {
  const [name, step] = ref.split(".");
  const hue = TOKENS.includes(name) ? tokens[name] : name;
  return scales[hue][Number(step)];
}

// Every reference a role can pick, hues first, then tokens, each with its resolved color.
export function refOptions(hues, scales, tokens) {
  const hueOptions = hues.flatMap((hue) =>
    STEPS.map((step) => ({ value: `${hue}.${step}`, group: "Hues", color: scales[hue][step] })),
  );
  const tokenOptions = TOKENS.flatMap((token) =>
    STEPS.map((step) => ({
      value: `${token}.${step}`,
      group: "Tokens",
      color: resolveRef(`${token}.${step}`, scales, tokens),
    })),
  );
  return [...hueOptions, ...tokenOptions];
}

// Resolves every role's reference through the palette into a #rrggbb value.
export function deriveRoles({ bases, tokens }) {
  const scales = paletteScales(bases);
  return Object.fromEntries(
    ROLES.map((role) => [role, resolveRef(ROLE_REFS[role], scales, tokens)]),
  );
}
