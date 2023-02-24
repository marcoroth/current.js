import { Current } from "./current";
declare global {
    interface Window {
        Current: typeof Current;
    }
}
export * from "./current";
