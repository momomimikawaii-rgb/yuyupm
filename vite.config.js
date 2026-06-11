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
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekday = weekdays[date.getDay()];
  const hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day}（${weekday}）${hour}:${minute}頃`;
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
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const formatted = formatJapaneseDateTime(getLatestModifiedDate());
        return `export const APP_LAST_UPDATED = ${JSON.stringify(formatted)};`;
      }
    },
    configureServer(server) {
      trackedFiles.forEach((file) => server.watcher.add(file));
      server.watcher.on("change", (file) => {
        if (!trackedFiles.includes(path.resolve(file))) return;
        const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), appLastUpdatedPlugin()],
});
