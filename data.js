/**
 * data.js - Dữ liệu các đoạn đường (block) cho tuyến Dak Lak → Sài Gòn
 * Mỗi block ~6–7 km, tương đương ~10 phút chạy xe.
 * Import trong index.html: <script src="./data.js"></script>
 * Có thể thay thế nội dung khi có file JSON thông tin chi tiết.
 */

// eslint-disable-next-line no-unused-vars
const BLOCKS = [
  {
    id: "block_01",
    start_km: 0,
    end_km: 6.7,
    province: "Đắk Lắk",
    district: "Ea H'leo",
    short_text: "Bạn đang vào khu vực Ea H'leo. Đường thẳng, đẹp, nhiều rẫy cà phê.",
    long_text: "Đoạn đầu tuyến Buôn Ma Thuột - Sài Gòn. Đường quốc lộ rộng rãi, hai bên là rẫy cà phê. Chú ý xe tải ra vào các nông trường. Có quán cà phê ven đường, nên nghỉ nếu cần."
  },
  {
    id: "block_02",
    start_km: 6.7,
    end_km: 13.4,
    province: "Đắk Lắk",
    district: "Ea H'leo",
    short_text: "Tiếp tục Ea H'leo. Đường bằng phẳng, ít đèo.",
    long_text: "Đoạn giữa huyện Ea H'leo. Cảnh quan đồng bằng, ít cua gấp. Có thể gặp sương mù sáng sớm. Lưu ý giới hạn tốc độ gần khu dân cư."
  },
  {
    id: "block_03",
    start_km: 13.4,
    end_km: 20.1,
    province: "Đắk Lắk",
    district: "Krông Pắk",
    short_text: "Vào Krông Pắk. Bắt đầu có đoạn đèo nhẹ.",
    long_text: "Chuyển sang huyện Krông Pắk. Đường bắt đầu lên xuống nhẹ. Nhiều điểm view cà phê. Nên kiểm tra phanh và lốp trước khi vào các đoạn đèo phía sau."
  },
  {
    id: "block_04",
    start_km: 20.1,
    end_km: 26.8,
    province: "Đắk Lắk",
    district: "Krông Pắk",
    short_text: "Krông Pắk - Đường đẹp, ít xe. Cẩn thận đoạn cua.",
    long_text: "Đoạn đèo nhẹ qua Krông Pắk. Một số cua tay áo, giảm tốc khi vào cua. Có trạm xăng và quán ăn ven đường. Thời tiết Tây Nguyên dễ thay đổi, mang theo áo mưa."
  },
  {
    id: "block_05",
    start_km: 26.8,
    end_km: 33.5,
    province: "Đắk Lắk",
    district: "Krông Năng",
    short_text: "Vào Krông Năng. Cảnh đồi núi, đường ổn định.",
    long_text: "Huyện Krông Năng - địa hình đồi. Đường được nâng cấp, dễ chạy. Nếu đi buổi chiều có thể ngắm hoàng hôn trên đồi. Chú ý xe ngược chiều trên làn tránh."
  },
  {
    id: "block_06",
    start_km: 33.5,
    end_km: 40.2,
    province: "Đắk Lắk",
    district: "Krông Năng",
    short_text: "Tiếp Krông Năng. Chuẩn bị vào đèo lớn phía trước.",
    long_text: "Cuối Krông Năng, sắp tới các đèo lớn trên QL26/QL1. Nên đổ xăng, nghỉ chân và kiểm tra xe. Đoạn phía trước có đèo dài, tránh chạy tối."
  },
  {
    id: "block_07",
    start_km: 40.2,
    end_km: 46.9,
    province: "Đắk Lắk",
    district: "Ea Kar",
    short_text: "Ea Kar - Đèo bắt đầu. Giảm tốc, quan sát.",
    long_text: "Vào địa phận Ea Kar, đèo dốc dần. Đường cua gấp, nhiều xe tải. Bám làn, bật đèn sáng ban ngày. Tránh vượt ẩu ở đoạn không thấy rõ địch."
  },
  {
    id: "block_08",
    start_km: 46.9,
    end_km: 53.6,
    province: "Đắk Lắk",
    district: "Ea Kar",
    short_text: "Giữa đèo Ea Kar. Cảnh đẹp nhưng đường khó.",
    long_text: "Đoạn đèo chính Ea Kar. View rừng và đồi rất đẹp. Đường hẹp một số đoạn, tránh dừng giữa cua. Có bảng cảnh báo đá lở mùa mưa."
  },
  {
    id: "block_09",
    start_km: 53.6,
    end_km: 60.3,
    province: "Đắk Lắk",
    district: "M'Drắk",
    short_text: "Vào M'Drắk. Xuống đèo, cẩn thận phanh.",
    long_text: "Chuyển sang M'Drắk, bắt đầu xuống đèo. Không rà phanh liên tục, dùng phanh động cơ. Có điểm dừng chân view đẹp, an toàn mới dừng."
  },
  {
    id: "block_10",
    start_km: 60.3,
    end_km: 67.0,
    province: "Đắk Lắk",
    district: "M'Drắk",
    short_text: "M'Drắk - Đường bằng dần. Có trạm xăng, quán ăn.",
    long_text: "Cuối M'Drắk, đường bằng lại. Nhiều trạm xăng và quán. Nên nghỉ, uống nước. Từ đây có thể chạy thẳng về Phú Yên/Khánh Hòa hoặc theo QL về Sài Gòn tùy lộ trình."
  }
  // Thêm block mới: copy structure trên, tăng start_km/end_km khoảng 6.7 km,
  // điều chỉnh province/district và short_text/long_text cho đúng địa danh.
];
