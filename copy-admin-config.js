// Skriptas, kuris kopijuoja config.yml į dist/admin katalogą
const fs = require('fs');
const path = require('path');

console.log('Copying admin config file...');

// Įsitikiname, kad dist/admin katalogas egzistuoja
const adminDir = path.join(__dirname, 'dist', 'admin');
if (!fs.existsSync(adminDir)) {
  console.log('Creating dist/admin directory...');
  fs.mkdirSync(adminDir, { recursive: true });
}

// Kopijuojame config.yml failą
try {
  const sourceConfig = path.join(__dirname, 'public', 'admin', 'config.yml');
  const targetConfig = path.join(adminDir, 'config.yml');
  
  if (fs.existsSync(sourceConfig)) {
    console.log(`Copying from ${sourceConfig} to ${targetConfig}`);
    fs.copyFileSync(sourceConfig, targetConfig);
    console.log('Admin config file copied successfully');
  } else {
    console.error('Source config file does not exist at:', sourceConfig);
  }
} catch (error) {
  console.error('Error copying admin config file:', error);
} 