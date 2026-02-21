/**
 * Script: tính cumulative distance từ ROUTE, map BLOCKS từ km_start/km_end sang route_start_index, route_end_index.
 * ROUTE từ geojson.json. Chạy: node scripts/blocks-by-route-index.js
 * Đọc data.js cho BLOCKS (nếu cần), ghi kết quả ra stdout.
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

const cumulativeDistance = [0];
for (let i = 1; i < ROUTE.length; i++) {
  const prev = ROUTE[i - 1];
  const curr = ROUTE[i];
  cumulativeDistance.push(
    cumulativeDistance[i - 1] + distance(prev.lat, prev.lon, curr.lat, curr.lon)
  );
}

const totalKm = cumulativeDistance[cumulativeDistance.length - 1];
console.error("ROUTE length: " + ROUTE.length + " points, total km: " + totalKm.toFixed(1));

// Địa danh theo lộ trình: Đắk Lắk → Đắk Nông → Bình Phước (QL14, Đồng Xoài rẽ ĐT741) → Bình Dương (ĐT741, ĐT746) → TP.HCM
const OLD_BLOCKS = [
  { id: "1", km_start: 0, km_end: 7, name: "Buôn Hồ – Cư Bao", region: "Đắk Lắk", info: "Phường An Lạc, An Bình, Thiện An, Thống Nhất, Xã Cư Bao." },
  { id: "2", km_start: 7, km_end: 14, name: "Cư M'gar – Cuôr Đăng", region: "Đắk Lắk", info: "QL14 giáp ranh Buôn Hồ và BMT." },
  { id: "3", km_start: 14, km_end: 21, name: "BMT – Hòa Thuận (Đạt Lý)", region: "Đắk Lắk", info: "Xã Hòa Thuận, cửa ngõ BMT." },
  { id: "4", km_start: 21, km_end: 28, name: "BMT – Tân Lập, Tân Hòa", region: "Đắk Lắk", info: "Phường Tân Lập, Tân Hòa, nội thành." },
  { id: "5", km_start: 28, km_end: 35, name: "BMT – Hòa Khánh, Hòa Phú (cầu Sêrêpốk)", region: "Đắk Lắk", info: "Qua cầu Sêrêpốk, chuẩn bị vào Đắk Nông." },
  { id: "6", km_start: 35, km_end: 42, name: "Cư Jút – Tâm Thắng", region: "Đắk Nông", info: "Xã Tâm Thắng." },
  { id: "7", km_start: 42, km_end: 49, name: "Cư Jút – Ea T'ling", region: "Đắk Nông", info: "Thị trấn Ea T'ling." },
  { id: "8", km_start: 49, km_end: 56, name: "Cư Jút – Trúc Sơn", region: "Đắk Nông", info: "Xã Trúc Sơn." },
  { id: "9", km_start: 56, km_end: 63, name: "Đắk Mil – Đắk R'la", region: "Đắk Nông", info: "Xã Đắk R'la." },
  { id: "10", km_start: 63, km_end: 70, name: "Đắk Mil – Đức Mạnh", region: "Đắk Nông", info: "Xã Đức Mạnh." },
  { id: "11", km_start: 70, km_end: 77, name: "Đắk Mil – Thị trấn Đắk Mil", region: "Đắk Nông", info: "Thị trấn Đắk Mil, đầy đủ dịch vụ." },
  { id: "12", km_start: 77, km_end: 84, name: "Đắk Mil – Thuận An", region: "Đắk Nông", info: "Xã Thuận An." },
  { id: "13", km_start: 84, km_end: 91, name: "Đắk Song – Nâm N'Jang", region: "Đắk Nông", info: "Xã Nâm N'Jang." },
  { id: "14", km_start: 91, km_end: 98, name: "Đắk Song – Thị trấn Đức An", region: "Đắk Nông", info: "Thị trấn Đức An." },
  { id: "15", km_start: 98, km_end: 105, name: "Đắk Song – Trường Xuân", region: "Đắk Nông", info: "Xã Trường Xuân." },
  { id: "16", km_start: 105, km_end: 112, name: "Gia Nghĩa – Nghĩa Thành", region: "Đắk Nông", info: "Phường Nghĩa Thành." },
  { id: "17", km_start: 112, km_end: 119, name: "Gia Nghĩa – Nghĩa Phú", region: "Đắk Nông", info: "Phường Nghĩa Phú." },
  { id: "18", km_start: 119, km_end: 126, name: "Gia Nghĩa – Đắk Nia", region: "Đắk Nông", info: "Xã Đắk Nia." },
  { id: "19", km_start: 126, km_end: 133, name: "Đắk R'lấp – Quảng Tín", region: "Đắk Nông", info: "Xã Quảng Tín." },
  { id: "20", km_start: 133, km_end: 140, name: "Đắk R'lấp – Thị trấn Kiến Đức", region: "Đắk Nông", info: "Thị trấn Kiến Đức." },
  { id: "21", km_start: 140, km_end: 147, name: "Đắk R'lấp – Đắk Ru", region: "Đắk Nông", info: "Xã Đắk Ru, chuẩn bị sang Bình Phước." },
  { id: "22", km_start: 147, km_end: 154, name: "Bù Đăng – Nghĩa Trung", region: "Bình Phước", info: "Xã Nghĩa Trung." },
  { id: "23", km_start: 154, km_end: 161, name: "Bù Đăng – Đức Liễu", region: "Bình Phước", info: "Xã Đức Liễu." },
  { id: "24", km_start: 161, km_end: 168, name: "Bù Đăng – Minh Hưng", region: "Bình Phước", info: "Xã Minh Hưng." },
  { id: "25", km_start: 168, km_end: 175, name: "Bù Đăng – Thị trấn Đức Phong", region: "Bình Phước", info: "Thị trấn Đức Phong." },
  { id: "26", km_start: 175, km_end: 182, name: "Đồng Phú (QL14) – Đồng Tâm, Tân Phước", region: "Bình Phước", info: "Xã Đồng Tâm, Tân Phước." },
  { id: "27", km_start: 182, km_end: 189, name: "TP Đồng Xoài – Tân Xuân, Tân Bình, Tân Phú", region: "Bình Phước", info: "Phường Tân Xuân, Tân Bình, Tân Phú. Rẽ ĐT741 tại đây." },
  { id: "28", km_start: 189, km_end: 196, name: "Đồng Phú (ĐT741) – Thuận Lợi, Tân Lập, Tân Hòa", region: "Bình Phước", info: "Xã Thuận Lợi, Tân Lập, Tân Hòa theo ĐT741." },
  { id: "29", km_start: 196, km_end: 203, name: "Phú Giáo (ĐT741) – An Bình, Phước Vĩnh", region: "Bình Dương", info: "Xã An Bình, Thị trấn Phước Vĩnh." },
  { id: "30", km_start: 203, km_end: 210, name: "Phú Giáo (ĐT741) – Vĩnh Hòa (Cổng Xanh)", region: "Bình Dương", info: "Xã Vĩnh Hòa, Ngã ba Cổng Xanh, rẽ ĐT746." },
  { id: "31", km_start: 210, km_end: 217, name: "Bắc Tân Uyên (ĐT746) – Tân Lập, Bình Mỹ, Tân Mỹ", region: "Bình Dương", info: "Xã Tân Lập, Bình Mỹ, Tân Mỹ." },
  { id: "32", km_start: 217, km_end: 224, name: "Tân Uyên (ĐT746) – Uyên Hưng, Hội Nghĩa", region: "Bình Dương", info: "Phường Uyên Hưng, Hội Nghĩa." },
  { id: "33", km_start: 224, km_end: 231, name: "Tân Uyên (ĐT746) – Thái Hòa", region: "Bình Dương", info: "Phường Thái Hòa." },
  { id: "34", km_start: 231, km_end: 238, name: "Dĩ An – Bình Thắng, Đông Hòa", region: "Bình Dương", info: "Phường Bình Thắng, Đông Hòa, giáp Thủ Đức." },
  { id: "35", km_start: 238, km_end: 245, name: "Thủ Đức – Linh Xuân, Linh Trung", region: "TP.HCM", info: "Phường Linh Xuân, Linh Trung." },
  { id: "36", km_start: 245, km_end: 252, name: "Thủ Đức – Đường 36 (điểm cuối)", region: "TP.HCM", info: "Hướng về điểm cuối tại Đường 36." },
  { id: "37", km_start: 252, km_end: 259, name: "Thủ Đức – Đường 36 (điểm cuối)", region: "TP.HCM", info: "Kết thúc hành trình." },
  { id: "38", km_start: 259, km_end: 266, name: "Thủ Đức – Đường 36 (điểm cuối)", region: "TP.HCM", info: "Kết thúc hành trình." },
  { id: "39", km_start: 266, km_end: 273, name: "Thủ Đức – Đường 36 (điểm cuối)", region: "TP.HCM", info: "Kết thúc hành trình." },
  { id: "40", km_start: 273, km_end: 280, name: "Thủ Đức – Đường 36 (điểm cuối)", region: "TP.HCM", info: "Kết thúc hành trình." },
  { id: "41", km_start: 280, km_end: 287, name: "Thủ Đức – Đường 36 (điểm cuối)", region: "TP.HCM", info: "Kết thúc hành trình." },
  { id: "42", km_start: 287, km_end: 294, name: "Thủ Đức – Đường 36 (điểm cuối)", region: "TP.HCM", info: "Kết thúc hành trình." },
  { id: "43", km_start: 294, km_end: 301, name: "Thủ Đức – Đường 36 (điểm cuối)", region: "TP.HCM", info: "Kết thúc hành trình." },
  { id: "44", km_start: 301, km_end: 308, name: "Thủ Đức – Đường 36 (điểm cuối)", region: "TP.HCM", info: "Kết thúc hành trình." },
  { id: "45", km_start: 308, km_end: 315, name: "Thủ Đức – Đường 36 (điểm cuối)", region: "TP.HCM", info: "Kết thúc hành trình." },
];

function findStartIndex(km) {
  for (let i = 0; i < cumulativeDistance.length; i++) {
    if (cumulativeDistance[i] >= km) return i;
  }
  return cumulativeDistance.length - 1;
}
function findEndIndex(km) {
  for (let i = cumulativeDistance.length - 1; i >= 0; i--) {
    if (cumulativeDistance[i] < km) return i;
  }
  return 0;
}

const newBlocks = [];
for (const b of OLD_BLOCKS) {
  const startIdx = findStartIndex(b.km_start);
  let endIdx = findEndIndex(b.km_end);
  if (endIdx < startIdx) endIdx = startIdx;
  const midIdx = Math.floor((startIdx + endIdx) / 2);
  const ref = ROUTE[midIdx];
  newBlocks.push({
    id: b.id,
    route_start_index: startIdx,
    route_end_index: endIdx,
    ref_lat: Math.round(ref.lat * 1e6) / 1e6,
    ref_lon: Math.round(ref.lon * 1e6) / 1e6,
    name: b.name,
    region: b.region,
    info: b.info,
  });
}

console.error("\n--- Block index ranges & ref lat,lon (kiểm tra địa danh) ---");
newBlocks.forEach((b) => {
  console.error(
    b.id.padStart(2) +
      " " +
      b.name.substring(0, 32).padEnd(34) +
      " [" +
      b.route_start_index +
      ".." +
      b.route_end_index +
      "] ref " +
      b.ref_lat +
      ", " +
      b.ref_lon
  );
});

console.error("\n--- JS array (paste vào data.js window.BLOCKS) ---\n");
console.log(
  "window.BLOCKS = [\n" +
    newBlocks
      .map(
        (b) =>
          '  {id:"' +
          b.id +
          '", route_start_index:' +
          b.route_start_index +
          ", route_end_index:" +
          b.route_end_index +
          ", ref_lat:" +
          b.ref_lat +
          ", ref_lon:" +
          b.ref_lon +
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
