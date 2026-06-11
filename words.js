// Day 1 of RayRi = June 14, 2026 at 00:00 IST. After 32 days it repeats.
// IST = UTC+5:30 → June 14 00:00 IST = June 13 18:30 UTC
const START_DATE = new Date(Date.UTC(2026, 5, 13, 18, 30, 0, 0));

// Stay on Day 1 (love) through June 14 for testing. Daily schedule advances from June 15.
// IST = UTC+5:30 → June 15 00:00 IST = June 14 18:30 UTC
const PREVIEW_UNTIL = new Date(Date.UTC(2026, 5, 14, 18, 30, 0, 0));

// RayRi words — "love" in 32 languages (Jun 14 – Jul 15, 2026). Romanized for the keyboard.
const LEXICON_ANSWERS = [
  "love",       // 1  — English       (Jun 14)
  "amour",      // 2  — French        (Jun 15)
  "amor",       // 3  — Spanish       (Jun 16)
  "amore",      // 4  — Italian       (Jun 17)
  "liebe",      // 5  — German        (Jun 18)
  "liefde",     // 6  — Dutch         (Jun 19)
  "rakkaus",    // 7  — Finnish       (Jun 20)
  "milosc",     // 8  — Polish        (Jun 21)
  "laska",      // 9  — Czech         (Jun 22)
  "szerelem",   // 10 — Hungarian     (Jun 23)
  "dragoste",   // 11 — Romanian      (Jun 24)
  "agape",      // 12 — Greek         (Jun 25)
  "lyubov",     // 13 — Russian       (Jun 26)
  "ljubav",     // 14 — Croatian      (Jun 27)
  "ask",        // 15 — Turkish       (Jun 28)
  "hubb",       // 16 — Arabic        (Jun 29)
  "ahava",      // 17 — Hebrew        (Jun 30)
  "prem",       // 18 — Hindi         (Jul 1)
  "sarang",     // 19 — Korean        (Jul 2)
  "aiqing",     // 20 — Chinese       (Jul 3)
  "cinta",      // 21 — Indonesian    (Jul 4)
  "mahal",      // 22 — Tagalog       (Jul 5)
  "upendo",     // 23 — Swahili       (Jul 6)
  "cariad",     // 24 — Welsh         (Jul 7)
  "meile",      // 25 — Lithuanian    (Jul 8)
  "armastus",   // 26 — Estonian      (Jul 9)
  "eshgh",      // 27 — Persian       (Jul 10)
  "mohabbat",   // 28 — Urdu          (Jul 11)
  "kadhal",     // 29 — Tamil         (Jul 12)
  "prema",      // 30 — Telugu        (Jul 13)
  "karlek",     // 31 — Swedish       (Jul 14)
  "bhalobasa",  // 32 — Bengali       (Jul 15)
];

window.LEXICON_ANSWERS = LEXICON_ANSWERS;
window.LEXICON_START_DATE = START_DATE;
window.LEXICON_PREVIEW_UNTIL = PREVIEW_UNTIL;
