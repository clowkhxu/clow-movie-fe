/*
  Bỏ chú thích các phần tử trong CountriesConfig và CategoriesConfig nếu muốn hiển thị
  các mục này trong giao diện người dùng.
  Nếu không, chỉ cần giữ lại các phần tử trong initialMovieConfig mà bạn muốn hiển thị.
*/


// Số lượng hiển thị phim khi load thêm
export const quantitySectionMovie = 2;

export interface MovieConfigItem {
  title: string;
  link: string;
  type:
  | "phim-le"
  | "phim-bo"
  | "tv-shows"
  | "hoat-hinh"
  | "phim-vietsub"
  | "phim-thuyet-minh"
  | "phim-long-tieng"
  | Categories
  | Countries;
  describe: "danh-sach" | "quoc-gia" | "the-loai";
  orientation: "horizontal" | "vertical";
}

const CountriesConfig: MovieConfigItem[] = [
  {
    title: "Phim Việt Nam mới",
    link: "/detail/quoc-gia/viet-nam",
    type: "viet-nam",
    describe: "quoc-gia",
    orientation: "horizontal",
  },
  {
    title: "Phim US-UK mới",
    link: "/detail/quoc-gia/au-my",
    type: "au-my",
    describe: "quoc-gia",
    orientation: "horizontal",
  },
  {
    title: "Phim Trung Quốc mới",
    link: "/detail/quoc-gia/trung-quoc",
    type: "trung-quoc",
    describe: "quoc-gia",
    orientation: "horizontal",
  },
  {
    title: "Phim Hàn Quốc mới",
    link: "/detail/quoc-gia/han-quoc",
    type: "han-quoc",
    describe: "quoc-gia",
    orientation: "horizontal",
  },
  // {
  //   title: "Siêu phẩm Thái Lan",
  //   link: "/detail/quoc-gia/thai-lan",
  //   type: "thai-lan",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Huyền thoại Hồng Kông",
  //   link: "/detail/quoc-gia/hong-kong",
  //   type: "hong-kong",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Tuyệt tác điện ảnh Pháp",
  //   link: "/detail/quoc-gia/phap",
  //   type: "phap",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Điện ảnh Đức đỉnh cao",
  //   link: "/detail/quoc-gia/duc",
  //   type: "duc",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Phim Hà Lan đầy sáng tạo",
  //   link: "/detail/quoc-gia/ha-lan",
  //   type: "ha-lan",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Tinh hoa Mexico",
  //   link: "/detail/quoc-gia/mexico",
  //   type: "mexico",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Phim Thụy Điển độc đáo",
  //   link: "/detail/quoc-gia/thuy-dien",
  //   type: "thuy-dien",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Điện ảnh Philippines mãn nhãn",
  //   link: "/detail/quoc-gia/philippines",
  //   type: "philippines",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Siêu phẩm Đan Mạch",
  //   link: "/detail/quoc-gia/dan-mach",
  //   type: "dan-mach",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Tuyệt tác Thụy Sĩ",
  //   link: "/detail/quoc-gia/thuy-si",
  //   type: "thuy-si",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Điện ảnh Ukraina bùng nổ",
  //   link: "/detail/quoc-gia/ukraina",
  //   type: "ukraina",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Tuyệt tác Âu - Mỹ",
  //   link: "/detail/quoc-gia/au-my",
  //   type: "au-my",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Điện ảnh Ấn Độ hoành tráng",
  //   link: "/detail/quoc-gia/an-do",
  //   type: "an-do",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Phim Canada ấn tượng",
  //   link: "/detail/quoc-gia/canada",
  //   type: "canada",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Điện ảnh Tây Ban Nha",
  //   link: "/detail/quoc-gia/tay-ban-nha",
  //   type: "tay-ban-nha",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Siêu phẩm Indonesia",
  //   link: "/detail/quoc-gia/indonesia",
  //   type: "indonesia",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Điện ảnh Ba Lan",
  //   link: "/detail/quoc-gia/ba-lan",
  //   type: "ba-lan",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Phim Malaysia đặc sắc",
  //   link: "/detail/quoc-gia/malaysia",
  //   type: "malaysia",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Huyền thoại Bồ Đào Nha",
  //   link: "/detail/quoc-gia/bo-dao-nha",
  //   type: "bo-dao-nha",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Điện ảnh UAE",
  //   link: "/detail/quoc-gia/uae",
  //   type: "uae",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Phim châu Phi độc đáo",
  //   link: "/detail/quoc-gia/chau-phi",
  //   type: "chau-phi",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Siêu phẩm Ả Rập Xê Út",
  //   link: "/detail/quoc-gia/a-rap-xe-ut",
  //   type: "a-rap-xe-ut",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Điện ảnh Nhật Bản",
  //   link: "/detail/quoc-gia/nhat-ban",
  //   type: "nhat-ban",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Phim Đài Loan hấp dẫn",
  //   link: "/detail/quoc-gia/dai-loan",
  //   type: "dai-loan",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Điện ảnh Anh quốc",
  //   link: "/detail/quoc-gia/anh",
  //   type: "anh",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Siêu phẩm từ nhiều quốc gia",
  //   link: "/detail/quoc-gia/quoc-gia-khac",
  //   type: "quoc-gia-khac",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Phim Thổ Nhĩ Kỳ đặc sắc",
  //   link: "/detail/quoc-gia/tho-nhi-ky",
  //   type: "tho-nhi-ky",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Điện ảnh Nga",
  //   link: "/detail/quoc-gia/nga",
  //   type: "nga",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Phim Úc cực hay",
  //   link: "/detail/quoc-gia/uc",
  //   type: "uc",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Điện ảnh Brazil",
  //   link: "/detail/quoc-gia/brazil",
  //   type: "brazil",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Huyền thoại điện ảnh Ý",
  //   link: "/detail/quoc-gia/y",
  //   type: "y",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Phim Na Uy đầy cảm xúc",
  //   link: "/detail/quoc-gia/na-uy",
  //   type: "na-uy",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
];

const CategoriesConfig: MovieConfigItem[] = [
  {
    title: "Hành động đỉnh cao",
    link: "/detail/the-loai/hanh-dong",
    type: "hanh-dong",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    title: "Rùng rợn đến tột cùng",
    link: "/detail/the-loai/kinh-di",
    type: "kinh-di",
    describe: "the-loai",
    orientation: "horizontal",
  },
  {
    title: "Cảm xúc dâng trào",
    link: "/detail/the-loai/tinh-cam",
    type: "tinh-cam",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    title: "Gia đình hạnh phúc",
    link: "/detail/the-loai/gia-dinh",
    type: "gia-dinh",
    describe: "the-loai",
    orientation: "horizontal",
  },
  {
    title: "Cổ trang kinh điển",
    link: "/detail/the-loai/co-trang",
    type: "co-trang",
    describe: "the-loai",
    orientation: "vertical",
  },
  // {
  //   title: "Khoa học viễn tưởng",
  //   link: "/detail/the-loai/vien-tuong",
  //   type: "vien-tuong",
  //   describe: "the-loai",
  //   orientation: "horizontal",
  // },
  {
    title: "Phiêu lưu kỳ thú",
    link: "/detail/the-loai/phieu-luu",
    type: "phieu-luu",
    describe: "the-loai",
    orientation: "vertical",
  },
  // {
  //   title: "Hài hước cười sảng khoái",
  //   link: "/detail/the-loai/hai",
  //   type: "hai-huoc",
  //   describe: "the-loai",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Âm nhạc và đam mê",
  //   link: "/detail/the-loai/am-nhac",
  //   type: "am-nhac",
  //   describe: "the-loai",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Bí ẩn đầy kịch tính",
  //   link: "/detail/the-loai/bi-an",
  //   type: "bi-an",
  //   describe: "the-loai",
  //   orientation: "vertical",
  // },
  // {
  //   title: "Chiến tranh khốc liệt",
  //   link: "/detail/the-loai/chien-tranh",
  //   type: "chien-tranh",
  //   describe: "the-loai",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Học đường vui nhộn",
  //   link: "/detail/the-loai/hoc-duong",
  //   type: "hoc-duong",
  //   describe: "the-loai",
  //   orientation: "vertical",
  // },
  // {
  //   title: "Thần thoại huyền bí",
  //   link: "/detail/the-loai/than-thoai",
  //   type: "than-thoai",
  //   describe: "the-loai",
  //   orientation: "horizontal",
  // },
  {
    title: "Hình sự gay cấn",
    link: "/detail/the-loai/hinh-su",
    type: "hinh-su",
    describe: "the-loai",
    orientation: "vertical",
  },
  // {
  //   title: "Khoa học kỳ thú",
  //   link: "/detail/the-loai/khoa-hoc",
  //   type: "khoa-hoc",
  //   describe: "the-loai",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Chính kịch cuốn hút",
  //   link: "/detail/the-loai/chinh-kich",
  //   type: "chinh-kich",
  //   describe: "the-loai",
  //   orientation: "vertical",
  // },
  // {
  //   title: "Tài liệu khám phá",
  //   link: "/detail/the-loai/tai-lieu",
  //   type: "tai-lieu",
  //   describe: "the-loai",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Võ thuật mãn nhãn",
  //   link: "/detail/the-loai/vo-thuat",
  //   type: "vo-thuat",
  //   describe: "the-loai",
  //   orientation: "vertical",
  // },
  // {
  //   title: "Tâm lý sâu sắc",
  //   link: "/detail/the-loai/tam-ly",
  //   type: "tam-ly",
  //   describe: "the-loai",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Lịch sử hào hùng",
  //   link: "/detail/the-loai/lich-su",
  //   type: "lich-su",
  //   describe: "the-loai",
  //   orientation: "vertical",
  // },
  // {
  //   title: "Kinh điển bất hủ",
  //   link: "/detail/the-loai/kinh-dien",
  //   type: "kinh-dien",
  //   describe: "the-loai",
  //   orientation: "horizontal",
  // },
  // {
  //   title: "Giải trí người lớn 18+",
  //   link: "/detail/the-loai/phim-18",
  //   type: "phim-18",
  //   describe: "the-loai",
  //   orientation: "vertical",
  // },
];

export const initialMovieConfig: MovieConfigItem[] = [
  ...CountriesConfig,
  ...CategoriesConfig,
];

