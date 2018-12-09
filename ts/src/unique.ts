export function uniqueFilter<T>(value: T, index: number, self: T[]): boolean {
  return self.indexOf(value) === index;
}
