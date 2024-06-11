export function noop(any: any) {
  if (import.meta.env.DEV)
    console.error(any)
}
