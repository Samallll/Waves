import React from 'react';
import Image from '../assets/defaultImage.jpg'

const ImageComponent = ({ src, alt, caption }) => {
  const defaultImage = Image;
  const imageUrl = src === null || src === undefined ? defaultImage : src;
  // const imageUrl = defaultImage;

  return (
    <figure>
      <img
        className="h-auto max-w-full rounded-lg"
        src={imageUrl}
        alt={alt}
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ImageComponent;
