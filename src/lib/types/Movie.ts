type SlideItem = {
  modified: {
    time: string;
  };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  year: number;
};

type Movies = {
  items: any;
  loading: boolean;
  error: boolean;
};

type MovieSlice = {
  slideShows: {
    items: SlideItem[];
    loading: boolean;
    error: boolean;
  };
  movieData: Record<string, Movies>;
  searchMoviePreview: {
    items: any;
    loading: boolean;
    error: boolean;
    totalItems: number;
  };
  movieInfo: {
    movie: any;
    loading: boolean;
    error: boolean;
    episodes: any;
    currentEpisode: any;
  };
  movieDetail: {
    items: any;
    titlePage: string;
    pagination: {
      totalItems: number;
      totalItemsPerPage: number;
      currentPage: number;
      totalPages: number;
    } | null;
    loading: boolean;
    error: boolean;
  };
  searchMovie: {
    items: any;
    loading: boolean;
    error: boolean;
    titlePage: string;
    pagination: {
      totalItems: number;
      totalItemsPerPage: number;
      currentPage: number;
      totalPages: number;
    };
  };
};

type Categories =
  | "hanh-dong"
  | "lich-su"
  | "co-trang"
  | "chien-tranh"
  | "vien-tuong"
  | "kinh-di"
  | "tai-lieu"
  | "bi-an"
  | "phim-18"
  | "tinh-cam"
  | "tam-ly"
  | "the-thao"
  | "phieu-luu"
  | "am-nhac"
  | "gia-dinh"
  | "hoc-duong"
  | "hai-huoc"
  | "hinh-su"
  | "vo-thuat"
  | "khoa-hoc"
  | "than-thoai"
  | "chinh-kich"
  | "kinh-dien";

type Countries =
  | "viet-nam"
  | "trung-quoc"
  | "thai-lan"
  | "hong-kong"
  | "phap"
  | "duc"
  | "ha-lan"
  | "mexico"
  | "thuy-dien"
  | "philippines"
  | "dan-mach"
  | "thuy-si"
  | "ukraina"
  | "han-quoc"
  | "au-my"
  | "an-do"
  | "canada"
  | "tay-ban-nha"
  | "indonesia"
  | "ba-lan"
  | "malaysia"
  | "bo-dao-nha"
  | "uae"
  | "chau-phi"
  | "a-rap-xe-ut"
  | "nhat-ban"
  | "dai-loan"
  | "anh"
  | "quoc-gia-khac"
  | "tho-nhi-ky"
  | "nga"
  | "uc"
  | "brazil"
  | "y"
  | "na-uy"
