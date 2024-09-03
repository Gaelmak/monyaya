import { useState, ChangeEvent } from 'react';

function useImageUpload(defaultImage: string | null = null) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(defaultImage);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setPreview(null);
    }
  };

  return { selectedImage, preview, handleImageChange };
}

export default useImageUpload;
