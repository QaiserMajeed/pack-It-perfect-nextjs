import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styled from "styled-components";

const ImageWrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  border-radius: ${(props) => props.borderRadius || "0"};

  /* Add aspect ratio if both width and height are provided */
  ${(props) =>
    props.preserveAspectRatio &&
    props.aspectRatio &&
    `
    aspect-ratio: ${props.aspectRatio};
  `}

  /* For browsers that don't support aspect-ratio */
  ${(props) =>
    props.preserveAspectRatio &&
    props.aspectRatio &&
    !CSS.supports("aspect-ratio", props.aspectRatio) &&
    `
    &::before {
      content: '';
      display: block;
      padding-top: ${
        (1 /
          (props.aspectRatio.split("/")[0] / props.aspectRatio.split("/")[1])) *
        100
      }%;
    }
    position: relative;
  `}
`;

const generateAltText = (src) => {
  const filename = src.split('/').pop().split('.')[0];
  return filename
    .replace(/([A-Z])/g, ' $1')
    .replace(/-/g, ' ')
    .trim();
};

const StyledImage = styled(LazyLoadImage).attrs(props => ({
  loading: "lazy",
  decoding: "async",
  fetchpriority: props.priority || "auto",
  alt: props.alt || generateAltText(props.src),
  title: props.title || generateAltText(props.src)
}))`
  width: 100%;
  height: ${(props) => (props.objectFit === "contain" ? "auto" : "100%")};
  object-fit: ${(props) => props.objectFit || "cover"};
  object-position: ${(props) => props.objectPosition || "center"};
  transition: transform ${(props) => (props.hoverEffect ? "0.5s ease" : "0s")};

  ${(props) =>
    props.hoverEffect === "zoom" &&
    `
    &:hover {
      transform: scale(1.05);
    }
  `}
`;

/**
 * OptimizedImage - A component for optimized, lazy-loaded images
 *
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alternative text
 * @param {string} props.width - Image width
 * @param {string} props.height - Image height
 * @param {string} props.aspectRatio - Aspect ratio (e.g., "16/9")
 * @param {boolean} props.preserveAspectRatio - Whether to maintain aspect ratio
 * @param {string} props.objectFit - CSS object-fit value
 * @param {string} props.objectPosition - CSS object-position value
 * @param {string} props.borderRadius - Border radius value
 * @param {string} props.hoverEffect - Type of hover effect (e.g., "zoom")
 * @param {Object} props.wrapperStyle - Additional styles for wrapper div
 * @param {Object} props.imageStyle - Additional styles for image
 * @param {string} props.placeholderSrc - Placeholder image until actual image loads
 * @param {string} props.effect - LazyLoad effect ('blur' or 'opacity')
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  preserveAspectRatio = true,
  objectFit = "cover",
  objectPosition = "center",
  borderRadius = "0",
  hoverEffect = null,
  wrapperStyle = {},
  imageStyle = {},
  placeholderSrc,
  effect = "blur",
  ...rest
}) => {
  // Generate srcSet for responsive images if src is a local image (not external)
  const isLocalImage = src && !src.startsWith("http") && !src.startsWith("//");

  // Generate image sizes for improved art direction
  const sizes =
    rest.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

  // For SEO, ensure all images have properly specified width and height
  const imgWidth = width ? parseInt(width, 10) : undefined;
  const imgHeight = height ? parseInt(height, 10) : undefined;

  // If no alt text is provided, use an empty string for decorative images
  // or generate a descriptive alt from the filename for content images
  const imageAlt =
    alt ||
    (src ? src.split("/").pop().split(".")[0].replace(/[-_]/g, " ") : "");

  return (
    <ImageWrapper
      width={width}
      height={height}
      aspectRatio={aspectRatio}
      preserveAspectRatio={preserveAspectRatio}
      borderRadius={borderRadius}
      style={wrapperStyle}
    >
      <StyledImage
        src={src}
        alt={imageAlt}
        effect={effect}
        placeholderSrc={placeholderSrc}
        width={imgWidth}
        height={imgHeight}
        objectFit={objectFit}
        objectPosition={objectPosition}
        hoverEffect={hoverEffect}
        style={imageStyle}
        sizes={sizes}
        {...rest}
      />
    </ImageWrapper>
  );
};

export default OptimizedImage;

