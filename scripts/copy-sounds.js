import fs from "fs";
import path from "path";

const srcDir = path.resolve(process.cwd(), "src", "assets");
const destDir = path.resolve(process.cwd(), "public", "sounds");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyMp3Files() {
  ensureDir(destDir);
  if (!fs.existsSync(srcDir)) {
    console.warn(`Source directory not found: ${srcDir}`);
    return;
  }

  const files = fs.readdirSync(srcDir);
  let copied = 0;
  for (const file of files) {
    const lower = file.toLowerCase();
    if (lower.endsWith(".mp3")) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);
      fs.copyFileSync(srcPath, destPath);
      copied++;
    }
  }
  console.log(`Copied ${copied} mp3 file(s) to ${destDir}`);
}

// Map numeric files to word names (for Numbers page)
const numberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
];

function copyNumberWordFiles() {
  // Look for files that start with '01 -', '02 -', etc. and create copies named one.mp3, two.mp3, ...
  for (let i = 1; i <= 20; i++) {
    const padded = String(i).padStart(2, "0");
    // Try to find a file that starts with the padded number
    const match = fs
      .readdirSync(srcDir)
      .find((f) => f.startsWith(padded + " ") && f.toLowerCase().endsWith(".mp3"));
    if (match) {
      const srcPath = path.join(srcDir, match);
      const word = numberWords[i - 1];
      const destPath = path.join(destDir, `${word}.mp3`);
      try {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Created ${destPath}`);
      } catch (e) {
        console.warn(`Failed to copy ${srcPath} -> ${destPath}:`, e.message);
      }
    }
  }
}

copyMp3Files();
copyNumberWordFiles();
