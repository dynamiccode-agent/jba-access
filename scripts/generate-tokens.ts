import fs from "fs";
import path from "path";

const FMCG_WORDS = [
  "VELOCITY", "IMPULSE", "GONDOLA", "PLANOGRAM", "CATEGORY",
  "OFFTAKE", "LISTING", "RANGING", "FIXTURE", "ENDCAP",
  "CHANNEL", "PROMO", "DWELL", "SELLOUT", "MERIDIAN",
  "NEXUS", "APEX", "SURGE", "PIVOT", "LAUNCH",
];

function randomToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function randomDigits(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

const tokens: Record<string, { code: string; label: string }> = {};
const usedTokens = new Set<string>();
const usedCodes = new Set<string>();

let guestNum = 1;
let wordIdx = 0;

while (Object.keys(tokens).length < 150) {
  let tok = randomToken();
  while (usedTokens.has(tok)) tok = randomToken();
  usedTokens.add(tok);

  const word = FMCG_WORDS[wordIdx % FMCG_WORDS.length];
  wordIdx++;
  let code = `${word}-${randomDigits()}`;
  while (usedCodes.has(code)) code = `${word}-${randomDigits()}`;
  usedCodes.add(code);

  tokens[tok] = { code, label: `Guest ${String(guestNum).padStart(3, "0")}` };
  guestNum++;
}

// Write tokens.json
const outDir = path.join(__dirname, "../app/data");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "tokens.json"), JSON.stringify(tokens, null, 2));

// Write CSV
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://jba-access.vercel.app";
const csvRows = ["Token URL,Access Code,Guest Label"];
for (const [tok, val] of Object.entries(tokens)) {
  csvRows.push(`${baseUrl}/access/${tok},${val.code},${val.label}`);
}
const publicDir = path.join(__dirname, "../public");
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "tokens-export.csv"), csvRows.join("\n"));

console.log(`✅ Generated ${Object.keys(tokens).length} tokens`);
console.log(`📄 tokens.json → app/data/tokens.json`);
console.log(`📊 CSV → public/tokens-export.csv`);
