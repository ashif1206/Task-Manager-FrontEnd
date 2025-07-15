import React, { useRef, useState, useEffect } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

function ProfilePhotoSelector({ image, setImage }) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (image) {
      const preview = URL.createObjectURL(image);
      setPreviewUrl(preview);
      return () => URL.revokeObjectURL(preview); // Clean up memory
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  }

  function handleRemoveImage() {
    setImage(null);
    setPreviewUrl(null);
  }

  function onChooseFile() {
    inputRef.current.click();
  }

  return (
    <div className="flex justify-center mb-4">
      <div className="relative w-24 h-24">
        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* When no image - show upload button */}
        {!image ? (
          <div
            onClick={onChooseFile}
            className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded-full cursor-pointer hover:border-purple-500 transition"
          >
            <LuUpload className="text-2xl text-gray-500" />
          </div>
        ) : (
          <>
            {/* Show image preview */}
            <img
              src={previewUrl}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border"
            />
            {/* Remove Icon */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md hover:bg-red-600"
            >
              <LuTrash size={12} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePhotoSelector;   
