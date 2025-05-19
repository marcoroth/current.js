import { Current } from "./current"

type CurrentValueObject = { [key: string]: string | unknown }
type CurrentValue = string | CurrentValueObject | unknown

// interface CurrentType {
//   [key: string]: CurrentValue
// }

declare global {
  interface CurrentInterface {
    [key: string]: CurrentValue
  }

  interface Window {
    Current: CurrentInterface
  }
}

// declare global {
//   interface Window {
//     Current: typeof Current & {
//       [key: string]: string | undefined
//     }
//   }
// }

window.Current = Current

export * from "./current"
