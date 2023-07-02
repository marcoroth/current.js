import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import filesize from "rollup-plugin-filesize"
import terser from "@rollup/plugin-terser"

const minify = () => {
  return terser({
    mangle: true,
    compress: true,
  })
}

export default [
  {
    input: "src/index.ts",
    output: [
      {
        name: "Current",
        file: "dist/current.umd.js",
        format: "umd",
      },
      {
        file: "dist/current.js",
        format: "esm",
      },
    ],
    plugins: [resolve(), typescript(), filesize(), minify()],
    watch: {
      include: "src/**",
    },
  },
]
