import path from "path"

export default {
  resolve: {
    alias: {
      "current.js": path.resolve(__dirname, "../dist/current.js"),
    },
  },
  plugins: [],
}
