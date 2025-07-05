import Loading from "@/app/loading";
import MoviePage from "@/components/pages/info/MainPage";
import { Metadata } from "next";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams ?? {};
  const name = typeof params.name === "string" ? params.name.replace(/-/g, " ") : "hihihi";

  return {
    title: `${name} - CLOWPHIM`,
    description: "Xem phim chất lượng cao, miễn phí và cập nhật nhanh nhất.",
  };
}

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MoviePage />
    </Suspense>
  );
};

export default Page;
