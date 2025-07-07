import Loading from "@/app/loading";
import MoviePage from "@/components/pages/info/MainPage";
import { Metadata } from "next";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}phim/${slug}`);
    const data = await response.json();
    
    if (data?.status && data?.movie?.name) {
      return {
        title: `${data.movie.name} - CLOWPHIM`,
        description: "Xem phim chất lượng cao, miễn phí và cập nhật nhanh nhất.",
      };
    }
  } catch (error) {
    console.error('Error fetching movie data for metadata:', error);
  }

  return {
    title: "CLOWPHIM - Xem Phim Online Miễn Phí",
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
