export const normalizeSpacingValue = (value: string): string => {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  
  if (num === 0) return '0px';
  
  // Standard spacing scale (4px based)
  const scale = [2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96];
  const closest = scale.reduce((prev, curr) => 
    Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev
  );
  
  return `${closest}px`;
};

export const generateSpacingScale = (): Record<string, string> => {
  
  const scale: Record<string, string> = {
    xs: normalizeSpacingValue('4px'),
    sm: normalizeSpacingValue('8px'),
    md: normalizeSpacingValue('16px'),
    lg: normalizeSpacingValue('24px'),
    xl: normalizeSpacingValue('32px'),
  };
  
  // If we found specific spacing values, we could try to map them to the scale
  // But for now, we'll return a normalized default scale based on the request
  return scale;
};
