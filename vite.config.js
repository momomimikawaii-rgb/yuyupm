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