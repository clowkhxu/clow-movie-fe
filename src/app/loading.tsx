interface LoadingProps {
  height?:
    | "h-screen"
    | "h-1/2"
    | "h-1/3"
    | "h-1/4"
    | "h-1/5"
    | "h-1/6"
    | string;
}

const Loading = ({ height = "h-screen" }: LoadingProps) => {
  return (
    <div className={`flex justify-center items-center ${height}`}>
      <div className="border-[#ffd875] border-[3px] border-b-transparent h-10 rounded-full w-10 animate-spin"></div>
    </div>
  );
};

export default Loading;
