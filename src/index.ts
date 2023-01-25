import { Current } from "./current"

declare global {
  interface Window {
    Current: typeof Current
  }
}

window.Current = Current

export * from "./current"
