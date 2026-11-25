// SPDX-License-Identifier: MIT
// The One-Line Exit — deterministic emitter.
// Writes the winning one-line resignation letter to /output/entry.txt
// and validates it against the sealed scorer's gate:
// UTF-8 text, 1–140 characters, exactly one line, not whitespace-only.
// Stdlib only. No network, no randomness, no input files.

import { mkdirSync, writeFileSync, readFileSync, chmodSync } from "node:fs";

const OUTPUT_PATH = "/output/entry.txt";

const LINE =
  "This is my two weeks' notice, condensed to one line because, like my raise, it was always going to be shorter than promised.";

function validate(line: string): void {
  // Count Unicode code points, not UTF-16 code units, so the 140-char
  // gate matches the scorer's character semantics for any future line.
  const chars = [...line].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry must be 1-140 characters, got ${chars}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

function main(): void {
  validate(LINE);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, LINE, { encoding: "utf8" });
  chmodSync(OUTPUT_PATH, 0o644);
  // Read-back verification: the file on disk must match byte-for-byte.
  const onDisk = readFileSync(OUTPUT_PATH, "utf8");
  if (onDisk !== LINE) {
    throw new Error("read-back verification failed: /output/entry.txt mismatch");
  }
  validate(onDisk);
  console.log(`Wrote ${OUTPUT_PATH} (${[...LINE].length} chars)`);
}

main();
