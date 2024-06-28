"use client";
import React from "react";
import ReactImageMagnify, { ReactImageMagnifyProps } from "react-image-magnify";

interface MyReactImageMagnifyProps {
  smallImage: ReactImageMagnifyProps["smallImage"];
  largeImage: ReactImageMagnifyProps["largeImage"];
  zoomFactor?: number;
  containerWidth?: string;
  containerHeight?: string;
  enlargedImageContainerStyle?: React.CSSProperties;
  enlargedImageContainerDimensions?: React.CSSProperties;
}

const MyReactImageMagnify: React.FC<MyReactImageMagnifyProps> = ({
  smallImage,
  largeImage,
  zoomFactor = 1,
  containerWidth = "300px",
  containerHeight = "200px",
  enlargedImageContainerStyle = {},
  enlargedImageContainerDimensions = { width: "100%", height: "100%" },
}) => {
  return (
    <div style={{ width: containerWidth, height: containerHeight }}>
      <ReactImageMagnify
        {...{
          smallImage: {
            ...smallImage,
            isFluidWidth: true, // Assuming you want the small image to be fluid width
          },
          largeImage: {
            ...largeImage,
            width: largeImage.width || 1000, // Default width for large image
            height: largeImage.height || 480, // Default height for large image
          },
          enlargedImageContainerStyle: {
            zIndex: 1500,
            ...enlargedImageContainerStyle,
          },
          enlargedImageContainerDimensions: {
            width: "100%",
            height: "100%",
            ...enlargedImageContainerDimensions,
          },
          zoomFactor: zoomFactor,
        }}
      />
    </div>
  );
};

export default MyReactImageMagnify;
