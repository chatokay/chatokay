export function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]) {
  return (Object.keys(obj) as K[]).reduce((ret, key) => {
    if (!keys.includes(key))
      Object.assign(ret, { [key]: obj[key] })
    return ret
  }, {} as Omit<T, typeof keys[number]>)
}

export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]) {
  return keys.reduce((ret, key) => {
    ret[key] = obj[key]
    return ret
  }, {} as Pick<T, typeof keys[number]>)
}

export function objectSerialize(obj: Record<string, any>) {
  return Object.keys(obj).sort().map(key => `${key}=${obj[key]}`).join('&')
}

/** remove the field with a value of `null`, `undefined`, `''` from the object */
export function omitNullish<T extends Record<string, any>>(obj: T, includeEmptyString = true) {
  return Object.entries(obj).reduce((prev, [key, val]) => {
    if (val === null || val === undefined || (includeEmptyString && val === ''))
      return prev
    prev[key as keyof T] = val
    return prev
  }, {} as T)
}
