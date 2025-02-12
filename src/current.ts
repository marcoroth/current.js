import { camelize } from "./util"

type CurrentValueObject = { [key: string]: string }
type CurrentValue = string | CurrentValueObject
type CurrentType = { [key: string]: CurrentValue | undefined }

const currentProxy = {
  get(_target: object, propertyName: string): CurrentValue {
    const result: CurrentValueObject = {}
    const prefix = config.prefix ? `${config.prefix}-` : ""
    const metaName = `${prefix}${propertyName}`

    const startsWith = document.head.querySelectorAll<HTMLMetaElement>(`meta[name^=${metaName}-]`)

    if (startsWith.length > 0) {
      startsWith.forEach(({ name, content }) => {
        const key = camelize(name.slice(metaName.length + 1))
        if (result[key]) return
        result[key] = content
      })
      return result
    }

    const exact = document.head.querySelector<HTMLMetaElement>(`meta[name=${metaName}]`)
    return exact ? exact.content : result
  },
}

export const Current: CurrentType = new Proxy({}, currentProxy)
export const config = {
  prefix: "current",
}
