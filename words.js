// Day 1 of RayRi = this date at 00:00 IST. Change it to the date you want the cycle to start.
// Right now set so "today" is Day 1 (March 28, 2025 00:00 IST). After 25 days it repeats.
// IST = UTC+5:30 → March 28 00:00 IST = March 27 18:30 UTC
const START_DATE = new Date(Date.UTC(2025, 2, 27, 18, 30, 0, 0));

// RayRi words — 25 days. Each word keeps its original length (4 to 14 letters).
const LEXICON_ANSWERS = [
  "remove",           // 1
  "hurted",          // 2
  "mozgito",         // 3
  "assamity",        // 4
  "spred",            // 5
  "hanka",            // 6
  "billow",           // 7
  "beated",           // 8
  "sharmi",           // 9
  "futt",             // 10
  "titty",            // 11
  "pasata",           // 12
  "plink",            // 13
  "werk",             // 14
  "maloogi",          // 15
  "kisbis",           // 16
  "booble",           // 17
  "magata",           // 18
  "teared",           // 19
  "shof",             // 20
  "googitched",       // 21
  "skareen",          // 22
  "dopamin",          // 23
  "repute",           // 24
  "dick",             // 25
];

window.LEXICON_ANSWERS = LEXICON_ANSWERS;
window.LEXICON_START_DATE = START_DATE;
