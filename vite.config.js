import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const virtualModuleId = "virtual:app-last-updated";
const resolvedVirtualModuleId = "\0" + virtualModuleId;

const trackedFiles = ["src/App.jsx", "src/style.css"].map((file) =>
  path.resolve(__dirname, file)
);

function formatJapaneseDateTime(date) {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value])
  );

  return `${parts.year}/${parts.month}/${parts.day}（${parts.weekday}）${parts.hour}:${parts.minute}頃`;
}

function getLatestModifiedDate() {
  const latest = trackedFiles.reduce((max, file) => {
    const mtime = fs.statSync(file).mtime.getTime();
    return Math.max(max, mtime);
  }, 0);

  return new Date(latest);
}

function appLastUpdatedPlugin() {
  return {
    name: "app-last-updated",

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {

        // ↓ ここを変更
        const formatted = formatJapaneseDateTime(new Date());

        return `export const APP_LAST_UPDATED = ${JSON.stringify(formatted)};`;
      }
    },

    configureServer(server) {
      trackedFiles.forEach((file) => server.watcher.add(file));

      server.watcher.on("change", (file) => {
        if (!trackedFiles.includes(path.resolve(file))) return;

        const mod = server.moduleGraph.getModuleById(
          resolvedVirtualModuleId
        );

        if (mod) {
          server.moduleGraph.invalidateModule(mod);
        }

        server.ws.send({ type: "full-reload" });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), appLastUpdatedPlugin()],
});