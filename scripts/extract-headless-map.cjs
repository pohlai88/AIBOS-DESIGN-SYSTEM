#!/usr/bin/env node

/**
 * scripts/extract-headless-map.cjs
 * Generates a platform-agnostic JSON map of the Design API.
 */
const fs = require('fs');
const path = require('path');

const CSS_INPUT = path.join(__dirname, '../input.css');
const JSON_OUTPUT = path.join(__dirname, '../dist/headless-map.json');

// Regex to capture semantic class blocks (e.g., .na-card { ... })
const CLASS_BLOCK_REGEX = /\.na-([a-z0-9-]+)\s*\{([^}]+)\}/g;
const PROPERTY_REGEX = /([a-z-]+)\s*:\s*([^;]+);/g;

console.log("🧠 Extracting Headless Design Logic...");

try {
  if (!fs.existsSync(CSS_INPUT)) {
    throw new Error(`input.css not found at ${CSS_INPUT}`);
  }

  const css = fs.readFileSync(CSS_INPUT, 'utf-8');
  
  const headlessMap = {
    _meta: {
      system: "Neo-Analog",
      version: "2.0",
      generated: new Date().toISOString(),
      philosophy: "Headless Semantic Protocol"
    },
    classes: {}
  };

  let match;
  while ((match = CLASS_BLOCK_REGEX.exec(css)) !== null) {
    const className = `na-${match[1]}`;
    const body = match[2];
    
    headlessMap.classes[className] = {};
    
    let propMatch;
    while ((propMatch = PROPERTY_REGEX.exec(body)) !== null) {
      const prop = propMatch[1].trim();
      const value = propMatch[2].trim();
      
      // Convert CSS kebab-case to JS camelCase (e.g., font-size -> fontSize)
      const key = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      
      headlessMap.classes[className][key] = value;
    }
  }

  // Ensure dist directory exists
  if (!fs.existsSync(path.dirname(JSON_OUTPUT))) {
    fs.mkdirSync(path.dirname(JSON_OUTPUT), { recursive: true });
  }

  fs.writeFileSync(JSON_OUTPUT, JSON.stringify(headlessMap, null, 2));
  
  console.log(`✅ Headless Map generated at: ${JSON_OUTPUT}`);
  console.log(`   Captured ${Object.keys(headlessMap.classes).length} semantic classes.`);

} catch (e) {
  console.error("❌ Error extracting headless map:", e);
  process.exit(1);
}
