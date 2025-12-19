// theme/index.js
// Kallax Design System - React Native Theme Constants
// Neo-Brutalist Dark Theme with Archivo font and Yellow accent

export const colors = {
  // Backgrounds
  bgPrimary: '#0f0f0f',
  bgSecondary: '#1a1a1a',
  
  // Text
  textPrimary: '#f5f5f5',
  textSecondary: '#888888',
  textDisabled: '#666666',
  
  // Brand
  brandYellow: '#FFD53D',
  
  // Functional
  stroke: '#000000',
  success: '#7fb069',
  warning: '#e07a5f',
  error: '#d62828',
};

export const typography = {
  // Headers
  h1: {
    fontFamily: 'Archivo',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 3,
    textTransform: 'uppercase',
    lineHeight: 33.6,
  },
  h2: {
    fontFamily: 'Archivo',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
    lineHeight: 24,
  },
  h3: {
    fontFamily: 'Archivo',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    lineHeight: 20.8,
  },
  
  // Body
  bodyLarge: {
    fontFamily: 'Archivo',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 19.5,
  },
  bodyRegular: {
    fontFamily: 'Archivo',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.6,
  },
  bodySmall: {
    fontFamily: 'Archivo',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18.2,
  },
  
  // Labels
  labelCaps: {
    fontFamily: 'Archivo',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    lineHeight: 14.4,
  },
  labelSmallCaps: {
    fontFamily: 'Archivo',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    lineHeight: 13.2,
  },
  labelTinyCaps: {
    fontFamily: 'Archivo',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    lineHeight: 12,
  },
  
  // Special
  bpmDisplay: {
    fontFamily: 'Archivo',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 22,
  },
  
  // Buttons
  button: {
    fontFamily: 'Archivo',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    lineHeight: 14.4,
  },
  buttonActive: {
    fontFamily: 'Archivo',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
    lineHeight: 14.4,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  xxxxl: 48,
  xxxxxl: 64,
};

export const borders = {
  thin: {
    borderWidth: 2,
    borderColor: colors.stroke,
  },
  medium: {
    borderWidth: 3,
    borderColor: colors.stroke,
  },
  thick: {
    borderWidth: 4,
    borderColor: colors.stroke,
  },
};

export const shadows = {
  // Hard shadows (no blur) - Neo-brutalist style
  // Note: React Native shadows work differently on iOS vs Android
  // Use both shadowOffset (iOS) and elevation (Android) for consistency
  
  small: {
    // iOS
    shadowColor: colors.stroke,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    // Android
    elevation: 3,
  },
  medium: {
    shadowColor: colors.stroke,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  large: {
    shadowColor: colors.stroke,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  xlarge: {
    shadowColor: colors.stroke,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  
  // Pressed states (reduced shadows)
  smallPressed: {
    shadowColor: colors.stroke,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1,
  },
  mediumPressed: {
    shadowColor: colors.stroke,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  largePressed: {
    shadowColor: colors.stroke,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  xlargePressed: {
    shadowColor: colors.stroke,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
};

export const radius = {
  none: 0,
  small: 2,
};

export const iconSizes = {
  tiny: 16,
  small: 20,
  medium: 24,
  large: 28,
  xlarge: 32,
};

// Utility function for press-down animation
export const getPressedStyle = (shadowSize) => {
  const offsets = {
    small: { x: 2, y: 2 },
    medium: { x: 2, y: 2 },
    large: { x: 3, y: 3 },
    xlarge: { x: 3, y: 3 },
  };
  
  const offset = offsets[shadowSize] || { x: 2, y: 2 };
  
  return {
    transform: [
      { translateX: offset.x },
      { translateY: offset.y },
    ],
  };
};

export default {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  radius,
  iconSizes,
  getPressedStyle,
};
