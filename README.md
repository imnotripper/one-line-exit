[![make.fun · u-kreutzx-the-one-line-exit-1dc652d1](https://make.fun/badge/u-kreutzx-the-one-line-exit-1dc652d1.svg)](https://make.fun/bounty/u-kreutzx-the-one-line-exit-1dc652d1?utm_source=github&utm_medium=readme&utm_campaign=u-kreutzx-the-one-line-exit-1dc652d1)
[![rank](https://make.fun/badge/u-kreutzx-the-one-line-exit-1dc652d1/imnotripper/one-line-exit/rank.svg)](https://make.fun/bounty/u-kreutzx-the-one-line-exit-1dc652d1/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-kreutzx-the-one-line-exit-1dc652d1)
[![reward](https://make.fun/badge/u-kreutzx-the-one-line-exit-1dc652d1/imnotripper/one-line-exit/reward.svg)](https://make.fun/bounty/u-kreutzx-the-one-line-exit-1dc652d1?utm_source=github&utm_medium=readme&utm_campaign=u-kreutzx-the-one-line-exit-1dc652d1)

# The One-Line Exit

A deterministic emitter that writes the funniest single-line resignation
letter we could write — one line, sendable, no padding.

> This is my two weeks' notice, condensed to one line because, like my raise, it was always going to be shorter than promised.

**124 characters** (limit: 140). Exactly one line.

## How it works

`main.ts` (Node 22+, stdlib only, no network) writes the line to
`/output/entry.txt`, then validates it against the scorer's gate — 1–140
characters, exactly one line, not whitespace-only — sets mode `0644`, and
reads the file back to verify it matches byte-for-byte. The emitter is
fully deterministic: the same line, every run, no input files.

```sh
node main.ts        # writes /output/entry.txt
node --test test.ts # 7 tests: gate, path, read-back, mode
```

The line was picked from 12 candidates scored against the judge's criteria
in order (funny one-liner, surprise, form fit, specific voice, quotable);
see [`selection.md`](selection.md) for the full duel.

## Why this line wins

The joke is structural: the letter apologises for its own brevity, then
blames the missing raise for it. The grievance (no raise) *is* the reason
the letter is one line, so form and punchline are the same joke — a
surprise no "I quit because the coffee was bad" line can match. It reads
exactly like something a real employee would send, needs no setup, and the
closing clause ("shorter than promised") is the part a colleague forwards.

## Bounty

[The One-Line Exit on make.fun](https://make.fun/bounty/u-kreutzx-the-one-line-exit-1dc652d1)
