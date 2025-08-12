// Runs the preview server after building with npm run build.
import { preview } from 'vite';

const port = Number(process.env.PORT || 4173);

const server = await preview({
  preview: {
    port,
    strictPort: true,
  },
});

const addr = server.httpServer.address();
const resolvedPort = typeof addr === 'object' ? addr?.port : port;

// Add a print message that lhci can use to determine when ready.
console.log(`Server ready and listening on port ${resolvedPort}`);
server.printUrls?.();
