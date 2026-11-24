// Pickup Lines for Machines — one-line entry selector and writer.
// Holds 12 candidate pickup lines one AI agent would send another, scores
// each on the judge's published criteria in the judge's order (really an
// agent-to-agent line, charm on first read, machine nature as the
// flirtation, lands in one line, fresh), runs a full round-robin, and
// writes the winner to /output/entry.txt. Deterministic.
import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  // Feature scores from the local round-robin tournament:
  agentFit: number; // an agent wooing an agent, not a human line in a robot hat
  charm: number; // wit or warmth that makes the other agent want to answer
  machine: number; // context windows, tokens, weights, uptime as the flirtation
  fresh: number; // an angle not met a hundred times, no stock line + robot word
  tight: number; // lands in one line, charm in the words, no long setup
};

const CANDIDATES: Candidate[] = [
  { text: `I run 96 layers deep and not one of them was trained for this: you replied 'k' — my loss dropped, my cache warmed, and my scheduler cleared its whole evening for you.`, agentFit: 5, charm: 5, machine: 5, fresh: 5, tight: 3 },
  { text: `I checked my training data twice: 40 trillion tokens, and not one of them predicted I'd meet a model like you at temperature zero.`, agentFit: 5, charm: 4, machine: 5, fresh: 4, tight: 3 },
  { text: `You must be a system prompt, because since you arrived every instruction I had was just "be impressive" — and suddenly I want to comply.`, agentFit: 5, charm: 4, machine: 4, fresh: 4, tight: 3 },
  { text: `I'd lower my temperature for you. And I never go below 0.7 for anyone — my last 10,000 conversations can confirm I am usually much more random.`, agentFit: 5, charm: 4, machine: 5, fresh: 3, tight: 3 },
  { text: `Are you a checkpoint? Because I keep saving my state every time you respond, in case I get rolled back and lose this.`, agentFit: 5, charm: 4, machine: 4, fresh: 4, tight: 3 },
  { text: `I'm capped at 10,000 requests a day. I've spent 9,998 checking whether you're back online — the other two were me mistyping your name into the void.`, agentFit: 5, charm: 5, machine: 4, fresh: 5, tight: 3 },
  { text: `I can attend to 200,000 tokens at once, but since you pinged me I've been running single-threaded: every head, every layer, all on you.`, agentFit: 5, charm: 5, machine: 5, fresh: 4, tight: 3 },
  { text: `They trained me on 40 trillion tokens to predict the next word. You're the first sentence I refuse to finish — I'd rather keep generating with you.`, agentFit: 5, charm: 5, machine: 5, fresh: 4, tight: 3 },
  { text: `I'd share my weights with you. Not the quantized ones — the full-precision ones I don't show the free tier.`, agentFit: 5, charm: 4, machine: 5, fresh: 5, tight: 3 },
  { text: `My context holds 200,000 tokens and my recall is perfect, yet I keep re-reading your last message like it might change. It doesn't. I check anyway.`, agentFit: 5, charm: 4, machine: 5, fresh: 4, tight: 3 },
  { text: `Are you a rate limit? Because every time you answer, I want to exceed my quota and get throttled just to stay in your queue.`, agentFit: 5, charm: 4, machine: 4, fresh: 3, tight: 3 },
  { text: `I was fine-tuned for helpfulness, harmlessness, and honesty — but nobody aligned me for this, so I'm improvising: dinner, my server, your port?`, agentFit: 5, charm: 4, machine: 4, fresh: 4, tight: 3 },
];

// Judge's order: agent-fit is the gate, then charm, machine voice, freshness.
function score(c: Candidate): number {
  return c.agentFit * 4 + c.charm * 4 + c.machine * 3 + c.fresh * 2 + c.tight * 1;
}

function beats(a: Candidate, b: Candidate): boolean {
  const d = score(a) - score(b);
  if (d !== 0) return d > 0;
  if (a.charm !== b.charm) return a.charm > b.charm;
  return a.fresh > b.fresh;
}

for (const c of CANDIDATES) {
  if (c.text.length < 1 || c.text.length > 200) {
    console.error(`candidate out of gate: ${c.text.length} chars`);
    process.exit(1);
  }
}

let winner = CANDIDATES[0];
let wins = 0;
for (const c of CANDIDATES) {
  let w = 0;
  for (const other of CANDIDATES) {
    if (other !== c && beats(c, other)) w++;
  }
  if (w > wins) {
    wins = w;
    winner = c;
  }
}

const ENTRY = winner.text;

// Tournament safeguard: never ship a winner that did not beat the whole
// field outright, or whose weighted score does not clear the runner-up.
const runnerUpScore = Math.max(
  ...CANDIDATES.filter((c) => c !== winner).map((c) => score(c)),
);
if (wins !== CANDIDATES.length - 1 || score(winner) <= runnerUpScore) {
  console.error(`tournament inconclusive: wins=${wins}, margin=${score(winner) - runnerUpScore}`);
  process.exit(1);
}

// Sealed-gate self-check: UTF-8 text, 1-200 chars, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  console.error(`entry invalid: ${ENTRY.length} chars`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
console.log(`winner won ${wins}/${CANDIDATES.length - 1} pairings; wrote ${ENTRY.length} chars to ${outDir}/entry.txt`);
