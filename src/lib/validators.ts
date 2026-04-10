import { z } from 'zod';

export const analyzeSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});
