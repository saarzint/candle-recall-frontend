/**
 * Application Theme Configuration
 *
 * This file contains all theme-related color variables and constants.
 * Use these values for consistent theming across the application.
 */

/**
 * Base color palette
 */
export const colors = {
  /**
   * Primary brand color - Teal/Turquoise
   * Used for: buttons, links, primary actions, highlights
   * @example bg-primary, text-primary, border-primary
   */
  primary: '#27A392',

  /**
   * Foreground/Text color - Near-black
   * Used for: body text, headings, primary content
   * @example text-foreground
   */
  foreground: '#18181B',

  /**
   * Background color - White
   * Used for: page backgrounds, card backgrounds
   * @example bg-background
   */
  background: '#FFFFFF',

  /**
   * Muted foreground color - Gray
   * Used for: secondary text, links, less prominent elements
   * @example text-muted-foreground
   */
  mutedForeground: '#71717A',

  /**
   * Secondary color - Light gray
   * Used for: secondary buttons, alternate backgrounds
   * @example bg-secondary
   */
  secondary: '#F4F4F5',

  /**
   * Body background color - Light gray
   * Used for: page body background
   * @example bg-body-background
   */
  bodyBackground: '#F4F4F5',

  /**
   * Destructive color - Red
   * Used for: error borders, destructive actions
   * @example border-destructive
   */
  destructive: '#DC2626',

  /**
   * Destructive foreground color - Light red
   * Used for: error backgrounds
   * @example bg-destructive-foreground
   */
  destructiveForeground: '#FEF2F2',
} as const;

/**
 * CSS variable names for direct usage
 */
export const cssVariables = {
  primary: '--base-primary',
  foreground: '--base-foreground',
  background: '--base-background',
  mutedForeground: '--base-muted-foreground',
  secondary: '--base-secondary',
  bodyBackground: '--base-body-background',
  destructive: '--base-destructive',
  destructiveForeground: '--base-destructive-foreground',
} as const;

/**
 * Tailwind class names for theme colors
 */
export const tailwindClasses = {
  // Background classes
  bg: {
    primary: 'bg-primary',
    foreground: 'bg-foreground',
    background: 'bg-background',
    mutedForeground: 'bg-muted-foreground',
    secondary: 'bg-secondary',
    bodyBackground: 'bg-body-background',
    destructive: 'bg-destructive',
    destructiveForeground: 'bg-destructive-foreground',
  },
  // Text classes
  text: {
    primary: 'text-primary',
    foreground: 'text-foreground',
    background: 'text-background',
    mutedForeground: 'text-muted-foreground',
    secondary: 'text-secondary',
    destructive: 'text-destructive',
  },
  // Border classes
  border: {
    primary: 'border-primary',
    foreground: 'border-foreground',
    background: 'border-background',
    mutedForeground: 'border-muted-foreground',
    secondary: 'border-secondary',
    destructive: 'border-destructive',
  },
  // Hover state classes
  hover: {
    bg: {
      primary: 'hover:bg-primary',
      foreground: 'hover:bg-foreground',
      background: 'hover:bg-background',
      mutedForeground: 'hover:bg-muted-foreground',
      secondary: 'hover:bg-secondary',
    },
    text: {
      primary: 'hover:text-primary',
      foreground: 'hover:text-foreground',
      background: 'hover:text-background',
      mutedForeground: 'hover:text-muted-foreground',
      secondary: 'hover:text-secondary',
    },
  },
  // Focus state classes
  focus: {
    ring: {
      primary: 'focus:ring-primary',
      foreground: 'focus:ring-foreground',
      mutedForeground: 'focus:ring-muted-foreground',
      secondary: 'focus:ring-secondary',
    },
  },
} as const;

/**
 * Helper function to get CSS variable value
 * @param varName - CSS variable name (without the -- prefix)
 * @returns CSS variable reference
 */
export const getCssVar = (varName: keyof typeof cssVariables): string => {
  return `var(${cssVariables[varName]})`;
};

/**
 * Type for color keys
 */
export type ColorKey = keyof typeof colors;

/**
 * Type for Tailwind class categories
 */
export type TailwindClassCategory = keyof typeof tailwindClasses;

export default colors;
