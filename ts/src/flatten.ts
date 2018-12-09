export function flatten(arr: any[][], result: any[] = []): any[] {
  for (let i = 0, len = arr.length; i < len; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
}
