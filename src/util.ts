export function camelize(string: string) {
  return string.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase())
}
