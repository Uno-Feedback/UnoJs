import {fileURLToPath} from 'url';
import {defineConfig} from 'vite';

export default defineConfig(async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  return {
    root: __dirname + 'example',
  };
});
