import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: '@mind-elixir/export-xmind',
      // the proper extensions will be added
      fileName: 'export-xmind',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['file-saver', 'jszip'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'JSZip',
        },
      },
    },
  },
})
