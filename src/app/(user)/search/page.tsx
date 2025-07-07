import Loading from "@/app/loading";
import MainPage from "@/components/pages/search/MainPage";
import { Metadata } from "next";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = (await searchParams) ?? {};
  const keyword = params.keyword ?? "ClowKhxu";

  return {
    title: `Xem phim ${keyword} - Thuyết minh, Vietsub mới nhất - CLOWPHIM`,
    description: "Xem phim chất lượng cao, miễn phí và cập nhật nhanh nhất.",
  };
}

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MainPage />
    </Suspense>
  );
};

export default Page;
