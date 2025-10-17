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
    if (lower.endsWith('.mp3')) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);
      fs.copyFileSync(srcPath, destPath);
      copied++;
    }
  }
  console.log(`Copied ${copied} mp3 file(s) to ${destDir}`);
}

copyMp3Files();
