"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface BackgroundMovieProps {
  url: string; // Prop 'url' can contain one or more links, separated by commas
}

// Helper function to select the effective URL based on new logic
const selectEffectiveUrl = (urlString?: string): string | undefined => {
  if (typeof urlString !== 'string' || !urlString.trim()) {
    return undefined; // Return undefined if no valid URL string
  }

  // Split the URL string into an array, remove whitespace, and empty elements
  const urls = urlString.split(',')
    .map(u => u.trim())
    .filter(u => u); // Filter out empty strings after trimming

  const count = urls.length;

  if (count === 0) {
    return undefined; // No valid URLs
  }

  if (count === 1) {
    return urls[0]; // Only 1 URL, use it
  }

  if (count === 2) {
    return urls[0]; // If there are 2 URLs, use the first one
  }

  // If there are 3 or more URLs
  // Create a list of candidate URLs: including the first link and links from the third onwards
  const candidateUrls: string[] = [];
  candidateUrls.push(urls[0]); // Add the first link

  // Add links from the 3rd position (index 2) onwards
  for (let i = 2; i < count; i++) {
    candidateUrls.push(urls[i]);
  }

  // If the candidate list is not empty (always true if count >= 1), randomly select a URL from it
  if (candidateUrls.length > 0) {
    const randomIndex = Math.floor(Math.random() * candidateUrls.length);
    return candidateUrls[randomIndex];
  }

  // Fallback case, though it shouldn't occur with the logic above if count >= 1
  return urls[0];
};

const BackgroundMovie = ({ url }: BackgroundMovieProps) => {
  const [loaded, setLoaded] = useState(false);
  const [currentDisplayUrl, setCurrentDisplayUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Select the effective URL based on new logic
    const selectedUrl = selectEffectiveUrl(url);
    setCurrentDisplayUrl(selectedUrl); // Update the URL to be displayed

    if (selectedUrl) {
      setLoaded(false); // Reset loaded state when URL changes or is re-selected
      const img = new Image();
      img.src = selectedUrl; // Use the selected URL to load
      img.onload = () => setLoaded(true);
      img.onerror = () => {
        // Handle cases where the image fails to load
        setLoaded(false); // Ensure that if the image errors, it's not displayed as loaded
        // console.error("Failed to load background image:", selectedUrl);
        // Consider setting currentDisplayUrl to a specific placeholder if selectedUrl errors
        // setCurrentDisplayUrl("/images/placeholder_error.jpg");
      };
    } else {
      // If no valid URL is selected (e.g., empty url prop)
      setLoaded(false); // Ensure it's not displayed as loaded
    }
  }, [url]); // Re-run effect when 'url' prop changes

  return (
    <Box className="h-0 relative lg:pt-[32%] md:pt-[46%] sm:pt-[50%] pt-[50%] before:absolute before:inset-0 before:bg-[url('/images/dotted.png')] before:bg-repeat before:opacity-20 before:z-[1]">
      {/* Background image container */}
      <Box
        style={{
          // Use currentDisplayUrl if loaded and valid, otherwise use placeholder
          backgroundImage: `url(${loaded && currentDisplayUrl ? currentDisplayUrl : "/images/placeholder.jpg"})`,
        }}
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-50 transition-opacity duration-500"
      />
      {/* Shadow overlay container */}
      <Box
        className="absolute inset-0 w-full h-full pointer-events-none" // pointer-events-none ensures clicks go through this overlay
        style={{
          background: `
            linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 30%), /* Top shadow */
            linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 30%), /* Left shadow */
            linear-gradient(to left, rgba(0,0,0,0.7) 0%, transparent 30%)  /* Right shadow */
          `,
        }}
      />
    </Box>
  );
};

export default BackgroundMovie;
