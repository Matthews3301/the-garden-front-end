export function isSameAddress(a: string | undefined, b: string | undefined) {
  return a?.toLowerCase() === b?.toLowerCase();
}