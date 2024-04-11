import React from "react";
import { RiImageLine } from "react-icons/ri";

export const AddImage = ({ images, onChangeFile, setImages, label }) => {
  const deleteImage = (index) => {
    const newImages = images.filter((img) => img.index !== index);
    setImages(newImages);
  };

  return (
    <div className="my-8">
      <label className="font-semibold">{label}</label>
      <div className="relative p-4 border-2 rounded-md border-dashed w-full flex flex-col justify-center mt-2">
        <div className="flex flex-wrap gap-4 b">
          {images.map((imagen) => (
            <div className="" key={imagen.index}>
              <div className="relative">
                {imagen.file.type === "text/plain" && (
                  <div className="flex items-center space-x-2">
                    <p className="text-base font-semibold">
                      {imagen.file.name}
                    </p>
                    <p className="text-sm text-gray-500">(Texto plano)</p>
                  </div>
                )}
                {imagen.file.type === "image/jpeg" && (
                  <img alt="algo" src={imagen.url} className="h-24" />
                )}
                <button
                  type="button"
                  className="bg-red-500 w-6 h-6 rounded-full text-white absolute -top-2 -right-2"
                  onClick={() => deleteImage(imagen.index)}
                >
                  x
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <input
            type="file"
            name="file_upload"
            onChange={onChangeFile}
            className="absolute m-0 p-0 h-16 w-full outline-none opacity-0 cursor-pointer"
            multiple
          />
          <span className="flex items-center space-x-2 py-4 mx-4 ">
            <RiImageLine className="text-2xl text-gray-600" />
            <span className="font-medium text-gray-600">
              <span className="text-blue-600 hover:underline">
                Cargue archivo{" "}
              </span>
              <span>o arrastrar y soltar</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
