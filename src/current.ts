import { camelize } from "./util"

type CurrentValueObject = { [key: string]: string }
type CurrentValue = string | CurrentValueObject

const currentProxy = {
  get(_target: object, propertyName: string): CurrentValue {
    const result: CurrentValueObject = {}
    const prefix = `current-${propertyName}`

    const exact = document.head.querySelector<HTMLMetaElement>(`meta[name=${prefix}]`)
    const startsWith = Array.from(document.head.querySelectorAll<HTMLMetaElement>(`meta[name^=${prefix}-]`))

    if (startsWith.length > 0) {
      for (const { name, content } of startsWith) {
        const key = camelize(name.slice(prefix.length + 1))
        if (result[key]) continue
        result[key] = content
      }
    } else if (exact) {
      return exact.content
    }

    return result
  },
}

export const Current = new Proxy({}, currentProxy)
