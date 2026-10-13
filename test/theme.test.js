import { test } from "vite-plus/test";
import assert from "node:assert/strict";
import {
  ROLES,
  GROUPS,
  HUES,
  STEPS,
  TOKENS,
  DEFAULT_PALETTE,
  ROLE_REFS,
  buildTheme,
  toJson,
  fromJson,
  validate,
  scale,
  deriveRoles,
  mergeTheme,
  fileName,
} from "../src/theme.js";

const full = () => Object.fromEntries(ROLES.map((r) => [r, "#102030"]));

test("ROLES lists the 56 color roles pi themes use", () => {
  assert.equal(ROLES.length, 56);
  assert.ok(ROLES.includes("toolSuccessBg"));
  assert.ok(ROLES.includes("thinkingMax"));
});

test("buildTheme returns pi theme shape with every role as hex", () => {
  const t = buildTheme({
    name: "mine",
    colors: full(),
    pageBg: "#000000",
    cardBg: "#111111",
    infoBg: "#222222",
  });
  assert.equal(t.name, "mine");
  assert.equal(Object.keys(t.colors).length, 56);
  assert.equal(t.colors.accent, "#102030");
  assert.deepEqual(t.export, { pageBg: "#000000", cardBg: "#111111", infoBg: "#222222" });
});

test("buildTheme rejects a non-hex value and names the role", () => {
  const colors = full();
  colors.accent = "blue";
  assert.throws(
    () =>
      buildTheme({ name: "x", colors, pageBg: "#000000", cardBg: "#000000", infoBg: "#000000" }),
    /accent/,
  );
});

test("buildTheme rejects a missing role", () => {
  const colors = full();
  delete colors.bashMode;
  assert.throws(
    () =>
      buildTheme({ name: "x", colors, pageBg: "#000000", cardBg: "#000000", infoBg: "#000000" }),
    /bashMode/,
  );
});

test("validate reports missing and invalid roles without throwing", () => {
  const colors = full();
  colors.text = "nope";
  delete colors.mdHr;
  const errors = validate(colors);
  assert.ok(errors.some((e) => e.includes("text")));
  assert.ok(errors.some((e) => e.includes("mdHr")));
  assert.deepEqual(validate(full()), []);
});

test("fromJson resolves var references to hex", () => {
  const text = JSON.stringify({
    name: "v",
    vars: { panel: "#112233" },
    colors: { ...full(), toolSuccessBg: "panel" },
    export: { pageBg: "#000000", cardBg: "#000000", infoBg: "#000000" },
  });
  assert.equal(fromJson(text).colors.toolSuccessBg, "#112233");
});

test("toJson then fromJson keeps colors and name", () => {
  const t = buildTheme({
    name: "rt",
    colors: full(),
    pageBg: "#010101",
    cardBg: "#020202",
    infoBg: "#030303",
  });
  const back = fromJson(toJson(t));
  assert.equal(back.name, "rt");
  assert.deepEqual(back.colors, t.colors);
});

test("GROUPS places every role in exactly one editor section", () => {
  const placed = GROUPS.flatMap(([, keys]) => keys);
  assert.deepEqual([...placed].sort(), [...ROLES].sort());
});

test("ROLE_REFS points every role at a real token or hue and step", () => {
  assert.deepEqual(Object.keys(ROLE_REFS).sort(), [...ROLES].sort());
  for (const ref of Object.values(ROLE_REFS)) {
    const [name, step] = ref.split(".");
    assert.ok([...TOKENS, ...HUES].includes(name), ref);
    assert.ok(STEPS.includes(Number(step)), ref);
  }
});

test("scale keeps the base at step 200 and runs light to dark", () => {
  const s = scale("#61afef");
  assert.equal(s[200], "#61afef");
  assert.deepEqual(Object.keys(s).map(Number), STEPS);
  const sum = (hex) => [1, 3, 5].reduce((n, i) => n + parseInt(hex.slice(i, i + 2), 16), 0);
  for (let i = 1; i < STEPS.length; i++)
    assert.ok(sum(s[STEPS[i - 1]]) > sum(s[STEPS[i]]), `${STEPS[i]}`);
});

test("deriveRoles fills all 56 roles with valid hex from the default palette", () => {
  const colors = deriveRoles(DEFAULT_PALETTE);
  assert.deepEqual(validate(colors), []);
});

test("deriveRoles follows a token to the hue it is set to", () => {
  const palette = {
    bases: DEFAULT_PALETTE.bases,
    tokens: { ...DEFAULT_PALETTE.tokens, accent: "red" },
  };
  assert.equal(deriveRoles(palette).accent, scale(DEFAULT_PALETTE.bases.red)[300]);
});

test("mergeTheme applies valid hex lowercased and keeps what the theme leaves out", () => {
  const current = { ...full(), pageBg: "#000000" };
  const merged = mergeTheme(current, {
    name: "x",
    colors: { accent: "#ABCDEF", text: "nope" },
    pageBg: undefined,
    cardBg: "#111111",
    infoBg: "#222222",
  });
  assert.equal(merged.accent, "#abcdef");
  assert.equal(merged.text, "#102030");
  assert.equal(merged.pageBg, "#000000");
  assert.equal(merged.cardBg, "#111111");
});

test("fileName slugs the theme name and falls back to theme", () => {
  assert.equal(fileName("My Theme!"), "my-theme.json");
  assert.equal(fileName("opencode"), "opencode.json");
  assert.equal(fileName("  "), "theme.json");
});

test("fromJson rejects text that is not JSON", () => {
  assert.throws(
    () => fromJson("{nope"),
    (error) =>
      /theme file is not valid JSON/.test(error.message) && error.cause instanceof SyntaxError,
  );
});
