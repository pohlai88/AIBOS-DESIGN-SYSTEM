import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes with design system classes
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution
 * 
 * @param inputs - Class values (strings, objects, arrays)
 * @returns Merged class string
 * 
 * @example
 * cn("na-btn", "na-btn-primary", isActive && "na-btn-active")
 * cn("px-4", "py-2", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

