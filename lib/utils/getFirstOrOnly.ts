export function getFirstOrOnly<T>(value: T | T[]): T {
  return Array.isArray(value) ? value[0] : value;
}
