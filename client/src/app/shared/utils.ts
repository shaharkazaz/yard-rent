import { HashMap } from '@datorama/core';

const numberFormatter = Intl.NumberFormat();


export function parseUrl(url: string, params: HashMap = {}): string {
  const parsed = Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replace(`{${key}}`, value);
  }, url);
  return `http://PUBLIC_DNS_PLACEHOLDER:3000/${parsed}`;
}

export function formatNumber(number: number): string {
    return number ? numberFormatter.format(number) : '0';
}

export function formatToKebab(str: string): string {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
}


export function toBase64(file): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

export function stringAsCharSum(str: String): number {
  return [...str].reduce((acc, _, i) => acc + str.charCodeAt(i), 0);
}
