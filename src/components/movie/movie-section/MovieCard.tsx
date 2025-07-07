"use client";

import {
  formatStringForURL,
  generateUrlImage,
  generateUrlImageResponsive,
  getPositionElement,
} from "@/lib/utils";
import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import MovieTooltip from "./MovieTooltip";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface MovieItemProps {
  data: any;
  orientation?: "horizontal" | "vertical";
}

interface Tooltip {
  top: number;
  left: number;
  width: number;
  height: number;
  visible: boolean;
}

const getEffectiveThumbUrl = (urlString?: string): string | undefined => {
  if (typeof urlString === 'string' && urlString.includes(',')) {
    const parts = urlString.split(',');
    if (parts.length > 1 && parts[1] && parts[1].trim() !== '') {
      return parts[1].trim();
    }
    if (parts[0] && parts[0].trim() !== '') {
      return parts[0].trim();
    }
  }
  return urlString;
};

// Cache để lưu trữ episode data
const episodeCache = new Map<string, any>();

// Hook để fetch episode data với cache và debounce
const useEpisodeData = (slug: string) => {
  const [episodeInfo, setEpisodeInfo] = useState<{
    vietsub: number | 'FULL';
    longtieng: number | 'FULL';
    thuyetminh: number | 'FULL';
    type: 'series' | 'single';
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;

    // Kiểm tra cache trước
    if (episodeCache.has(slug)) {
      setEpisodeInfo(episodeCache.get(slug));
      return;
    }

    setIsLoading(true);

    // Debounce để tránh gọi API quá nhiều
    const timeoutId = setTimeout(async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${API_URL}phim/${slug}`, {
          cache: 'force-cache' // Cache response
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data?.status && data?.episodes && data?.movie) {
          let vietsubCount: number | 'FULL' = 0;
          let longtiengCount: number | 'FULL' = 0;
          let thuyetminhCount: number | 'FULL' = 0;
          
          // Lấy type từ movie data
          const movieType = data.movie?.type || 'series';

          // Xử lý logic cho từng type
          if (movieType === 'single') {
            data.episodes.forEach((episode: any) => {
              const serverName = episode.server_name?.toLowerCase() || '';
              const episodeCount = episode.server_data?.length || 0;
              const firstEpisodeName = episode.server_data?.[0]?.name?.toLowerCase() || '';
              
              if (episodeCount > 0) {
                // Kiểm tra nếu name là "FULL" và chỉ có 1 tập
                const isFull = firstEpisodeName === 'full' && episodeCount === 1;
                
                if (serverName.includes('vietsub') || serverName.includes('phụ đề')) {
                  vietsubCount = isFull ? 'FULL' : 1;
                } else if (serverName.includes('lồng tiếng')) {
                  longtiengCount = isFull ? 'FULL' : 1;
                } else if (serverName.includes('thuyết minh')) {
                  thuyetminhCount = isFull ? 'FULL' : 1;
                }
              }
            });
          } else if (movieType === 'series') {
            // Series thì đếm số tập thực tế
            data.episodes.forEach((episode: any) => {
              const serverName = episode.server_name?.toLowerCase() || '';
              const episodeCount = episode.server_data?.length || 0;
              
              if (serverName.includes('vietsub') || serverName.includes('phụ đề')) {
                vietsubCount = Math.max(vietsubCount as number, episodeCount);
              } else if (serverName.includes('lồng tiếng')) {
                longtiengCount = Math.max(longtiengCount as number, episodeCount);
              } else if (serverName.includes('thuyết minh')) {
                thuyetminhCount = Math.max(thuyetminhCount as number, episodeCount);
              }
            });
          } else if (movieType === 'hoathinh') {
            // Hoạt hình: kiểm tra xem có tập FULL không, nếu có thì xử lý như single, không thì như series
            let hasFullEpisode = false;
            
            // Kiểm tra xem có tập FULL không
            data.episodes.forEach((episode: any) => {
              const firstEpisodeName = episode.server_data?.[0]?.name?.toLowerCase() || '';
              if (firstEpisodeName === 'full' && episode.server_data?.length === 1) {
                hasFullEpisode = true;
              }
            });
            
            if (hasFullEpisode) {
              // Xử lý như single nếu có tập FULL
              data.episodes.forEach((episode: any) => {
                const serverName = episode.server_name?.toLowerCase() || '';
                const episodeCount = episode.server_data?.length || 0;
                const firstEpisodeName = episode.server_data?.[0]?.name?.toLowerCase() || '';
                
                if (episodeCount > 0) {
                  const isFull = firstEpisodeName === 'full' && episodeCount === 1;
                  
                  if (serverName.includes('vietsub') || serverName.includes('phụ đề')) {
                    vietsubCount = isFull ? 'FULL' : 1;
                  } else if (serverName.includes('lồng tiếng')) {
                    longtiengCount = isFull ? 'FULL' : 1;
                  } else if (serverName.includes('thuyết minh')) {
                    thuyetminhCount = isFull ? 'FULL' : 1;
                  }
                }
              });
            } else {
              // Xử lý như series nếu không có tập FULL
              data.episodes.forEach((episode: any) => {
                const serverName = episode.server_name?.toLowerCase() || '';
                const episodeCount = episode.server_data?.length || 0;
                
                if (serverName.includes('vietsub') || serverName.includes('phụ đề')) {
                  vietsubCount = Math.max(vietsubCount as number, episodeCount);
                } else if (serverName.includes('lồng tiếng')) {
                  longtiengCount = Math.max(longtiengCount as number, episodeCount);
                } else if (serverName.includes('thuyết minh')) {
                  thuyetminhCount = Math.max(thuyetminhCount as number, episodeCount);
                }
              });
            }
          }

          const result = {
            vietsub: vietsubCount,
            longtieng: longtiengCount,
            thuyetminh: thuyetminhCount,
            type: movieType
          };

          // Lưu vào cache
          episodeCache.set(slug, result);
          setEpisodeInfo(result);
        }
      } catch (error) {
        console.error('Error fetching episode data:', error);
        // Lưu null vào cache để tránh retry liên tục
        episodeCache.set(slug, null);
      } finally {
        setIsLoading(false);
      }
    }, 300); // Debounce 300ms

    return () => clearTimeout(timeoutId);
  }, [slug]);

  return { episodeInfo, isLoading };
};

const MovieCard = ({ data, orientation = "vertical" }: MovieItemProps) => {
  const cuurentElementRef = useRef<HTMLImageElement | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const [imageSrc, setImageSrc] = useState<string>("/images/placeholder.jpg");
  
  // Fetch episode data với optimization
  const { episodeInfo, isLoading } = useEpisodeData(data?.slug);

  useEffect(() => {
    let urlToProcess: string | undefined;

    if (orientation === "horizontal") {
      urlToProcess = getEffectiveThumbUrl(data?.thumb_url);
    } else {
      urlToProcess = data?.poster_url;
    }

    if (urlToProcess && typeof urlToProcess === 'string' && urlToProcess.trim()) {
      const processedUrl = generateUrlImageResponsive(urlToProcess, orientation === "horizontal" ? 'thumb' : 'poster');

      if (processedUrl && typeof processedUrl === 'string' && processedUrl.trim()) {
        if (processedUrl !== imageSrc) {
          setImageSrc(processedUrl);
        }
      } else {
        if (imageSrc !== "/images/placeholder.jpg") {
          setImageSrc("/images/placeholder.jpg");
        }
      }
    } else {
      if (imageSrc !== "/images/placeholder.jpg") {
        setImageSrc("/images/placeholder.jpg");
      }
    }
  }, [data?.thumb_url, data?.poster_url, orientation, imageSrc]);

  const handleMouseEnter = () => {
    if (windowWidth <= 1280) return;
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    tooltipTimeout.current = setTimeout(() => {
      if (cuurentElementRef.current) {
        const { top, left, width, height } = getPositionElement(
          cuurentElementRef.current
        );
        setTooltip({
          top: top + window.scrollY - (height * 1.5) / 2 + height / 2,
          left: left + window.scrollX - (width * 1.5) / 2 + width / 2,
          width: width * 1.5,
          height: height * 1.5,
          visible: true,
        });
      }
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    setTooltip(null);
  };

  // Hàm để kiểm tra xem có episode hay không
  const hasEpisode = (value: number | 'FULL') => {
    return value === 'FULL' || (typeof value === 'number' && value > 0);
  };

  // Hàm để lấy text hiển thị dựa trên type và value
  const getDisplayText = (type: 'vietsub' | 'longtieng' | 'thuyetminh', value: number | 'FULL', movieType: 'series' | 'single') => {
    // Nếu là FULL thì chỉ hiển thị text không có số
    if (value === 'FULL') {
      switch (type) {
        case 'vietsub': return 'P.Đề';
        case 'longtieng': return 'L.Tiếng';
        case 'thuyetminh': return 'T.Minh';
        default: return '';
      }
    }
    
    // Nếu không phải FULL thì hiển thị theo type
    if (movieType === 'single') {
      switch (type) {
        case 'vietsub': return `P.Đề. ${value}`;
        case 'longtieng': return `L.Tiếng. ${value}`;
        case 'thuyetminh': return `T.Minh. ${value}`;
        default: return '';
      }
    } else {
      switch (type) {
        case 'vietsub': return `PĐ. ${value}`;
        case 'longtieng': return `LT. ${value}`;
        case 'thuyetminh': return `TM. ${value}`;
        default: return '';
      }
    }
  };

  return (
    <Box
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/info/${data?.slug}?name=${formatStringForURL(data?.name, "-")}`}
        className="flex flex-col gap-4 group"
      >
        <Box
          className={`h-0 relative ${orientation === "horizontal" ? "pb-[62%]" : "pb-[150%]"
            } rounded-xl overflow-hidden`}
        >
          <Image
            ref={cuurentElementRef}
            src={imageSrc}
            alt={data?.name ?? "Không xác định"}
            objectFit="cover"
            className="border border-gray-800 h-full rounded-xl w-full absolute group-hover:brightness-75 inset-0 transition-all"
            loading="lazy"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/images/notfound.png";
            }}
          />
          
          {/* Episode info overlay */}
          {!isLoading && episodeInfo && (hasEpisode(episodeInfo.vietsub) || hasEpisode(episodeInfo.longtieng) || hasEpisode(episodeInfo.thuyetminh)) && (
            <>
              {/* Desktop version - nằm sát dưới cùng poster, xếp chồng */}
              <Box 
                className="absolute bottom-0 left-0 right-0 lg:flex hidden justify-center"
                style={{
                  gap: '0px', // Không có khoảng cách giữa các badge
                }}
              >
                {hasEpisode(episodeInfo.vietsub) && (
                  <Box 
                    className="text-white px-2 py-1 text-xs"
                    style={{ 
                      backgroundColor: '#5e6070',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: !hasEpisode(episodeInfo.longtieng) && !hasEpisode(episodeInfo.thuyetminh) ? '8px' : '0px',
                      borderBottomLeftRadius: '0px',
                      borderBottomRightRadius: '0px',
                    }}
                  >
                    {episodeInfo.vietsub === 'FULL' ? (
                      <span style={{ fontWeight: 'normal' }}>{getDisplayText('vietsub', episodeInfo.vietsub, episodeInfo.type)}</span>
                    ) : (
                      <>
                        <span style={{ fontWeight: 'normal' }}>{getDisplayText('vietsub', episodeInfo.vietsub, episodeInfo.type).split('.')[0]}. </span>
                        <span style={{ fontWeight: 'bold' }}>{episodeInfo.vietsub}</span>
                      </>
                    )}
                  </Box>
                )}
                {hasEpisode(episodeInfo.longtieng) && (
                  <Box 
                    className="text-white px-2 py-1 text-xs"
                    style={{ 
                      backgroundColor: '#1667cf',
                      borderTopLeftRadius: !hasEpisode(episodeInfo.vietsub) ? '8px' : '0px',
                      borderTopRightRadius: !hasEpisode(episodeInfo.thuyetminh) ? '8px' : '0px',
                      borderBottomLeftRadius: '0px',
                      borderBottomRightRadius: '0px',
                    }}
                  >
                    {episodeInfo.longtieng === 'FULL' ? (
                      <span style={{ fontWeight: 'normal' }}>{getDisplayText('longtieng', episodeInfo.longtieng, episodeInfo.type)}</span>
                    ) : (
                      <>
                        <span style={{ fontWeight: 'normal' }}>{getDisplayText('longtieng', episodeInfo.longtieng, episodeInfo.type).split('.')[0]}. </span>
                        <span style={{ fontWeight: 'bold' }}>{episodeInfo.longtieng}</span>
                      </>
                    )}
                  </Box>
                )}
                {hasEpisode(episodeInfo.thuyetminh) && (
                  <Box 
                    className="text-white px-2 py-1 text-xs"
                    style={{ 
                      backgroundColor: '#2ca35d',
                      borderTopLeftRadius: !hasEpisode(episodeInfo.vietsub) && !hasEpisode(episodeInfo.longtieng) ? '8px' : '0px',
                      borderTopRightRadius: '8px',
                      borderBottomLeftRadius: '0px',
                      borderBottomRightRadius: '0px',
                    }}
                  >
                    {episodeInfo.thuyetminh === 'FULL' ? (
                      <span style={{ fontWeight: 'normal' }}>{getDisplayText('thuyetminh', episodeInfo.thuyetminh, episodeInfo.type)}</span>
                    ) : (
                      <>
                        <span style={{ fontWeight: 'normal' }}>{getDisplayText('thuyetminh', episodeInfo.thuyetminh, episodeInfo.type).split('.')[0]}. </span>
                        <span style={{ fontWeight: 'bold' }}>{episodeInfo.thuyetminh}</span>
                      </>
                    )}
                  </Box>
                )}
              </Box>

              {/* Mobile version - nằm góc dưới bên trái, xếp chồng theo chiều dọc */}
              <Box 
                className="absolute bottom-2 left-2 lg:hidden flex flex-col gap-1"
              >
                {hasEpisode(episodeInfo.vietsub) && (
                  <Box 
                    className="text-white px-1.5 py-0.5"
                    style={{ 
                      backgroundColor: '#5e6070',
                      borderRadius: '8px',
                      fontSize: '10px', // Nhỏ hơn text-xs
                    }}
                  >
                    {episodeInfo.vietsub === 'FULL' ? (
                      <span style={{ fontWeight: 'normal' }}>{getDisplayText('vietsub', episodeInfo.vietsub, episodeInfo.type)}</span>
                    ) : (
                      <>
                        <span style={{ fontWeight: 'normal' }}>{getDisplayText('vietsub', episodeInfo.vietsub, episodeInfo.type).split('.')[0]}. </span>
                        <span style={{ fontWeight: 'bold' }}>{episodeInfo.vietsub}</span>
                      </>
                    )}
                  </Box>
                )}
                {hasEpisode(episodeInfo.longtieng) && (
                  <Box 
                    className="text-white px-1.5 py-0.5"
                    style={{ 
                      backgroundColor: '#1667cf',
                      borderRadius: '8px',
                      fontSize: '10px', // Nhỏ hơn text-xs
                    }}
                  >
                    {episodeInfo.longtieng === 'FULL' ? (
                      <span style={{ fontWeight: 'normal' }}>{getDisplayText('longtieng', episodeInfo.longtieng, episodeInfo.type)}</span>
                    ) : (
                      <>
                        <span style={{ fontWeight: 'normal' }}>{getDisplayText('longtieng', episodeInfo.longtieng, episodeInfo.type).split('.')[0]}. </span>
                        <span style={{ fontWeight: 'bold' }}>{episodeInfo.longtieng}</span>
                      </>
                    )}
                  </Box>
                )}
                {hasEpisode(episodeInfo.thuyetminh) && (
                  <Box 
                    className="text-white px-1.5 py-0.5"
                    style={{ 
                      backgroundColor: '#2ca35d',
                      borderRadius: '8px',
                      fontSize: '10px', // Nhỏ hơn text-xs
                    }}
                  >
                    {episodeInfo.thuyetminh === 'FULL' ? (
                      <span style={{ fontWeight: 'normal' }}>{getDisplayText('thuyetminh', episodeInfo.thuyetminh, episodeInfo.type)}</span>
                    ) : (
                      <>
                        <span style={{ fontWeight: 'normal' }}>{getDisplayText('thuyetminh', episodeInfo.thuyetminh, episodeInfo.type).split('.')[0]}. </span>
                        <span style={{ fontWeight: 'bold' }}>{episodeInfo.thuyetminh}</span>
                      </>
                    )}
                  </Box>
                )}
              </Box>
            </>
          )}
        </Box>
        
        <Box className="flex flex-col gap-1">
          <span
            style={{
              WebkitLineClamp: 1,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            className="text-gray-50 text-center group-hover:text-[#ffd875] lg:text-sm text-[13px] transition-all"
          >
            {data?.name}
          </span>
          <span
            style={{
              WebkitLineClamp: 1,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "#aaa",
            }}
            className="text-center transition-all lg:text-sm text-[13px]"
          >
            {data?.origin_name ?? "Không xác định"}
          </span>
        </Box>
      </Link>

      {tooltip?.visible && <MovieTooltip data={data} position={tooltip} />}
    </Box>
  );
};

export default MovieCard;