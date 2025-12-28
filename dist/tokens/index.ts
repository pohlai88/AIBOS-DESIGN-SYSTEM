/**
 * Neo-Analog Design System Tokens (Runtime)
 * Auto-generated from input.css
 */

import tokensData from '../tokens.json';

export const tokens = tokensData as const;

export type Tokens = typeof tokens;

export function getCSSVar(path: string): string {
  return `var(--${path.replace(/\./g, '-')})`;
}
