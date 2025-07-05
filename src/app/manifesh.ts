import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CLOWPHIM",
    short_name: "CLOWPHIM",
    description:
      "Website xem phim online - Được xây dựng bởi ClowKhxu",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/icon/logo.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
