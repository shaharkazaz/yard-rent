import { HashMap } from '@datorama/core';

export function parseUrl(url: string, params: HashMap = {}): string {
  const parsed = Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replace(`{${key}}`, value);
  }, url);
  return `http://localhost:3000/${parsed}`;
}
