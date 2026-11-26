// The Dog Reviews the Mailman
// make.fun competition: u-motasimfuad-the-dog-reviews-the-mailman-87608f85
//
// The entry is one funny one-line review (<= 200 characters) that a dog
// gives the mailman. Ten candidates were drafted and compared against the
// judge's five criteria (on-subject dog review of the mailman first, then
// the dog's side of the visit, then a dog's voice, then a tight single line
// with a turn at the end, then a laugh that belongs to this dog and this
// mailman): a grudge about never getting a letter, a bribe ("I can be
// bought, but never cheaply"), suspicion that he is casing the house, the
// shoelace triumph, five stars for punctuality but zero for the sausage
// never dropped in the bowl, the grievance that he never stays for a sniff,
// the flinch after six years of barking, the gate toll of one biscuit,
// auditing his ankles, and the "would not recommend" review where the dog
// got told off. The letter grudge won: it is the only candidate built on
// the dog's own logic about the mail itself ("not one of them was addressed
// to me"), it keeps a dog's vocabulary (slot, bark, star rating), and its
// turn — "One star, would bark again" — is a review-format punchline that
// only this dog, reviewing this mailman, could write. Runner-up was the
// punctuality-vs-sausage line, which is just as much a dog's review but
// spends more words setting up the same six-year grievance and lands its
// turn less sharply. At 119 characters the winning line is also short
// enough that the byte tie-break works in its favour against longer
// entries of equal rate.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Six years he has stuffed envelopes through my slot and not one of them was addressed to me. One star, would bark again.";

// The gate, checked inside the program before anything is written:
// UTF-8 text, 1 to 200 characters, a single line, not only whitespace,
// and no leading or trailing space (a stray space would count against the
// 200-character gate and against the byte tie-break, and would read as a
// sloppy review). Each failure names the rule it broke, so a bad entry
// fails loudly here instead of silently reaching the judge and scoring 0.
function validateGate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`gate failed: entry is ${text.length} characters, must be 1-200`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("gate failed: entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("gate failed: entry must not start or end with whitespace");
  }
}

validateGate(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote /output/entry.txt (${ENTRY.length} characters)`);
