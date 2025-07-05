import { toaster } from "@/components/ui/toaster";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("vi");

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("DD/MM/YYYY");
};

export const formatDateUnix = (timestamp: number | string): string => {
  return dayjs.unix(Number(timestamp)).fromNow();
};

export const formatStringForURL = (str: string, separator: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, separator);
};

export const getPositionElement = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
};

export const getRandomItem = (array: any[]): any => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const updateSearchParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      searchParams.set(key, value.toString());
    } else {
      searchParams.delete(key);
    }
  });

  return searchParams.toString();
};

export const changeQuery = (
  queries: { key: string; value: string | number }[]
) => {
  const url = new URL(window.location.href);

  queries.forEach(({ key, value }) => {
    url.searchParams.set(key, value.toString());
  });

  window.history.replaceState({}, "", url.toString());
};

export const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
    handleShowToaster("Thông báo", "Đã sao chép link vào clipboard!");
  }
};

export const handleShowToaster = (
  title?: string,
  description?: string,
  type: "success" | "error" | "info" = "info"
) => {
  if (type === "success") {
    toaster.success({
      title,
      description,
      duration: 2000,
    });
  } else if (type === "error") {
    toaster.error({
      title,
      description,
      duration: 2000,
    });
  } else {
    toaster.create({
      title,
      description,
      type: "info",
      duration: 2000,
    });
  }
};

export const formatTypeMovie = (serverName: string): string => {
  if (serverName.includes("Vietsub")) {
    return "vietsub";
  } else if (serverName.includes("Thuyết Minh")) {
    return "thuyetminh";
  } else {
    return "longtieng";
  }
};

export const getIdFromLinkEmbed = (
  linkEmbed: string,
  length: number = 8
): string => {
  try {
    const url = new URL(linkEmbed);
    const pathSegments = url.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    if (lastSegment && lastSegment.length >= length) {
      return lastSegment.substring(0, length);
    }

    const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  } catch (error) {
    const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
};

// Cập nhật hàm generateUrlImage để hỗ trợ kích thước tùy chỉnh cho Ophim và Imgur
export const generateUrlImage = (
  url: string,
  size: string = "300x0"
): string => {
  if (!url || typeof url !== "string") {
    return "/images/placeholder.jpg";
  }

  try {
    // Xử lý URL từ Ophim
    if (url.includes("img.ophim.live") || url.includes("img.ophim1.com")) {
      const sizeRegex = /\/\d+x\d+\//;
      if (sizeRegex.test(url)) {
        return url.replace(sizeRegex, `/${size}/`);
      } else {
        const parts = url.split("/");
        const filename = parts.pop();
        return `${parts.join("/")}/${size}/${filename}`;
      }
    }

    // Xử lý URL từ Imgur
    if (url.includes("i.imgur.com")) {
      const urlObject = new URL(url);
      const pathParts = urlObject.pathname.split('.');

      // Kiểm tra nếu không phải là link ảnh trực tiếp (ví dụ: không có phần mở rộng .png, .jpg)
      if (pathParts.length < 2) return url;

      const filenameWithSuffix = pathParts.slice(0, -1).join('.');
      const extension = pathParts[pathParts.length - 1];

      // Xóa hậu tố kích thước cũ của Imgur (nếu có) để tránh lỗi (vd: .../abcms.png)
      const baseFilename = filenameWithSuffix.replace(/[sbtmlh]$/, '');

      // Xác định hậu tố mới dựa trên chiều rộng từ tham số `size`
      const width = parseInt(size.split('x')[0], 10);
      let suffix = '';
      if (width <= 160) {
        suffix = 'b'; // Big Square (160x160)
      } else if (width <= 320) {
        suffix = 'm'; // Medium Thumbnail (320x320)
      } else if (width <= 640) {
        suffix = 'l'; // Large Thumbnail (640x640)
      } else {
        suffix = 'h'; // Huge Thumbnail (1024x1024)
      }

      // Tạo lại URL mới với hậu tố kích thước
      return `${urlObject.origin}${baseFilename}${suffix}.${extension}`;
    }

    // Nếu không phải từ domain được hỗ trợ, trả về URL gốc
    return url;
  } catch (error) {
    console.error("Error processing image URL:", error);
    return "/images/placeholder.jpg";
  }
};

// Hàm helper để tự động detect mobile và chọn kích thước phù hợp
export const generateUrlImageResponsive = (url: string, type: 'poster' | 'thumb' = 'poster'): string => {
  if (typeof window !== "undefined") {
    const isMobile = window.innerWidth < 1024; // lg breakpoint

    if (isMobile) {
      // Mobile: sử dụng kích thước nhỏ hơn
      return generateUrlImage(url, "200x0");
    } else {
      // PC: sử dụng kích thước theo loại ảnh
      if (type === 'thumb') {
        return generateUrlImage(url, "400x0");
      } else {
        return generateUrlImage(url, "300x0");
      }
    }
  }
  // Fallback cho server-side rendering
  return generateUrlImage(url, type === 'thumb' ? "400x0" : "300x0");
};

// Hàm riêng cho search preview với kích thước 100x0
export const generateUrlImageForSearch = (url: string): string => {
  if (typeof window !== "undefined") {
    const isMobile = window.innerWidth < 1024;
    // Sử dụng kích thước 160px (hậu tố 'b' của imgur) cho cả mobile và desktop để đảm bảo chất lượng
    return generateUrlImage(url, "160x0");
  }
  return generateUrlImage(url, "160x0");
};
