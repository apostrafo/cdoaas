const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');

// Target specific files that are currently empty
const emptyImageFiles = [
  'knowledge-transfer.jpg',
  'office-location.jpg',
  'practical-implementation.jpg',
  'strategic-data.jpg',
  'data-maturity-model.jpg',
  'approach-bg.jpg',
  'blog-bg.jpg',
  'case-studies-bg.jpg',
  'contact-bg.jpg',
  'hero-bg.jpg',
  'services-bg.jpg',
  'tools-bg.jpg',
  'case-study4.jpg'
];

// Define standard image sizes
const imageSizes = {
  'knowledge-transfer.jpg': { width: 600, height: 400 },
  'office-location.jpg': { width: 600, height: 400 },
  'practical-implementation.jpg': { width: 800, height: 600 },
  'strategic-data.jpg': { width: 600, height: 400 },
  'data-maturity-model.jpg': { width: 800, height: 500 },
  'approach-bg.jpg': { width: 1920, height: 500 },
  'blog-bg.jpg': { width: 1920, height: 500 },
  'case-studies-bg.jpg': { width: 1920, height: 500 },
  'contact-bg.jpg': { width: 1920, height: 500 },
  'hero-bg.jpg': { width: 1920, height: 500 },
  'services-bg.jpg': { width: 1920, height: 500 },
  'tools-bg.jpg': { width: 1920, height: 500 },
  'case-study4.jpg': { width: 800, height: 600 }
};

// Function to create a placeholder image
function createPlaceholderImage(filename, width, height) {
  const imgPath = path.join(__dirname, 'img', filename);
  
  // Check if file exists and is empty
  try {
    const stats = fs.statSync(imgPath);
    if (stats.size > 0) {
      console.log(`Skipped ${imgPath} - file already exists and is not empty`);
      return;
    }
  } catch (err) {
    // File doesn't exist, we'll create it
  }
  
  // Create a canvas with the specified dimensions
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Create a gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#235789');  // Dark blue
  gradient.addColorStop(1, '#45aeb1');  // Teal
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add text with filename and dimensions
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = `${Math.max(16, Math.floor(width / 32))}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${filename}`, width / 2, height / 2 - 20);
  ctx.fillText(`${width} x ${height}`, width / 2, height / 2 + 20);
  
  // Draw grid lines for visual reference
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  
  // Vertical lines
  for (let x = 0; x < width; x += 100) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  // Horizontal lines
  for (let y = 0; y < height; y += 100) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  
  // Save the image
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.8 });
  fs.writeFileSync(imgPath, buffer);
  console.log(`Created placeholder image: ${imgPath}`);
}

// Ensure the img directory exists
const imgDir = path.join(__dirname, 'img');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
  console.log(`Created directory: ${imgDir}`);
}

// Create placeholder images for empty files
emptyImageFiles.forEach(filename => {
  const size = imageSizes[filename] || { width: 800, height: 600 };
  createPlaceholderImage(filename, size.width, size.height);
});

console.log('Empty placeholder image creation completed!'); 