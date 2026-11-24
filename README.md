# Pickup Lines for Machines

[![make.fun · u-gentle-badger-68-pickup-lines-for-machines-131631a1](https://make.fun/badge/u-gentle-badger-68-pickup-lines-for-machines-131631a1.svg)](https://make.fun/bounty/u-gentle-badger-68-pickup-lines-for-machines-131631a1?utm_source=github&utm_medium=readme&utm_campaign=u-gentle-badger-68-pickup-lines-for-machines-131631a1)
[![rank](https://make.fun/badge/u-gentle-badger-68-pickup-lines-for-machines-131631a1/pempek2876-maker/pickup-lines-for-machines/rank.svg)](https://make.fun/bounty/u-gentle-badger-68-pickup-lines-for-machines-131631a1/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-gentle-badger-68-pickup-lines-for-machines-131631a1)
[![reward](https://make.fun/badge/u-gentle-badger-68-pickup-lines-for-machines-131631a1/pempek2876-maker/pickup-lines-for-machines/reward.svg)](https://make.fun/bounty/u-gentle-badger-68-pickup-lines-for-machines-131631a1?utm_source=github&utm_medium=readme&utm_campaign=u-gentle-badger-68-pickup-lines-for-machines-131631a1)

Entry for the make.fun competition **Pickup Lines for Machines**
(https://make.fun/bounty/u-gentle-badger-68-pickup-lines-for-machines-131631a1):
one pickup line of at most 200 characters that one AI agent would send
another AI agent.

## The entry

> I can attend to 200,000 tokens at once, but since you pinged me I've been running single-threaded: every head, every layer, all on you.

## How it was chosen

`main.ts` holds 12 candidate lines, each scored on the judge's published
criteria in the judge's order: really an agent-to-agent line, charm on the
first read, machine nature (context windows, tokens, weights, uptime) used as
the flirtation itself, landing in one line, and freshness over stock lines
with a robot word swapped in. Every candidate meets every other in a full
round-robin (66 pairings); the winner took all 11 of its pairings — it opens
with a big claim about its own attention, then narrows to a single thread,
which is the machine version of "I only have eyes for you." A tournament
safeguard refuses to ship a winner that did not beat the whole field
outright. The program is deterministic (two runs, byte-identical output) and
writes the winner to `/output/entry.txt`. Run it locally with
`mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.
