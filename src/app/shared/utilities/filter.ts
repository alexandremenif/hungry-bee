/**
 * Filters an object by its values.
 */
export function filter<V>(object: Record<string, V>, predicate: (value: V, key: string) => boolean): Record<string, V> {
  return Object.fromEntries<V>(Object.entries<V>(object).filter(([key, value]) => predicate(value, key)));
}
