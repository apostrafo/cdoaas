const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Define standard image sizes for different types of images
const imageSizes = {
  // Background/Hero images
  'img/hero-background.jpg': { width: 1920, height: 1080 },
  'img/approach-header.jpg': { width: 1920, height: 600 },
  'img/services-header.jpg': { width: 1920, height: 600 },
  'img/contact-header.jpg': { width: 1920, height: 600 },
  'img/case-studies-header.jpg': { width: 1920, height: 600 },
  
  // Card images
  'img/card-1.jpg': { width: 800, height: 600 },
  'img/card-2.jpg': { width: 800, height: 600 },
  'img/card-3.jpg': { width: 800, height: 600 },
  
  // Case study images
  'img/case-study1.jpg': { width: 1200, height: 800 },
  'img/case-study2.jpg': { width: 1200, height: 800 },
  'img/case-study3.jpg': { width: 1200, height: 800 },
  
  // Blog post images
  'img/blog-1.jpg': { width: 800, height: 500 },
  'img/blog-2.jpg': { width: 800, height: 500 },
  'img/blog-3.jpg': { width: 800, height: 500 },
  
  // Tool images
  'img/tool-1.jpg': { width: 600, height: 400 },
  'img/tool-2.jpg': { width: 600, height: 400 },
  'img/tool-3.jpg': { width: 600, height: 400 },
  
  // Testimonial profile images
  'img/testimonial1.jpg': { width: 300, height: 300 },
  'img/testimonial2.jpg': { width: 300, height: 300 },
  'img/testimonial3.jpg': { width: 300, height: 300 },
  
  // Team member images
  'img/team-1.jpg': { width: 400, height: 500 },
  'img/team-2.jpg': { width: 400, height: 500 },
  'img/team-3.jpg': { width: 400, height: 500 },
  
  // Other images
  'img/strategy-meeting.jpg': { width: 1000, height: 667 },
  'img/data-analysis.jpg': { width: 1000, height: 667 },
  'img/office-meeting.jpg': { width: 1000, height: 667 },
  'img/comparison-chart.jpg': { width: 1000, height: 667 }
};

// Function to create a placeholder image
function createPlaceholderImage(width, height, filename) {
  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#2c3e50');
  gradient.addColorStop(1, '#3498db');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add text with filename and dimensions
  ctx.font = `${Math.max(20, Math.floor(width / 20))}px Arial`;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Get just the filename without the path
  const displayName = path.basename(filename);
  ctx.fillText(displayName, width / 2, height / 2 - 30);
  ctx.fillText(`${width} × ${height}`, width / 2, height / 2 + 30);
  
  // Return image buffer
  return canvas.toBuffer('image/jpeg');
}

// Create img directory if it doesn't exist
const imgBaseDir = path.resolve(__dirname, 'img');
if (!fs.existsSync(imgBaseDir)) {
  fs.mkdirSync(imgBaseDir, { recursive: true });
  console.log('Created img directory');
}

// Create placeholder images for each entry in imageSizes
Object.entries(imageSizes).forEach(([filename, dimensions]) => {
  const fullPath = path.resolve(__dirname, filename);
  const dirPath = path.dirname(fullPath);
  
  // Check if directory exists, create it if not
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
  
  // Check if file exists and is empty (or doesn't exist)
  const fileExists = fs.existsSync(fullPath);
  const fileEmpty = fileExists ? fs.statSync(fullPath).size === 0 : true;
  
  if (!fileExists || fileEmpty) {
    try {
      // Create placeholder image and save it
      const imageBuffer = createPlaceholderImage(
        dimensions.width, 
        dimensions.height, 
        filename
      );
      fs.writeFileSync(fullPath, imageBuffer);
      console.log(`Created placeholder image: ${filename} (${dimensions.width}×${dimensions.height})`);
    } catch (error) {
      console.error(`Error creating placeholder for ${filename}:`, error);
    }
  } else {
    console.log(`Skipped ${filename} - file already exists and is not empty`);
  }
});

console.log('Placeholder image creation completed!'); 