// 代码生成时间: 2025-08-15 06:14:04
 * This component provides a user interface to adjust the size of multiple images.
 * It includes error handling and is written in TypeScript with React best practices.
 */

import React, { useState } from 'react';
import './ImageResizerApp.css';

type ImageSize = { width: number; height: number; };

interface ImageResizerProps {
  images: File[];
  maxWidth: number;
  maxHeight: number;
  onChange: (resizedImages: File[]) => void;
}

const ImageResizer: React.FC<ImageResizerProps> = ({ images, maxWidth, maxHeight, onChange }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to resize an image
  const resizeImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Unable to get canvas context'));
            return;
          }

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0);

          const { width, height } = getNewSize(canvas.width, canvas.height, maxWidth, maxHeight);
          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(resolve, 'image/png');
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Function to calculate new size based on max dimensions
  const getNewSize = (originalWidth: number, originalHeight: number, maxWidth: number, maxHeight: number): ImageSize => {
    const ratio = Math.min(maxWidth / originalWidth, maxHeight / originalHeight);
    return {
      width: originalWidth * ratio,
      height: originalHeight * ratio,
    };
  };

  // Handle the resizing of all images
  const handleResize = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const resizedImages = await Promise.all(images.map(image => resizeImage(image)));
      onChange(resizedImages);
    } catch (err) {
      setError('Failed to resize images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="image-resizer-container">
      {error && <div className="error-message">{error}</div>}
      {isLoading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <button onClick={handleResize} disabled={isLoading}>Resize Images</button>
      )}
    </div>
  );
};

export default ImageResizer;