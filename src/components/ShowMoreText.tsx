import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { usePathname } from "next/navigation";

interface ShowMoreTextProps {
  text: string;
  maxLength?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const ShowMoreText = ({
  text,
  maxLength = 100,
  size = "sm",
}: ShowMoreTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Kiểm tra kích thước màn hình
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleText = () => setIsExpanded(!isExpanded);

  const displayText = isExpanded ? text : text?.slice(0, maxLength);

  // Chỉ hiển thị "Xem thêm" nếu text dài hơn gấp đôi maxLength
  const shouldShowToggle = text?.length > maxLength * 2;

  // Xác định màu nền dựa trên kích thước màn hình và trang hiện tại
  const isWatchingPage = pathname?.includes('/watching');

  const getBlurColor = () => {
    if (isMobile || isWatchingPage) {
      return 'rgb(25, 27, 36)'; // Màu cho mobile hoặc trang watching
    }
    return 'rgb(33, 35, 48)'; // Màu cho desktop
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <p style={{ wordBreak: "break-word" }} className={`text-${size} text-gray-400`}>
          {displayText}
          {shouldShowToggle && text?.length > maxLength && !isExpanded && "..."}
        </p>
        
        {/* Shadow blur overlay với màu nền responsive - chỉ hiển thị khi cần thiết */}
        {shouldShowToggle && text?.length > maxLength && !isExpanded && (
          <div 
            className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
            style={{
              background: `linear-gradient(to top, 
                ${getBlurColor()} 0%, 
                ${getBlurColor().replace('rgb', 'rgba').replace(')', ', 0.9)')} 20%, 
                ${getBlurColor().replace('rgb', 'rgba').replace(')', ', 0.7)')} 40%, 
                ${getBlurColor().replace('rgb', 'rgba').replace(')', ', 0.4)')} 60%, 
                ${getBlurColor().replace('rgb', 'rgba').replace(')', ', 0.1)')} 80%, 
                transparent 100%)`
            }}
          ></div>
        )}
      </div>

      {shouldShowToggle && (
        <div className="flex justify-end mt-2">
          <span
            onClick={toggleText}
            className="text-[#ffd875] text-sm cursor-pointer inline-flex items-center gap-1 bg-transparent hover:underline z-10 relative"
          >
            {isExpanded ? "Thu gọn" : "Xem thêm"}
            {isExpanded ? (
              <FaChevronUp className="text-xs" />
            ) : (
              <FaChevronDown className="text-xs" />
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default ShowMoreText;