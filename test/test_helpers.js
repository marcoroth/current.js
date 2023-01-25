export function metaCleanup() {
  for (const meta of document.head.querySelectorAll("meta")) {
    meta.remove()
  }
}

export async function meta(html) {
  await document.head.insertAdjacentHTML("beforeend", html)
}
