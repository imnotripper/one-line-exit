// SPDX-License-Identifier: MIT
// Tests for the one-line-exit emitter.
// Verifies the sealed scorer's gate: /output/entry.txt is UTF-8 text of
// 1–140 characters, exactly one line, not whitespace-only, and the file on
// disk matches the emitted line byte-for-byte.

import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";

const OUTPUT_PATH = "/output/entry.txt";

const LINE =
  "This is my two weeks' notice, condensed to one line because, like my raise, it was always going to be shorter than promised.";

function runEmitter(): void {
  execFileSync(process.execPath, ["main.ts"], {
    cwd: import.meta.dirname,
    stdio: "pipe",
  });
}

test("emitter runs and writes /output/entry.txt", () => {
  runEmitter();
  const stat = statSync(OUTPUT_PATH);
  assert.ok(stat.isFile(), "entry.txt must exist as a file");
});

test("entry is 1–140 characters", () => {
  runEmitter();
  const text = readFileSync(OUTPUT_PATH, "utf8");
  const chars = [...text].length;
  assert.ok(chars >= 1 && chars <= 140, `got ${chars} chars`);
});

test("entry is exactly 124 characters (the winning line)", () => {
  runEmitter();
  const text = readFileSync(OUTPUT_PATH, "utf8");
  assert.equal([...text].length, 124);
});

test("entry file has mode 0644", () => {
  runEmitter();
  const mode = statSync(OUTPUT_PATH).mode & 0o777;
  assert.equal(mode, 0o644, `got mode ${mode.toString(8)}`);
});

test("entry is exactly one line", () => {
  runEmitter();
  const text = readFileSync(OUTPUT_PATH, "utf8");
  assert.equal(text.includes("\n"), false, "must contain no newline");
  assert.equal(text.includes("\r"), false, "must contain no carriage return");
});

test("entry is not whitespace-only", () => {
  runEmitter();
  const text = readFileSync(OUTPUT_PATH, "utf8");
  assert.ok(text.trim().length > 0, "must not be whitespace-only");
});

test("output path is exact and read-back matches the emitted line", () => {
  runEmitter();
  const text = readFileSync(OUTPUT_PATH, "utf8");
  assert.equal(text, LINE, "file content must match the emitted line exactly");
});
