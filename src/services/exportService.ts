import { DesignTokens } from "@/types/designTokens";

export const exportToJSON = (tokens: DesignTokens) => {
  return JSON.stringify(tokens, null, 2);
};

export const exportToCSS = (tokens: DesignTokens) => {
  let css = ':root {\n';
  
  // Colors
  Object.entries(tokens.colors).forEach(([key, value]) => {
    css += `  --color-${key}: ${value};\n`;
  });
  
  // Typography
  css += `  --font-family: ${tokens.typography.fontFamily};\n`;
  css += `  --font-size-h1: ${tokens.typography.h1};\n`;
  css += `  --font-size-h2: ${tokens.typography.h2};\n`;
  css += `  --font-size-body: ${tokens.typography.body};\n`;
  
  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    css += `  --spacing-${key}: ${value};\n`;
  });
  
  // Radius
  Object.entries(tokens.radius).forEach(([key, value]) => {
    css += `  --radius-${key}: ${value};\n`;
  });
  
  css += '}';
  return css;
};

export const exportToTailwind = (tokens: DesignTokens) => {
  const config = {
    theme: {
      extend: {
        colors: tokens.colors,
        spacing: tokens.spacing,
        borderRadius: tokens.radius,
        fontFamily: {
          sans: [tokens.typography.fontFamily, 'sans-serif'],
        },
      },
    },
  };
  
  return `module.exports = ${JSON.stringify(config, null, 2)};`;
};

export const exportToSCSS = (tokens: DesignTokens) => {
  let scss = '';
  
  Object.entries(tokens.colors).forEach(([key, value]) => {
    scss += `$color-${key}: ${value};\n`;
  });
  
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    scss += `$spacing-${key}: ${value};\n`;
  });
  
  scss += `$font-family: ${tokens.typography.fontFamily};\n`;
  
  return scss;
};
