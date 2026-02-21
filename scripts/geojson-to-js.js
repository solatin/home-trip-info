/**
 * Chuyển geojson.json → route.js (window.ROUTE) để load sync bằng <script>, không cần fetch.
 * Chạy: node scripts/geojson-to-js.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const geojson = JSON.parse(fs.readFileSync(path.join(root, "geojson.json"), "utf8"));
const points = Array.isArray(geojson[0]) ? geojson : [];
const ROUTE = points.map(function (p) { return { lat: p[1], lon: p[0] }; });

const lines = [
  "// Tuyến từ geojson.json (" + ROUTE.length + " điểm) — sinh bởi scripts/geojson-to-js.js",
  "window.ROUTE = [",
  ...ROUTE.map(function (p) { return "  {lat:" + p.lat + ", lon:" + p.lon + "},"; }),
  "];"
];
fs.writeFileSync(path.join(root, "route.js"), lines.join("\n"), "utf8");
console.log("Đã ghi route.js: " + ROUTE.length + " điểm.");
