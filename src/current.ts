import { camelize } from "./util"

type CurrentValueObject = { [key: string]: string }
type CurrentValue = string | CurrentValueObject

const currentProxy = {
  get(_target: object, propertyName: string): CurrentValue {
    const result: CurrentValueObject = {}
    const prefix = config.prefix ? `${config.prefix}-` : ""
    const metaName = `${prefix}${propertyName}`

    const exact = document.head.querySelector<HTMLMetaElement>(`meta[name=${metaName}]`)
    const startsWith = Array.from(document.head.querySelectorAll<HTMLMetaElement>(`meta[name^=${metaName}-]`))

    if (startsWith.length > 0) {
      for (const { name, content } of startsWith) {
        const key = camelize(name.slice(metaName.length + 1))
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
export const config = {
  prefix: "current",
}
