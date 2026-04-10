export const normalizeFontSize = (size: string): string => {
  const num = parseFloat(size);
  if (isNaN(num)) return size;
  
  // Standard typography scale (approximate)
  const scale = [12, 14, 16, 18, 20, 24, 30, 32, 36, 48, 60, 72];
  const closest = scale.reduce((prev, curr) => 
    Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev
  );
  
  return `${closest}px`;
};

export const normalizeFontWeight = (weight: string | number): number => {
  const num = typeof weight === 'string' ? parseInt(weight) : weight;
  if (isNaN(num)) return 400;
  
  const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  return weights.reduce((prev, curr) => 
    Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev
  );
};

export const normalizeLineHeight = (height: string, fontSize: string): string => {
  if (height === 'normal') return '1.5';
  const hNum = parseFloat(height);
  const fNum = parseFloat(fontSize);
  
  if (isNaN(hNum) || isNaN(fNum)) return '1.5';
  
  // If height is absolute (px), convert to relative
  if (height.includes('px')) {
    return (hNum / fNum).toFixed(2);
  }
  
  return hNum.toString();
};
