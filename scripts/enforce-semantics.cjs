#!/usr/bin/env node

/**
 * scripts/enforce-semantics.cjs
 * The "Drift Police" - Enforces Neo-Analog Design API usage.
 */
const fs = require('fs');
const { glob } = require('glob');

// 1. Define the Forbidden Patterns (Drift)
const FORBIDDEN = [
  { regex: /text-\[\d+px\]/g, message: "Hardcoded font size detected. Use .na-h* or .na-data classes." },
  { regex: /p-\[\d+px\]/g, message: "Arbitrary padding detected. Use standard spacing tokens (p-4, p-6)." },
  { regex: /m-\[\d+px\]/g, message: "Arbitrary margin detected. Use standard spacing tokens (m-4, m-6)." },
  { regex: /bg-\[#.*?\]/g, message: "Hardcoded hex background. Use semantic bg-* classes." },
  { regex: /text-\[#.*?\]/g, message: "Hardcoded hex text color. Use semantic text-* classes." },
  { regex: /rounded-\[\d+px\]/g, message: "Hardcoded radius. Use .rounded-card, .rounded-panel." },
  { regex: /font-(sans|serif|mono)/g, message: "Direct font-family usage. Use .na-h*, .na-data, or .na-editorial." },
];

// 2. Define the Allowed Contexts (Files to scan)
const FILES_PATTERN = "**/*.{html,js,jsx,ts,tsx,vue,svelte}";
const IGNORE_PATTERN = ["node_modules/**", "dist/**", ".git/**", "scripts/**", "input.css"];

let errorCount = 0;

console.log("👮 Neo-Analog Drift Police: Scanning for semantic violations...\n");

glob(FILES_PATTERN, { ignore: IGNORE_PATTERN }).then(files => {
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    let fileHasError = false;

    lines.forEach((line, index) => {
      FORBIDDEN.forEach(rule => {
        if (rule.regex.test(line)) {
          if (!fileHasError) {
            console.log(`\n📄 ${file}`);
            fileHasError = true;
          }
          console.log(`   Line ${index + 1}: ❌ ${rule.message}`);
          console.log(`     Code: ${line.trim().substring(0, 80)}...`);
          errorCount++;
        }
      });
    });
  });

  console.log("\n--------------------------------------------------");
  if (errorCount > 0) {
    console.log(`🚨 FAIL: Found ${errorCount} drift violations.`);
    console.log("   Refactor using 'AI_DESIGN_PROTOCOL.md' standards.");
    process.exit(1); 
  } else {
    console.log("✅ PASS: System is 100% Semantic. No drift detected.");
    process.exit(0);
  }
}).catch(err => {
  console.error("Error finding files:", err);
  process.exit(1);
});
