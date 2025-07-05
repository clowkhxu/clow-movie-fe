"use client";

import { Box, Text, SimpleGrid, Image, VStack, Spinner, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

// Định nghĩa kiểu dữ liệu cho diễn viên từ TMDB
interface TmdbActor {
    id: number;
    name: string;
    original_name?: string;
    profile_path: string | null;
    character?: string;
}

interface TabActorsProps { }

const TMDB_API_KEY = "b2bbbfa278010bd4f2a96083fd3f4fe4";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

// Icon diễn viên
const ActorsIcon = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"></path>
    </svg>
);

const TabActors: React.FC<TabActorsProps> = () => {
    const movieInfo = useSelector((state: RootState) => state.movie.movieInfo);
    const tmdbData = movieInfo?.movie?.tmdb;

    const [actors, setActors] = useState<TmdbActor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActors = async () => {
            if (!tmdbData?.id || !tmdbData?.type) {
                setError("Không tìm thấy thông tin TMDB của phim.");
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            const type = tmdbData.type === "movie" ? "movie" : "tv";
            const url = `https://api.themoviedb.org/3/${type}/${tmdbData.id}/credits?api_key=${TMDB_API_KEY}&language=vi-VN`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Lỗi API TMDB: ${response.statusText}`);
                }
                const data = await response.json();
                setActors(data.cast ? data.cast.slice(0, 10) : []);
            } catch (err) {
                console.error("Lỗi khi gọi API TMDB:", err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Đã xảy ra lỗi không xác định.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchActors();
    }, [tmdbData]);

    if (isLoading) {
        return (
            <Center py={10}>
                <Spinner color="#ffd875" size="xl" />
            </Center>
        );
    }

    if (error) {
        return (
            <Box className="flex justify-center items-center h-48 mt-8">
                <Box 
                    className="text-center px-8 py-6 rounded-2xl max-w-lg mx-auto"
                    style={{
                        backgroundColor: '#1b1c26',
                        boxShadow: '0 4px 20px rgba(39, 39, 42, 0.15), 0 25px 65px -15px rgba(39, 39, 42, 0.1)'
                    }}
                >
                    <Box className="flex justify-center mb-4">
                        <Box className="text-gray-400 text-4xl">
                            <ActorsIcon />
                        </Box>
                    </Box>
                    <Text fontSize="lg" color="gray.50" fontWeight="semibold" mb={2}>
                        Đang cập nhật
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                        Hiện chưa có dữ liệu về diễn viên. Vui lòng quay lại sau nhé!
                    </Text>
                </Box>
            </Box>
        );
    }

    if (!actors || actors.length === 0) {
        return (
            <Box className="flex justify-center items-center h-48 mt-8">
                <Box 
                    className="text-center px-8 py-6 rounded-2xl max-w-lg mx-auto"
                    style={{
                        backgroundColor: '#1b1c26',
                        boxShadow: '0 4px 20px rgba(39, 39, 42, 0.15), 0 25px 65px -15px rgba(39, 39, 42, 0.1)'
                    }}
                >
                    <Box className="flex justify-center mb-4">
                        <Box className="text-gray-400 text-4xl">
                            <ActorsIcon />
                        </Box>
                    </Box>
                    <Text fontSize="lg" color="gray.50" fontWeight="semibold" mb={2}>
                        Đang cập nhật
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                        Hiện chưa có dữ liệu về diễn viên. Vui lòng quay lại sau nhé!
                    </Text>
                </Box>
            </Box>
        );
    }

    return (
        <Box py={6}>
            {/* Loại bỏ fontWeight để không in đậm */}
            <Text fontSize="2xl" mb={6} color="gray.200" textAlign="left">
                Diễn viên
            </Text>
            <SimpleGrid
                columns={{ base: 3, sm: 3, md: 4, lg: 5 }}
                gap={{ base: 5, sm: 6, md: 7 }}
            >
                {actors.map((actor) => (
                    <Box
                        key={actor.id}
                        position="relative"
                        width={{ base: "120px", sm: "130px", md: "160px", lg: "180px" }}
                        height={{ base: "180px", sm: "195px", md: "240px", lg: "270px" }}
                        borderRadius="xl"
                        overflow="hidden"
                        // THÊM SHADOW TỪ DƯỚI LÊN
                        boxShadow="0 15px 35px -5px rgba(0, 0, 0, 0.4), 0 25px 65px -15px rgba(0, 0, 0, 0.3)"
                        transition="all 0.3s ease"
                        _hover={{
                            transform: "translateY(-8px)",
                            boxShadow: "0 25px 50px -5px rgba(0, 0, 0, 0.5), 0 35px 80px -15px rgba(0, 0, 0, 0.4)"
                        }}
                    >
                        <Image
                            src={actor.profile_path ? `${TMDB_IMAGE_BASE_URL}w300${actor.profile_path}` : `https://placehold.co/300x450/333/FFF?text=${encodeURIComponent(actor.name)}`}
                            alt={actor.name}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            zIndex={1}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://placehold.co/300x450/333/FFF?text=${encodeURIComponent(actor.name)}`;
                            }}
                        />

                        {/* Lớp phủ gradient được cải thiện */}
                        <Box
                            position="absolute"
                            bottom="0"
                            left="0"
                            right="0"
                            width="100%"
                            height="75%"
                            bgGradient="linear(to-t, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.3) 60%, transparent 100%)"
                            pointerEvents="none"
                            borderRadius="xl"
                            zIndex={2}
                        />

                        {/* VStack chứa tên với shadow text được cải thiện */}
                        <VStack
                            position="absolute"
                            bottom="0"
                            left="0"
                            right="0"
                            p={3}
                            gap={1}
                            alignItems="center"
                            textAlign="center"
                            zIndex={3}
                        >
                            <Text
                                fontSize={{ base: "xs", sm: "sm", md: "sm" }}
                                fontWeight="bold"
                                color="#ffd875"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                w="95%"
                                // SHADOW TEXT MẠNH HƠN
                                textShadow="2px 2px 8px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)"
                            >
                                {actor.name}
                            </Text>
                            {actor.original_name && (
                                <Text
                                    fontSize={{ base: "2xs", sm: "xs", md: "xs" }}
                                    color="gray.200"
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    whiteSpace="nowrap"
                                    w="95%"
                                    // SHADOW TEXT CHO TÊN GỐC
                                    textShadow="1px 1px 4px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.6)"
                                >
                                    {actor.original_name}
                                </Text>
                            )}
                        </VStack>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default TabActors;