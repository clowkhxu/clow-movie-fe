import Loading from "@/app/loading";
import MainPage from "@/components/pages/verify-token/MainPage";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MainPage />
    </Suspense>
  );
};

export default Page;
