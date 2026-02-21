/**
 * Tính km_start, km_end từ ROUTE (cumulative distance) theo ranh giới đoạn.
 * ROUTE từ geojson.json. Chạy: node scripts/blocks-by-km.js
 * Output: mảng BLOCKS (id, name, region, info, km_start, km_end) — paste vào data.js.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const geojson = JSON.parse(fs.readFileSync(path.join(root, "geojson.json"), "utf8"));
const ROUTE = (Array.isArray(geojson[0]) ? geojson : [])
  .map(function (p) { return { lat: p[1], lon: p[0] }; });
if (!ROUTE.length) {
  console.error("geojson.json: không có điểm nào");
  process.exit(1);
}

function distance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const cum = [0];
for (let i = 1; i < ROUTE.length; i++) {
  const prev = ROUTE[i - 1];
  const curr = ROUTE[i];
  cum.push(cum[i - 1] + distance(prev.lat, prev.lon, curr.lat, curr.lon));
}
const totalKm = cum[cum.length - 1];

// Ranh giới index theo ROUTE (geojson). Chỉ giữ địa danh user liệt kê.
const SEGMENTS = [
  { start: 0, end: 14, name: "Buôn Hồ – Cư Bao", region: "Đắk Lắk", info: "Phường An Lạc, An Bình, Thiện An, Thống Nhất, Xã Cư Bao." },
  { start: 15, end: 26, name: "Cư M'gar – Cuôr Đăng", region: "Đắk Lắk", info: "QL14 giáp ranh Buôn Hồ và BMT." },
  { start: 27, end: 45, name: "BMT – Hòa Thuận, Tân Lập, Tân Hòa, Hòa Khánh, Hòa Phú (cầu Sêrêpốk)", region: "Đắk Lắk", info: "TP Buôn Ma Thuột, qua cầu Sêrêpốk, chuẩn bị vào Đắk Nông." },
  { start: 46, end: 77, name: "Cư Jút – Tâm Thắng, Ea T'ling, Trúc Sơn", region: "Đắk Nông", info: "Xã Tâm Thắng, TT Ea T'ling, Xã Trúc Sơn." },
  { start: 78, end: 101, name: "Đắk Mil – Đắk R'la, Đức Mạnh, TT Đắk Mil, Thuận An", region: "Đắk Nông", info: "Xã Đắk R'la, Đức Mạnh, Thị trấn Đắk Mil, Xã Thuận An." },
  { start: 102, end: 128, name: "Đắk Song – Nâm N'Jang, TT Đức An, Trường Xuân", region: "Đắk Nông", info: "Xã Nâm N'Jang, Thị trấn Đức An, Xã Trường Xuân." },
  { start: 129, end: 158, name: "Gia Nghĩa – Nghĩa Thành, Nghĩa Phú, Đắk Nia", region: "Đắk Nông", info: "Phường Nghĩa Thành, Nghĩa Phú, Xã Đắk Nia." },
  { start: 159, end: 182, name: "Đắk R'lấp – Quảng Tín, TT Kiến Đức, Đắk Ru", region: "Đắk Nông", info: "Xã Quảng Tín, Thị trấn Kiến Đức, Xã Đắk Ru." },
  { start: 183, end: 224, name: "Bù Đăng – Nghĩa Trung, Đức Liễu, Minh Hưng, TT Đức Phong", region: "Bình Phước", info: "Xã Nghĩa Trung, Đức Liễu, Minh Hưng, Thị trấn Đức Phong." },
  { start: 225, end: 236, name: "TP Đồng Xoài – Tân Xuân, Tân Bình, Tân Phú (rẽ ĐT741)", region: "Bình Phước", info: "Phường Tân Xuân, Tân Bình, Tân Phú. Rẽ ĐT741 tại đây." },
  { start: 237, end: 248, name: "Đồng Phú (ĐT741) – Thuận Lợi, Tân Lập, Tân Hòa", region: "Bình Phước", info: "Xã Thuận Lợi, Tân Lập, Tân Hòa theo ĐT741." },
  { start: 249, end: 260, name: "Phú Giáo (ĐT741) – An Bình, Phước Vĩnh, Vĩnh Hòa (Cổng Xanh)", region: "Bình Dương", info: "Xã An Bình, TT Phước Vĩnh, Xã Vĩnh Hòa, Ngã ba Cổng Xanh, rẽ ĐT746." },
  { start: 261, end: 284, name: "Bắc Tân Uyên (ĐT746) – Tân Lập, Bình Mỹ, Tân Mỹ, Tx. Tân Uyên", region: "Bình Dương", info: "Xã Tân Lập, Bình Mỹ, Tân Mỹ; Tx. Tân Uyên." },
  { start: 285, end: 296, name: "Tân Uyên (ĐT746) – Uyên Hưng, Hội Nghĩa, Thái Hòa", region: "Bình Dương", info: "Phường Uyên Hưng, Hội Nghĩa, Thái Hòa." },
  { start: 297, end: 298, name: "Dĩ An – Bình Thắng, Đông Hòa", region: "Bình Dương", info: "Phường Bình Thắng, Đông Hòa, giáp Thủ Đức." },
  { start: 299, end: 299, name: "Thủ Đức – Linh Xuân, Linh Trung (Đường 36)", region: "TP.HCM", info: "Phường Linh Xuân, Linh Trung, điểm cuối Đường 36." },
];

const blocks = SEGMENTS.map((s, i) => {
  const startIdx = Math.max(0, Math.min(s.start, cum.length - 1));
  const endIdx = Math.max(0, Math.min(s.end, cum.length - 1));
  let kmEnd = Math.round(cum[endIdx] * 10) / 10;
  if (i === SEGMENTS.length - 1) kmEnd = Math.round(totalKm * 10) / 10;
  return {
    id: String(i + 1),
    km_start: Math.round(cum[startIdx] * 10) / 10,
    km_end: kmEnd,
    name: s.name,
    region: s.region,
    info: s.info,
  };
});

console.error("Total route: " + totalKm.toFixed(1) + " km, " + blocks.length + " blocks");
console.log(
  "window.BLOCKS = [\n" +
    blocks
      .map(
        (b) =>
          '  {id:"' +
          b.id +
          '", km_start:' +
          b.km_start +
          ", km_end:" +
          b.km_end +
          ', name:"' +
          b.name.replace(/"/g, '\\"') +
          '", region:"' +
          b.region.replace(/"/g, '\\"') +
          '", info:"' +
          b.info.replace(/"/g, '\\"') +
          '"}'
      )
      .join(",\n") +
    "\n];"
);
