/**
 * ESLint Plugin for Neo-Analog Design System
 * Enforces semantic class usage and prevents drift
 */

// Note: SEMANTIC_CLASSES list kept for future use (e.g., autocomplete suggestions)

// Forbidden patterns
const FORBIDDEN_PATTERNS = [
  { regex: /text-\[\d+px\]/, message: 'Use semantic typography classes (.na-h*, .na-data) instead of arbitrary font sizes' },
  { regex: /p-\[\d+px\]/, message: 'Use standard spacing tokens (p-4, p-6) instead of arbitrary padding' },
  { regex: /m-\[\d+px\]/, message: 'Use standard spacing tokens (m-4, m-6) instead of arbitrary margin' },
  { regex: /bg-\[#.*?\]/, message: 'Use semantic color classes (bg-paper, bg-void) instead of hardcoded hex colors' },
  { regex: /text-\[#.*?\]/, message: 'Use semantic color classes (text-lux, text-clay) instead of hardcoded hex colors' },
  { regex: /rounded-\[\d+px\]/, message: 'Use semantic radius classes (rounded-card, rounded-panel) instead of arbitrary border-radius' },
];

export default {
  meta: {
    name: 'eslint-plugin-neo-analog',
    version: '1.0.0',
  },
  rules: {
    'no-arbitrary-values': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow arbitrary Tailwind values in favor of semantic classes',
          category: 'Best Practices',
          recommended: true,
        },
        fixable: null,
        schema: [],
      },
      create(context) {
        return {
          Literal(node) {
            if (typeof node.value !== 'string') return;
            
            // Check for forbidden patterns in className strings
            FORBIDDEN_PATTERNS.forEach(({ regex, message }) => {
              if (regex.test(node.value)) {
                context.report({
                  node,
                  message: `Neo-Analog: ${message}`,
                });
              }
            });
          },
          TemplateLiteral(node) {
            // Check template literals (e.g., className with arbitrary values)
            const text = node.quasis.map(q => q.value.raw).join('');
            FORBIDDEN_PATTERNS.forEach(({ regex, message }) => {
              if (regex.test(text)) {
                context.report({
                  node,
                  message: `Neo-Analog: ${message}`,
                });
              }
            });
          },
        };
      },
    },
    'prefer-semantic-classes': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Suggest semantic classes for common patterns',
          category: 'Best Practices',
          recommended: true,
        },
        fixable: null,
        schema: [],
      },
      create(context) {
        return {
          Literal(node) {
            if (typeof node.value !== 'string') return;
            
            // Suggest semantic classes for common patterns
            const suggestions = [
              { pattern: /text-(xl|2xl|3xl)\s+font-(bold|semibold)/, suggest: 'na-h1, na-h2, or na-h3' },
              { pattern: /text-(sm|base)\s+font-mono/, suggest: 'na-data' },
              { pattern: /bg-(gray|zinc)-(900|950)/, suggest: 'na-card or na-panel' },
            ];
            
            suggestions.forEach(({ pattern, suggest }) => {
              if (pattern.test(node.value)) {
                context.report({
                  node,
                  message: `Neo-Analog: Consider using semantic classes (${suggest}) instead of utility combinations`,
                });
              }
            });
          },
        };
      },
    },
  },
};

