# Phượt Dak Lak → Sài Gòn

Web app chạy trên **Chrome trên iOS** (và trình duyệt hiện đại), dùng để phát thông tin theo từng đoạn đường khi đi phượt từ Đắk Lắk về Sài Gòn. Dữ liệu block lưu local trong `data.js`, không cần backend.

## Yêu cầu

- HTTPS (bắt buộc cho geolocation, reverse geocoding, speech trên Chrome iOS)
- Trình duyệt hỗ trợ: Geolocation API, Speech Synthesis API

## Cấu trúc

- `index.html` — UI + logic chính (GPS, reverse geocoding, phát audio, xác định block)
- `data.js` — mảng `BLOCKS` (các đoạn ~6–7 km), import bằng `<script src="./data.js"></script>`
- `vercel.json` — cấu hình deploy Vercel

## Deploy lên Vercel

1. Đẩy repo lên GitHub (hoặc GitLab/Bitbucket).
2. Vào [vercel.com](https://vercel.com) → Import project → chọn repo.
3. Root Directory để mặc định, Framework Preset: Other. Deploy.
4. Truy cập URL HTTPS do Vercel cấp (ví dụ `https://xxx.vercel.app`).

Deploy từ CLI:

```bash
npm i -g vercel
vercel
```

## Cập nhật tuyến và BLOCKS

- **Tuyến (ROUTE)**: Nguồn `geojson.json`; app load `route.js` (sync). Sau khi sửa `geojson.json`, chạy `node scripts/geojson-to-js.js` để sinh lại `route.js`.

- **BLOCKS**: Theo **km** (best practice tracking). Chỉ các địa danh đã liệt kê. Sau khi đổi tuyến (geojson), chạy:
  ```bash
  node scripts/blocks-by-km.js
  ```
  Copy output vào `data.js` thay mảng BLOCKS. Mỗi block có `id`, `km_start`, `km_end`, `name`, `region`, `info`. App dùng `getTraveledKM(lat, lon)` → `getCurrentBlock(km)` để xác định block hiện tại.

## Luồng sử dụng

1. Mở web (trên điện thoại, qua HTTPS).
2. Nhấn **Bật âm thanh** (cần cho speech trên Chrome iOS).
3. Cho phép quyền GPS khi trình duyệt hỏi.
4. Điểm GPS đầu tiên được lưu làm điểm xuất phát.
5. App tính quãng đường đã đi, gọi reverse geocoding (debounce ~9s), xác định block và cập nhật nội dung.
6. Khi vào block mới → tự đọc `short_text`. Nút **Đọc lại** dùng để nghe lại nội dung block hiện tại.

## Reverse geocoding

Đang dùng [Nominatim](https://nominatim.openstreetmap.org/) (OpenStreetMap), miễn phí. Nếu cần đổi sang Google Geocoding API, sửa URL và thêm API key trong `index.html` (biến `NOMINATIM_URL` và hàm `reverseGeocode`).
