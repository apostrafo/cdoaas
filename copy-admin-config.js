// Kopijuoja admin config failą į dist direktoriją
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Gauti dabartinio failo ir direktorijos kelius
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Nustatyti šaltinio ir tikslo kelius
const sourcePath = path.join(__dirname, 'public', 'admin', 'config.yml');
const targetPath = path.join(__dirname, 'dist', 'admin', 'config.yml');

// Kopijuoti failą
try {
  console.log(`Copying admin config file...`);
  console.log(`Copying from ${sourcePath} to ${targetPath}`);
  
  // Įsitikinti, kad tikslo direktorija egzistuoja
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Kopijuoti failą
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`Admin config file copied successfully`);
} catch (error) {
  console.error(`Error copying admin config file:`, error);
} 