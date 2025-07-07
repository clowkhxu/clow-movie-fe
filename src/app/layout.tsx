import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { StoreProvider } from "@/store/StoreProvider";
import NextTopLoader from "nextjs-toploader";
import App from "@/components/App";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CLOWPHIM | Xem Phim Online Miễn Phí",
  description: "WEBSITE XEM PHIM MIỄN PHÍ",
  icons: {
    icon: "/icon/logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="vi">
      <body className={`${inter.className} antialiased`}>
        <NextTopLoader color="#ffd875" showSpinner={false} height={2} />

        <StoreProvider>
          <Provider>
            <SessionProvider>
              <App>{children}</App>
            </SessionProvider>
          </Provider>
        </StoreProvider>
      </body>
    </html>
  );
}
