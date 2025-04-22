const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { createCanvas } = require('canvas');

// Find all image references in the source files
function findImageReferences() {
  try {
    // This command searches for all image references in Astro files with proper escaping
    const grep = execSync("grep -r 'src=\"/img/' ../src").toString();
    
    // Extract the image paths
    const imageRefs = [];
    const regex = /src="(\/img\/[^"]+)"/g;
    let match;
    
    const lines = grep.split('\n');
    for (const line of lines) {
      if (!line) continue;
      
      // Reset regex for each line
      regex.lastIndex = 0;
      while ((match = regex.exec(line)) !== null) {
        const imgPath = match[1];
        if (imgPath && !imageRefs.includes(imgPath)) {
          imageRefs.push(imgPath);
        }
      }
    }
    
    return imageRefs;
  } catch (error) {
    console.error('Error finding image references:', error.message);
    return [];
  }
}

// Verify that all referenced images exist
function verifyImages(imageRefs) {
  const missingImages = [];
  
  for (const ref of imageRefs) {
    // Remove the leading slash
    const relativePath = ref.startsWith('/') ? ref.substring(1) : ref;
    const fullPath = path.join(__dirname, relativePath);
    
    if (!fs.existsSync(fullPath)) {
      missingImages.push(relativePath);
      console.error(`Missing image: ${relativePath}`);
    } else {
      // Check if the file is empty
      const stats = fs.statSync(fullPath);
      if (stats.size === 0) {
        missingImages.push(relativePath);
        console.error(`Empty image file: ${relativePath}`);
      } else {
        console.log(`✓ Found: ${relativePath}`);
      }
    }
  }
  
  return missingImages;
}

// Create placeholder images for missing references
function createPlaceholders(missingImages) {
  for (const imgPath of missingImages) {
    const fullPath = path.join(__dirname, imgPath);
    const dir = path.dirname(fullPath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
    
    // Default size based on file type
    const extension = path.extname(imgPath).toLowerCase();
    let width = 800;
    let height = 600;
    
    // Adjust size based on the filename pattern
    const filename = path.basename(imgPath);
    if (filename.includes('hero') || filename.includes('bg')) {
      width = 1920;
      height = 500;
    } else if (filename.includes('testimonial')) {
      width = 250;
      height = 250;
    } else if (filename.includes('team')) {
      width = 300;
      height = 300;
    } else if (filename.includes('tool')) {
      width = 500;
      height = 350;
    }
    
    // For SVG files, create a simple SVG
    if (extension === '.svg') {
      const svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#235789"/>
        <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle">${filename}</text>
      </svg>`;
      
      fs.writeFileSync(fullPath, svgContent);
      console.log(`Created SVG placeholder: ${imgPath}`);
    } else {
      // For image files, create a canvas image
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
      fs.writeFileSync(fullPath, buffer);
      console.log(`Created placeholder image: ${imgPath}`);
    }
  }
}

// Main function
function main() {
  console.log('Searching for image references in the Astro components...');
  const imageRefs = findImageReferences();
  console.log(`Found ${imageRefs.length} image references.`);
  
  console.log('\nVerifying image files...');
  const missingImages = verifyImages(imageRefs);
  
  if (missingImages.length > 0) {
    console.log(`\nCreating ${missingImages.length} placeholder images...`);
    createPlaceholders(missingImages);
  } else {
    console.log('\nAll images exist and are not empty!');
  }
  
  console.log('\nImage verification and placeholder creation completed!');
}

main(); 