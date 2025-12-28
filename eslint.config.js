export default [
  {
    ignores: [
      "node_modules/**",
      "style.css",
      "*.min.js",
      "*.min.css",
      "tailwindcss-windows-x64.exe",
      "pnpm-lock.yaml",
      "postcss.config.js",
      "tailwind.config.js",
    ],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",
      "no-undef": "off", // Allow undefined globals for config files
    },
  },
];

