import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  external: ["react", "wagmi", "viem", "@tanstack/react-query"],
  banner: {
    js: '"use client";',
  },
});

